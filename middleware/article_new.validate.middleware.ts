import newArticleSchema from "../schemas/article-new.schema.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const validateNewArticle = async (ctx: any, next: any) => {
  lg.info("Validate New Article");

  const postBody = await ctx.request.body().value;
  const { author, title, body, topic } = postBody;

  await newArticleSchema.parseAsync({ author, title, body, topic });

  lg.info(`New Article validated`);

  await next();
};
