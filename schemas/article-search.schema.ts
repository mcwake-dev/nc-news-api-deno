import { z } from "https://deno.land/x/zod@v3.18.0/mod.ts";

enum Sorts {
  Title = "title",
  Topic = "topic",
  CreatedAt = "created_at",
  Votes = "votes",
  CommentCount = "comment_count",
  Author = "author",
}

enum SortOrders {
  Descending = "desc",
  Ascending = "asc",
}

enum Limit {
  Ten = 10,
  Twenty = 20,
  Thirty = 30,
}

const articleSearchSchema = z.object({
  topic: z.nullable(z.string()),
  author: z.nullable(z.string()),
  sort_by: z.nativeEnum(Sorts),
  order: z.nativeEnum(SortOrders),
  limit: z.preprocess(
    (limit) => parseInt(limit as string),
    z.nativeEnum(Limit),
  ).default(Limit.Ten),
  offset: z.preprocess(
    (offset) => parseInt(offset as string),
    z.number(),
  ).default(0),
});

export default articleSearchSchema;
