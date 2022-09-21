import { format } from "https://deno.land/x/pg_format@v1.0.0/index.js";

import { runQuery } from "../connection.ts";
import { hash } from "../../utils/password.ts";
import { ISeedData } from "./ISeedData.ts";
import { ISeedArticle } from "./ISeedArticle.ts";
import { ISeedComment } from "./ISeedComment.ts";
import { ISeedUser } from "./ISeedUser.ts";
import { ISeedTopic } from "./ISeedTopic.ts";

export const populateArticles = async (articleData: ISeedArticle[]) => {
  await runQuery(
    format(
      `
          INSERT INTO articles (title, body, topic, author, created_at, votes) VALUES %L RETURNING *;
        `,
      articleData.map(({ title, body, topic, author, created_at, votes }) => [
        title,
        body,
        topic,
        author,
        created_at,
        votes,
      ]),
    ),
  );
};

export const populateComments = async (commentData: ISeedComment[]) => {
  await runQuery(
    format(
      `
          INSERT INTO comments (author, article_id, votes, created_at, body) VALUES %L RETURNING *;
        `,
      commentData.map(({ author, article_id, votes, created_at, body }) => [
        author,
        article_id,
        votes,
        created_at,
        body,
      ]),
    ),
  );
};

export const populateTopics = async (topicData: ISeedTopic[]) => {
  await runQuery(
    format(
      `
        INSERT INTO topics (slug, description) VALUES %L RETURNING slug, description;
    `,
      topicData.map(({ slug, description }) => [slug, description]),
    ),
  );
};

export const populateUsers = async (userData: ISeedUser[]) => {
  const users = await Promise.all(userData.map(async (
    { username, firstName, surname, password, avatar_url },
  ) => [username, firstName, surname, await hash(password), avatar_url]));

  await runQuery(
    format(
      `INSERT INTO users (username, firstName, surname, password, avatar_url) VALUES %L RETURNING *;`,
      users,
    ),
  );
};

export const populateTables = async (
  data: ISeedData,
) => {
  const { articleData, commentData, topicData, userData } = data;

  await populateTopics(topicData);

  await populateUsers(userData);

  await populateArticles(articleData);

  await populateComments(commentData);
};
