import { z } from "https://deno.land/x/zod@v3.18.0/mod.ts";

const articlePatchSchema = z.object({
  inc_votes: z.preprocess(
    (inc_votes) => parseInt(inc_votes as string),
    z.number(),
  ),
  article_id: z.preprocess(
    (id) => parseInt(id as string),
    z.number(),
  ),
});

export default articlePatchSchema;
