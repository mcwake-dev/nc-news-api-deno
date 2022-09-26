import { format } from "https://deno.land/x/pg_format@v1.0.0/index.js";
import { PoolClient } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

import log from "../../utils/log.ts";
import pool from "../connection.ts";
import { hash } from "../../utils/password.ts";
import { ISeedData } from "../interfaces/ISeedData.ts";
import { ISeedArticle } from "../interfaces/ISeedArticle.ts";
import { ISeedComment } from "../interfaces/ISeedComment.ts";
import { ISeedUser } from "../interfaces/ISeedUser.ts";
import { ISeedTopic } from "../interfaces/ISeedTopic.ts";

const lg = log.getLogger();

export const populateArticles = async (
  client: PoolClient,
  articleData: ISeedArticle[],
) => {
  lg.info("Populating articles table");
  await client.queryObject(
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
  lg.info("Articles table populated");
};

export const populateComments = async (
  client: PoolClient,
  commentData: ISeedComment[],
) => {
  lg.info("Populating comments table");
  await client.queryObject(
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
  lg.info("Comments table populated");
};

export const populateTopics = async (
  client: PoolClient,
  topicData: ISeedTopic[],
) => {
  lg.info("Populating topics table");
  await client.queryObject(
    format(
      `
        INSERT INTO topics (slug, description) VALUES %L RETURNING slug, description;
    `,
      topicData.map(({ slug, description }) => [slug, description]),
    ),
  );
  lg.info("Topics table populated");
};

export const populateUsers = async (
  client: PoolClient,
  userData: ISeedUser[],
) => {
  lg.info("Populating users table");
  const users = await Promise.all(
    userData.map(async (
      { username, firstName, surname, password, avatar_url },
    ) => [username, firstName, surname, await hash(password), avatar_url]),
  );

  await client.queryObject(
    format(
      `INSERT INTO users (username, firstName, surname, password, avatar_url) VALUES %L RETURNING *;`,
      users,
    ),
  );
  lg.info("Users table populated");
};

export const populateTables = async (data: ISeedData) => {
  const { articleData, commentData, topicData, userData } = data;

  let client;

  try {
    client = await pool.connect();
    await populateTopics(client, topicData);

    await populateUsers(client, userData);

    await populateArticles(client, articleData);

    await populateComments(client, commentData);
  } finally {
    client?.release();
  }
};
