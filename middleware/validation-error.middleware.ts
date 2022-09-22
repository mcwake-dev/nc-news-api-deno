import { ZodError } from "https://deno.land/x/zod@v3.19.1/ZodError.ts";

// deno-lint-ignore no-explicit-any
export const validationError = async (ctx: any, next: any) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ZodError) {
      ctx.response.status = 400;
      ctx.response.body = { err };
    } else {
      throw err;
    }
  }
};
