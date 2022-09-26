import { selectArticle } from "../models/articles.model.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const validateArticleExists = async (ctx: any, next: any) => {
  lg.info("Validate Article Exists");

  const article_id = parseInt(ctx.params.article_id);
  const article = await selectArticle(article_id);

  ctx.assert(article, 404, "Article not found");

  lg.info(`Article ID ${article_id} exists`);

  await next();
};
