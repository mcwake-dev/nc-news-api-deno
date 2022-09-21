import log from "../../utils/log.ts";
import { runQuery } from "../connection.ts";

const lg = log.getLogger();

export const deleteComments = async () => {
  lg.info("Deleting comments");
  await runQuery(`DROP TABLE IF EXISTS comments;`);
  lg.info("Comments deleted");
};

export const deleteArticles = async () => {
  lg.info("Deleting articles");
  await runQuery(`DROP TABLE IF EXISTS articles;`);
  lg.info("Articles deleted");
};

export const deleteTopics = async () => {
  lg.info("Deleting topics");
  await runQuery(`DROP TABLE IF EXISTS topics;`);
  lg.info("Topics deleted");
};

export const deleteUsers = async () => {
  lg.info("Deleting users");
  await runQuery(`DROP TABLE IF EXISTS users;`);
  lg.info("Users deleted");
};

export const deleteTables = async () => {
  lg.info("Deleting tables");
  await deleteComments();
  await deleteArticles();
  await deleteTopics();
  await deleteUsers();
  lg.info("Tables deleted");
};
