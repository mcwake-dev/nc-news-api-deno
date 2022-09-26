import pool from "../db/connection.ts";
import IUser from "../interfaces/IUser.ts";

export const selectUser = async (username: string): Promise<IUser> => {
  let client;

  try {
    client = await pool.connect();
    const results = await client.queryObject(
      "SELECT username, avatar_url, firstName, surname, password FROM users WHERE username = $1 ORDER BY username;",
      [username],
    );

    return results.rows[0] as IUser;
  } finally {
    client?.release();
  }
};
