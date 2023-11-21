import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { type JsonObject } from "@prisma/client/runtime/library";
import { type Form } from "@prisma/client";

import { TRPCError } from "@trpc/server";


export const formRouter = createTRPCRouter({

    getInvitedForms: protectedProcedure
        .input(z.object({}))
        .query(async ({ ctx }) => {
            //find all the forms that the user has been invited to
            const forms = await ctx.db.invitation.findMany({
                where: {
                    userId: ctx.session.user.id,
                },
                select: {
                    form: true,
                },
            });
            const formArray: Form[] = []
            forms.forEach((form) => {
                formArray.push(form.form)
            })
            return formArray;
        }),

    sendInvitation: protectedProcedure
        .input(z.object({
            id: z.string(),
            email: z.string().email(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, email } = input;
            const form = await ctx.db.form.findUnique({
                where: {
                    id: id,
                },
            });
            if (form == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Form not found",
                });
            }
            //Check if the user exists
            const userExists = await ctx.db.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (userExists == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }
            //Find invitiation userIds for the form
            const userIds = await ctx.db.invitation.findUnique({
                where: {
                    id: id,
                },
                select: {
                    userId: true,
                },
            });
            //Check if the user has already been invited
            if (userIds?.userId.includes(userExists.id)) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User has already been invited",
                });
            }
            //Check if the user is the owner of the form
            if (ctx.session.user.id == userExists.id) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User is the owner of the form",
                });
            }

            //Create the invitation
            const invitation = await ctx.db.invitation.create({
                data: {
                    formId: id,
                    userId: userExists.id,
                },
            });
            return invitation;
        }
        ),

    getInvitations: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const { id } = input;
            const form = await ctx.db.form.findUnique({
                where: {
                    id: id,
                },
            });
            if (form == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Form not found",
                });
            }
            //find the userids of all the users who have been invited to the form
            const userIds = await ctx.db.invitation.findUnique({
                where: {
                    id: id,
                },
                select: {
                    userId: true,
                },
            });
            //return an array of users using the userids
            const users = await ctx.db.user.findMany({
                where: {
                    id: userIds?.userId,
                },
            });
            return users;
        }),

    getForms: protectedProcedure
        .input(z.object({}))
        .query(async ({ ctx }) => {
            const forms = await ctx.db.form.findMany({
                where: {
                    ownerId: ctx.session.user.id,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return forms;
        }),

    getForm: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const { id } = input;
            const form = await ctx.db.form.findUnique({
                where: {
                    id: id,
                },
            });
            if (form == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Form not found",
                });
            }
            return form;
        }),
    //Create a Form in the db based on the prisma schema, set ownerid to the current user
    createForm: protectedProcedure
        .input(z.object({
            name: z.string(),
            description: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { name, description } = input;
            console.log(ctx.session)
            const form = await ctx.db.form.create({
                data: {
                    title: name,
                    description: description,
                    ownerId: ctx.session.user.id,
                    question: [],
                },
            });
            return form;
        }),

    createFormWithTemplate: protectedProcedure
        .input(z.object({
            templateId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { templateId } = input;
            //Get the template
            const template = await ctx.db.formTemplate.findUnique({
                where: {
                    id: templateId,
                },
            });
            if (template == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Template not found",
                });
            }
            //Create the form with the questions from the template
            const form = await ctx.db.form.create({
                data: {
                    title: "Copy of " + template.name,
                    description: "Copy of " + template.name,
                    ownerId: ctx.session.user.id,
                    question: template.question as JsonObject,
                },
            });
            return form;
        }),

    deleteForm: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { id } = input;
            const form = await ctx.db.form.findUnique({
                where: {
                    id: id,
                },
            });
            if (form == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Form not found",
                });
            }
            //delete all answers for the form
            await ctx.db.answer.deleteMany({
                where: {
                    formId: id,
                },
            });
            //delete all invidiations
            await ctx.db.invitation.deleteMany({
                where: {
                    formId: id,
                },
            });
            return ctx.db.form.delete({
                where: {
                    id: id,
                },
            });
        }),
    updateQuestions: protectedProcedure
        .input(z.object({
            id: z.string(),
            questions: z.array(z.object({
                id: z.string(),
                text: z.string(),
                type: z.string(),
                options: z.array(z.object({
                    id: z.string(),
                    content: z.string(),
                }
                )).optional(),
                required: z.boolean().optional(),
            })),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, questions } = input;
            const form = await ctx.db.form.findUnique({
                where: {
                    id: id,
                },
            });
            if (form == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Form not found",
                });
            }
            return ctx.db.form.update({
                where: {
                    id: id,
                },
                data: {
                    question: questions,
                },
            });
        }),
    updateForm: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, name, description } = input;
            const form = await ctx.db.form.findUnique({
                where: {
                    id: id,
                },
            });
            if (form == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Form not found",
                });
            }
            return ctx.db.form.update({
                where: {
                    id: id,
                },
                data: {
                    title: name,
                    description: description,
                },
            });
        }),

});