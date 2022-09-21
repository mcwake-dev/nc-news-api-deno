import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();

app.use(oakCors);
app.use((ctx) => {
    ctx.response.body = "Hello World!";
})

await app.listen({port: 8000});