import { createTRPCRouter, publicProcedure } from "../trpc";

const userRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return { message: "hello" };
  }),
});

export default userRouter;
