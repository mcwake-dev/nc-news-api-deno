import { PoolClient } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

import log from "../../utils/log.ts";
import pool from "../connection.ts";

const lg = log.getLogger();

export const deleteComments = async (client: PoolClient) => {
  lg.info("Deleting comments");
  await client.queryObject(`DROP TABLE IF EXISTS comments;`);
  lg.info("Comments deleted");
};

export const deleteArticles = async (client: PoolClient) => {
  lg.info("Deleting articles");
  await client.queryObject(`DROP TABLE IF EXISTS articles;`);
  lg.info("Articles deleted");
};

export const deleteTopics = async (client: PoolClient) => {
  lg.info("Deleting topics");
  await client.queryObject(`DROP TABLE IF EXISTS topics;`);
  lg.info("Topics deleted");
};

export const deleteUsers = async (client: PoolClient) => {
  lg.info("Deleting users");
  await client.queryObject(`DROP TABLE IF EXISTS users;`);
  lg.info("Users deleted");
};

export const deleteTables = async () => {
  let client;

  try {
    client = await pool.connect();
    lg.info("Deleting tables");
    await deleteComments(client);
    await deleteArticles(client);
    await deleteTopics(client);
    await deleteUsers(client);
    lg.info("Tables deleted");
  } finally {
    client?.release();
  }
};
