import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export const notYetImplemented = (context: Context) => {
  context.response.status = 400;
  context.response.body = "Not Yet Implemented";
};
