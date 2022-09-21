import { Pool } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const connectionStr = Deno.env.get("PGDATABASE") || "";
const connectionPoolSize = parseInt(Deno.env.get("PGPOOLSIZE") || "");
const pool = new Pool(
  connectionStr,
  connectionPoolSize,
);

export async function runQuery(query: string) {
  const client = await pool.connect();

  let result;

  try {
    result = await client.queryObject(query);
  } finally {
    client.release();
  }

  return result;
}
