## Introduction

This dynamic form builder was built with the T3 Stack [Create T3 App](https://create.t3.gg/) and the following libraries

- Next.js
- TypeScript
- tRPC
- Prisma
- TailwindCSS
- Next-auth (Authentication)
- S3 Bucket (File uploads)
- Zustand (For global state management)

## Geting started

1. Clone this repository using

   ```bash
   git clone https://github.com/timelesclock/inc-form-builder
   ```

   Or use the hosted version on
   [https://inc-form-builder.vercel.app/](https://inc-form-builder.vercel.app/)
2. Copy the .env.example folder into .env

   ```bash
   cp .env.example .env
   ```
3. Fill up the .env with the api keys listed in the .env, database url must be cockroachDB
4. Run the following commands to install dependencies and initialise the database

   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```
5. Finally, run the following command to open the local development server on `http://localhost:3000`

   ```bash
   npm run dev
   ```

## Usage

A user can create a form and send invitations to other user's through emails. Currently the invitation feature requires the email to be a registered user.
The invited user can then fill up the form and the form owner can see the responses of
