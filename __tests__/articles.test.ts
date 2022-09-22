import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";

import app from "../app.ts";
import "../db/seeds/run-seed.ts";

Deno.test("GET /api/articles/:article_id", async (t) => {
  await t.step(
    "should respond with a valid article object when passed a valid article ID",
    async () => {
      const request = await superoak(app);
      const articleResponse = await request.get("/api/articles/1").expect(200);

      assertEquals(articleResponse.body.article, {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        votes: 100,
        comment_count: 11,
        created_at: "2020-07-09T20:11:00.000Z",
      });
    },
  );

  await t.step(
    "should respond with a 404 when passed a non-existent valid article ID",
    async () => {
      const request = await superoak(app);
      await request.get("/api/articles/999").expect(
        404,
      );
    },
  );

  await t.step(
    "should respond with a 400 when passed an invalid article ID",
    async () => {
      const request = await superoak(app);
      await request.get("/api/articles/dave").expect(
        400,
      );
    },
  );
});
