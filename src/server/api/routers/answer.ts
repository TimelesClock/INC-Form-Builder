import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

import { type User } from "@prisma/client";

import { TRPCError } from "@trpc/server";


export const answerRouter = createTRPCRouter({

    //Get all users who have answered the form
    getAnsweredUsers: protectedProcedure
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
            //return an array of users
            const users = await ctx.db.answer.findMany({
                where: {
                    formId: id,
                },
                select: {
                    user: true,
                },
            });
            const userArray: User[] = []
            users.forEach((user) => {
                userArray.push(user.user)
            })
            return userArray;
        }),

    getUserAnswers: protectedProcedure
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
            const users = await ctx.db.answer.findMany({
                where: {
                    formId: id,
                },
                select: {
                    user: true,
                    content: true,
                },
            });
            return users;
        }),

    addAnswer: protectedProcedure
        .input(z.object({
            id: z.string(),
            answer: z.array(z.object({
                id: z.string(),
                content: z.union([
                    z.array(z.string()),
                    z.string()
                ])
            })),
        }))

        .mutation(async ({ ctx, input }) => {
            const { id, answer } = input;
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
            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            });
            if (user == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }
            //Check if user has already answered the form
            const answerExists = await ctx.db.answer.findFirst({
                where: {
                    userId: ctx.session.user.id,
                    formId: id,
                },
            });
            let answerData;
            console.log(answer)
            if (answerExists) {
                //update form instead
                answerData = await ctx.db.answer.update({
                    where: {
                        id: answerExists.id,
                    },
                    data: {
                        content: answer,
                    },
                });
            } else {
                answerData = await ctx.db.answer.create({
                    data: {
                        userId: ctx.session.user.id,
                        formId: id,
                        content: answer,
                    },
                });
            }
            return answerData;
        }),
    //Get answers for current user and form
    getAnswers: protectedProcedure
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
            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            });
            if (user == null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }
            const answers = await ctx.db.answer.findFirst({
                where: {
                    userId: ctx.session.user.id,
                    formId: id,
                },
            });
            return answers?.content ?? [];
        }),
});