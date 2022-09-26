import { Pool } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const connectionStr = Deno.env.get("PGDATABASE") || "";
const connectionPoolSize = parseInt(Deno.env.get("PGPOOLSIZE") || "");
const pool = new Pool(
  connectionStr,
  connectionPoolSize,
);

export default pool;
