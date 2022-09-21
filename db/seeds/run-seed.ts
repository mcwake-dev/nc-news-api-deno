import log from "../../utils/log.ts";
import * as devData from "../data/dev/index.ts";
import * as testData from "../data/test/index.ts";
import { deleteTables } from "./delete-tables.ts";
import { createTables } from "./create-tables.ts";
import { populateTables } from "./populate-tables.ts";

const env = Deno.env.get("DENO_ENV");
const lg = log.getLogger();

lg.info("Seeding");
await deleteTables();

await createTables();

lg.info(`Populating tables with ${env} data`);
switch (env) {
  case "DEV":
    await populateTables(devData);
    break;
  case "TEST":
    await populateTables(testData);
    break;
  default:
    throw new Error("INVALID ENV");
}
lg.info("Tables populated");
lg.info("Seeding complete");
