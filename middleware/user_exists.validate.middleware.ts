import { selectUser } from "../models/users.model.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const validateUserExists = async (ctx: any, next: any) => {
  lg.info("Validating User exists");

  const postBody = await ctx.request.body().value;
  const username = postBody.author;
  const user = await selectUser(username);

  ctx.assert(user, 404, "User not found");
  lg.info(`User ${username} exists`);

  await next();
};
