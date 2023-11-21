import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const templateRouter = createTRPCRouter({

    getTemplates: protectedProcedure
        .input(z.object({}))
        .query(async ({ ctx }) => {
            const templates = await ctx.db.formTemplate.findMany();
            return templates;
        }),

    createTemplate: protectedProcedure
        .input(
            z.object({
            name: z.string(),
            description: z.string(),
            content: z.array(z.object({
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
            const { name, description, content } = input;
            const template = await ctx.db.formTemplate.create({
                data: {
                    name: name,
                    description: description,
                    question: content,
                },
            });
            return template;
        }),

});