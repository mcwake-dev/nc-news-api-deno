import articleSearchSchema from "../schemas/article-search.schema.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const validateArticleSearch = async (ctx: any, next: any) => {
  lg.info("Validate Article Search");

  const sort_by = ctx.request.url.searchParams.get("sort_by");
  const order = ctx.request.url.searchParams.get("order");
  const topic = ctx.request.url.searchParams.get("topic");
  const author = ctx.request.url.searchParams.get("author");
  const limit = ctx.request.url.searchParams.get("limit");
  const offset = ctx.request.url.searchParams.get("offset");

  await articleSearchSchema.parseAsync({
    sort_by,
    order,
    topic,
    author,
    limit,
    offset,
  });

  lg.info(`Article Search validated`);

  await next();
};
