import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { type JsonObject } from "@prisma/client/runtime/library";

import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";


export const userRouter = createTRPCRouter({

    register: publicProcedure
        .input(z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { name, email, password } = input;

            //Check if email is already in use
            const userExists = await ctx.db.user.findUnique({
                where: {
                    email: email,
                },
            });
            
            if (userExists) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Email already in use",
                });
            }

            const user = await ctx.db.user.create({
                data: {
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(password, 12),
                },
            });
            return user;
        }),

});