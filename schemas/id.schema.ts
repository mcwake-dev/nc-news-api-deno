import { z } from "https://deno.land/x/zod@v3.19.1/mod.ts";

const idSchema = z.preprocess((id) => parseInt(id as string), z.number());

export default idSchema;
