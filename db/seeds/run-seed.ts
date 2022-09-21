import * as devData from "../data/dev/index.ts";
import * as testData from "../data/test/index.ts";
import { deleteTables } from "./delete-tables.ts";
import { createTables } from "./create-tables.ts";
import { populateTables } from "./populate-tables.ts";

const env = Deno.env.get("DENO_ENV");

console.log(env);
await deleteTables();
await createTables();

switch (env) {
  case "DEV":
    await populateTables(devData);
    break;
  case "TEST":
    await populateTables(testData);
    break;
  default:
    throw new Error("INVALID ENV");
    break;
}
