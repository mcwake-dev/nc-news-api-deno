import { selectTopic } from "../models/topics.model.ts";
import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const validateTopicExists = async (ctx: any, next: any) => {
  lg.info("Validating Topic existence");

  const postBody = await ctx.request.body().value;
  const slug = postBody.topic;
  const topic = await selectTopic(slug);

  ctx.assert(topic, 404, "Topic not found");
  lg.info(`Topic slug ${slug} exists`);

  await next();
};
