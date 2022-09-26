import pool from "../db/connection.ts";
import ITopic from "../interfaces/ITopic.ts";

export const selectTopic = async (slug: string): Promise<ITopic> => {
  let client;

  try {
    client = await pool.connect();
    const results = await client.queryObject(
      "SELECT * FROM topics WHERE slug = $1",
      [
        slug,
      ],
    );
    return results.rows[0] as ITopic;
  } finally {
    client?.release();
  }
};
