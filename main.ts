import app from "./app.ts";
import log from "./utils/log.ts";

const lg = log.getLogger();

lg.info("Starting...");
await app.listen({ port: 8000 });
