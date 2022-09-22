import { selectArticle } from "../models/articles.model.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const getArticle = async (ctx: any) => {
  lg.info("Get Article");

  const article_id = parseInt(ctx.params.article_id);

  lg.info(`Get Article with ID ${article_id}`);

  const article = await selectArticle(article_id);

  ctx.assert(article, 404, "Article not found");

  ctx.response.status = 200;
  ctx.response.body = { article };
};
