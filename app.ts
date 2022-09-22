import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { router as apiRouter } from "./routes/api.router.ts";

const app = new Application();

app.use(oakCors());
app.use(apiRouter.routes());

export default app;
