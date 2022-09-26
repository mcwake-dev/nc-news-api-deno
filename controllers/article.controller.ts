import {
  deleteArticle,
  numberOfArticles,
  selectArticle,
  selectArticles,
  updateArticle,
} from "../models/articles.model.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const getArticle = async (ctx: any) => {
  lg.info("Get Article");

  const article_id = parseInt(ctx.params.article_id);

  lg.info(`Get Article with ID ${article_id}`);

  const article = await selectArticle(article_id);

  lg.info(`Article ID ${article_id} found`);

  ctx.response.status = 200;
  ctx.response.body = { success: true, article };
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

  lg.info(`Found ${total} articles`);

  ctx.response.status = 200;
  ctx.response.body = { success: true, articles, total };
};

// deno-lint-ignore no-explicit-any
export const patchArticle = async (ctx: any) => {
  lg.info("Patch article");

  const body = await ctx.request.body().value;
  const article_id: number = parseInt(ctx.params.article_id);
  const inc_votes: number = parseInt(body.inc_votes);
  const article = await updateArticle(article_id, inc_votes);

  lg.info("Article patched");

  ctx.response.status = 200;
  ctx.response.body = { success: true, article };
};

// deno-lint-ignore no-explicit-any
export const removeArticle = async (ctx: any) => {
  lg.info("Delete article");

  const article_id: number = parseInt(ctx.params.article_id);

  await deleteArticle(article_id);

  lg.info("Article deleted");

  ctx.response.status = 204;
};
