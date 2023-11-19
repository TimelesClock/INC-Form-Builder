import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { type JsonObject } from "@prisma/client/runtime/library";

import { TRPCError } from "@trpc/server";


export const templateRouter = createTRPCRouter({

    getTemplates: protectedProcedure
        .input(z.object({}))
        .query(async ({ ctx }) => {
            const templates = await ctx.db.formTemplate.findMany();
            return templates;
        }),

});