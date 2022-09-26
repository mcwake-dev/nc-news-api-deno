import articlePatchSchema from "../schemas/article-patch.schema.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const validateArticlePatch = async (ctx: any, next: any) => {
  lg.info("Validate Article Patch");

  const article_id = ctx.params.article_id;
  const { inc_votes } = await ctx.request.body().value;

  await articlePatchSchema.parseAsync({ article_id, inc_votes });

  lg.info(`Article Patch validated`);

  await next();
};
