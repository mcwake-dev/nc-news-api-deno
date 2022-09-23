import log from "../utils/log.ts";
import idSchema from "../schemas/id.schema.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const validateArticleId = async (ctx: any, next: any) => {
  lg.info("Validate Article ID");

  const article_id = ctx.params.article_id;

  await idSchema.parseAsync(article_id);

  lg.info(`Article ID ${article_id} validated`);

  await next();
};
