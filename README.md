This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack
Backend: Node.js
Database: PostgreSQL 
Frontend: NextJS

## Getting Started
After cloning...to install the dependencies, run:
```bash
npm install
#or
yarn install
# or 
pnpm install
# or
bun install
```
*** We are using Prisma ORM package ***
1. Open terminal, navigate into the project folder
2. Run `npx prisma init` to get started
3. Create the postgres database
4. Set the DATABASE_URL variable in the .env file
5. Run `npx prisma migrate deploy` to get migrations done

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints
Use `/api/` infront of the required API endpoint e.g. `http://localhost:3000/api/tickets/stats`
*** This came as a late commit, I had forgotten to stage the api folder ***


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## NOTE
1. The search function is not completed
2. The create ticket route does not behave correctly due to dependency challenges...***I fixed the challenge and made a late commit***
3. *** Coding was done using VS-code on Ubuntu ***