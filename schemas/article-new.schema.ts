import { z } from "https://deno.land/x/zod@v3.18.0/mod.ts";

const newArticleSchema = z.object({
  author: z.string(),
  title: z.string(),
  body: z.string(),
  topic: z.string(),
});

export default newArticleSchema;
