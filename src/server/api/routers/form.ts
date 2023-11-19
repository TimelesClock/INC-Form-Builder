import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { type JsonObject } from "@prisma/client/runtime/library";

import { TRPCError } from "@trpc/server";


export const formRouter = createTRPCRouter({

    //Get all forms where ownerid is the current user or userid is in Invitation model
    getForms: protectedProcedure
        .input(z.object({}))
        .query(async ({ ctx }) => {
            const forms = await ctx.db.form.findMany({
                where: {
                    OR: [
                        { ownerId: ctx.session.user.id },
                        { invitations: { some: { userId: ctx.session.user.id } } },
                    ],
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
                question: z.string(),
                type: z.string(),
                options: z.array(z.string()),
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

});