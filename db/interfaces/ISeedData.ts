import { ISeedArticle } from "./ISeedArticle.ts";
import { ISeedComment } from "./ISeedComment.ts";
import { ISeedTopic } from "./ISeedTopic.ts";
import { ISeedUser } from "./ISeedUser.ts";

export interface ISeedData {
  articleData: ISeedArticle[];
  commentData: ISeedComment[];
  topicData: ISeedTopic[];
  userData: ISeedUser[];
}
