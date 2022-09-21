import { runQuery } from "../connection.ts";

export const deleteTables = async () => {
  await runQuery(`DROP TABLE IF EXISTS comments;`);
  await runQuery(`DROP TABLE IF EXISTS articles;`);
  await runQuery(`DROP TABLE IF EXISTS topics;`);
  await runQuery(`DROP TABLE IF EXISTS users;`);
};
