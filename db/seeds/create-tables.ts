import { PoolClient } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

import pool from "../connection.ts";
import log from "../../utils/log.ts";

const lg = log.getLogger();

export const createTopicsTable = async (client: PoolClient) => {
  lg.info("Creating topics table");
  await client.queryObject(`
    CREATE TABLE topics (
      slug VARCHAR(50) NOT NULL PRIMARY KEY,
      description VARCHAR(255) NOT NULL
    );
  `);
  lg.info("Topics table created");
};

export const createUsersTable = async (client: PoolClient) => {
  lg.info("Creating users table");
  await client.queryObject(`
    CREATE TABLE users (
      username VARCHAR(50) NOT NULL PRIMARY KEY,
      avatar_url VARCHAR(255) NOT NULL,
      firstName VARCHAR(100) NOT NULL,
      surname VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `);
  lg.info("Users table created");
};

export const createArticlesTable = async (client: PoolClient) => {
  lg.info("Creating articles table");
  await client.queryObject(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      topic VARCHAR(50) NOT NULL,
      author VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      FOREIGN KEY (topic) REFERENCES topics (slug) ON DELETE CASCADE,
      FOREIGN KEY (author) REFERENCES users (username) ON DELETE CASCADE
    )
  `);
  lg.info("Articles table created");
};

export const createCommentsTable = async (client: PoolClient) => {
  lg.info("Creating comments table");
  await client.queryObject(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(50) NOT NULL,
      article_id INT NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      body TEXT NOT NULL,
      FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE
    )
  `);
  lg.info("Comments table created");
};

export const createTables = async () => {
  let client;

  try {
    client = await pool.connect();
    lg.info("Creating tables");
    await createTopicsTable(client);
    await createUsersTable(client);
    await createArticlesTable(client);
    await createCommentsTable(client);
    lg.info("Tables created");
  } finally {
    client?.release();
  }
};
