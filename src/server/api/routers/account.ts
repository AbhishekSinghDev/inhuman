import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";

export const authorizeAccountAccess = async (
  accountId: string,
  userId: string,
) => {
  const account = await db.account.findFirst({
    where: {
      id: accountId,
      userId: userId,
    },
    select: {
      id: true,
      emailAddress: true,
      name: true,
      accessToken: true,
    },
  });

  if (!account) {
    throw new Error("Account not found !");
  }

  return account;
};

export const accountRouter = createTRPCRouter({
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.account.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      select: {
        id: true,
        emailAddress: true,
        name: true,
      },
    });
  }),

  getNumThread: protectedProcedure
    .input(z.object({ accountId: z.string(), tab: z.string() }))
    .query(async ({ ctx, input }) => {
      const { accountId, tab } = input;

      const account = await authorizeAccountAccess(accountId, ctx.auth.userId);
      return await ctx.db.thread.count({
        where: {
          accountId: account.id,
          inboxStatus: tab === "inbox" ? true : false,
          draftStatus: tab === "draft" ? true : false,
          sentStatus: tab === "sent" ? true : false,
        },
      });
    }),

  getThreads: protectedProcedure
    .input(
      z.object({ accountId: z.string(), tab: z.string(), done: z.boolean() }),
    )
    .query(async ({ ctx, input }) => {
      const { accountId, tab, done } = input;

      console.log("fetching user emails");

      const account = await authorizeAccountAccess(accountId, ctx.auth.userId);

      let filter: Prisma.ThreadWhereInput = {};
      if (tab === "inbox") {
        filter.inboxStatus = true;
      } else if (tab === "draft") {
        filter.inboxStatus = true;
      } else if (tab === "sent") {
        filter.inboxStatus = true;
      }

      filter.done = {
        equals: done,
      };

      filter.accountId = {
        equals: accountId,
      };

      const values = await ctx.db.thread.findMany({
        where: filter,
        include: {
          emails: {
            orderBy: {
              sentAt: "asc",
            },
            select: {
              from: true,
              body: true,
              bodySnippet: true,
              emailLabel: true,
              subject: true,
              sysLabels: true,
              id: true,
              sentAt: true,
            },
          },
        },
        take: 15,
        orderBy: {
          lastMessageDate: "desc",
        },
      });

      console.log("user emails: ", values);

      return values;
    }),
});
