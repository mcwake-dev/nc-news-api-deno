import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import { router as apiRouter } from "./routes/api.router.ts";

const app = new Application();

app.use(oakCors());
app.use(apiRouter.routes());

export default app;
