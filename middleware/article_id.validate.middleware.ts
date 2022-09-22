import idSchema from "../schemas/id.schema.ts";

// deno-lint-ignore no-explicit-any
export const validateArticleId = async (ctx: any, next: any) => {
  const article_id = ctx.params.article_id;

  idSchema.parse(article_id);

  await next();
};
