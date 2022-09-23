import {
  numberOfArticles,
  selectArticle,
  selectArticles,
} from "../models/articles.model.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const getArticle = async (ctx: any) => {
  lg.info("Get Article");

  const article_id = parseInt(ctx.params.article_id);

  lg.info(`Get Article with ID ${article_id}`);

  const article = await selectArticle(article_id);

  ctx.assert(article, 404, "Article not found");

  lg.info(`Article ID ${article_id} found`);

  ctx.response.status = 200;
  ctx.response.body = { article };
};

// deno-lint-ignore no-explicit-any
export const getArticles = async (ctx: any) => {
  lg.info("Get Articles");

  const sort_by = ctx.request.url.searchParams.get("sort_by");
  const order = ctx.request.url.searchParams.get("order");
  const topic = ctx.request.url.searchParams.get("topic");
  const author = ctx.request.url.searchParams.get("author");
  const limit = parseInt(ctx.request.url.searchParams.get("limit"));
  const offset = parseInt(ctx.request.url.searchParams.get("offset"));
  const articles = await selectArticles(
    sort_by,
    order,
    topic,
    author,
    limit,
    offset,
  );

  const total = await numberOfArticles();

  ctx.response.status = 200;
  ctx.response.body = { articles, total };
};
