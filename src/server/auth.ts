import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";

import { db } from "~/server/db";

import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
      }
      return session
    },
    jwt:  ({ token, user}) => {
      if (user) {
        token.id = user.id;
      }
      return token
    }
  },
  session: {
    strategy: "jwt",

  },
  pages:{
    signIn: '/login'
  },
  adapter: PrismaAdapter(db),
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {

        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });


        if (user && bcrypt.compareSync(credentials.password, user.password!)) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          throw new Error('Invalid email or password');
        }
      }
    })
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
