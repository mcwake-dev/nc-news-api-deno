import { format } from "https://deno.land/x/pg_format@v1.0.0/index.js";

import log from "../utils/log.ts";
import pool from "../db/connection.ts";

const lg = log.getLogger();

export const numberOfArticles = async () => {
  let client;

  lg.info(`Total Number of Articles`);

  try {
    client = await pool.connect();
    const results = await client.queryObject(
      `SELECT COUNT(articles.article_id)::int AS total FROM articles;`,
    );
    const totalRow = results.rows[0] as Record<string, unknown>;

    lg.info(`Found ${totalRow["total"]} articles`);

    return totalRow["total"];
  } finally {
    client?.release();
  }
};

export const selectArticle = async (article_id: number) => {
  let client;

  lg.info(`Select article with ID ${article_id}`);

  try {
    client = await pool.connect();
    const results = await client.queryObject(
      `
        SELECT articles.author, 
            articles.title, 
            articles.article_id, 
            articles.body, 
            articles.topic, 
            articles.created_at, 
            articles.votes, 
            COUNT(comment_id)::int AS comment_count
        FROM articles LEFT JOIN comments on articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id;
    `,
      [article_id],
    );

    lg.info(`Found ${results.rows.length} results`);

    return results.rows[0];
  } finally {
    client?.release();
  }
};

export const selectArticles = async (
  sort_by: string,
  order: string,
  topic: string,
  author: string,
  limit: number,
  offset: number,
) => {
  lg.info(`Select articles with following criteria:`);
  lg.info(`* sort by ${sort_by}`);
  lg.info(`* order ${order}`);
  lg.info(`* topic ${topic}`);
  lg.info(`* author ${author}`);
  lg.info(`* limit ${limit}`);
  lg.info(`* offset ${offset}`);

  const baseQuery = `
    SELECT articles.author, 
        articles.title, 
        articles.article_id, 
        articles.topic, 
        articles.created_at, 
        articles.votes, 
        COUNT(comment_id)::int AS comment_count
    FROM articles LEFT JOIN comments on articles.article_id = comments.article_id
    ${topic && author ? "WHERE topic = $1 AND articles.author = $2" : ""}
    ${topic && !author ? "WHERE topic = $1" : ""}
    ${author && !topic ? "WHERE articles.author = $1" : ""}
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}, title ${order}
    LIMIT ${limit} OFFSET ${offset}

`;
  let results;
  let client;

  try {
    client = await pool.connect();

    if (topic || author) {
      results = await client.queryObject(
        format(
          baseQuery,
          [topic, author].filter((bind) => bind !== null),
        ),
        [null],
      );
    } else {
      results = await client.queryObject(baseQuery, []);
    }

    lg.info(`Found ${results.rows.length} results`);

    return results.rows;
  } finally {
    client?.release();
  }
};

export const updateArticle = async (article_id: number, inc_votes: number) => {
  let client;

  lg.info(`Update article with ID ${article_id}`);

  try {
    client = await pool.connect();
    const results = await client.queryObject(
      `
        UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;
    `,
      [inc_votes, article_id],
    );

    lg.info(`Articles updated: ${results.rows.length}`);

    return results.rows[0];
  } finally {
    client?.release();
  }
};

export const selectArticleComments = async (article_id: number) => {
  let client;

  lg.info(`Get comments for article ${article_id}`);

  try {
    client = await pool.connect();
    const results = await client.queryObject(format(
      `
            SELECT comments.* 
            FROM comments 
            WHERE article_id = $1;
        `,
      [article_id],
    ));

    return results.rows;
  } finally {
    client?.release();
  }
};

export const insertArticleComment = async (
  article_id: number,
  author: string,
  body: string,
) => {
  let client;

  try {
    client = await pool.connect();
    const results = await client.queryObject(format(
      `
    INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;
  `,
      [article_id, author, body],
    ));

    return results.rows[0];
  } finally {
    client?.release();
  }
};

export const deleteArticle = async (article_id: number) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject(format(
      `
      DELETE FROM articles WHERE article_id = $1;
    `,
      [article_id],
    ));

    return result.rowCount === 1;
  } finally {
    client?.release();
  }
};

export const insertArticle = async (
  author: string,
  title: string,
  body: string,
  topic: string,
) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject(format(
      `
    INSERT INTO articles (author, title, body, topic) VALUES ($1, $2, $3, $4) RETURNING *;
  `,
      [author, title, body, topic],
    ));

    return result.rows[0];
  } finally {
    client?.release();
  }
};

export const mostRecentArticles = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject(
      `SELECT * FROM articles ORDER BY created_at DESC LIMIT 3;`,
    );
    return result.rows;
  } finally {
    client?.release();
  }
};

export const highestVotedArticles = async () => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.queryObject(
      `SELECT * FROM articles ORDER BY votes DESC LIMIT 3;`,
    );

    return result.rows;
  } finally {
    client?.release();
  }
};
