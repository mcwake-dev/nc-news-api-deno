import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { assert } from "https://deno.land/std@0.156.0/_util/assert.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";

import app from "../app.ts";
import pool from "../db/connection.ts";
import "../db/seeds/run-seed.ts";
import IArticle from "../interfaces/IArticle.ts";

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

Deno.test("GET /api/articles/", async (t) => {
  await t.step(
    "should respond with a list of LIMIT articles and a total number of articles when passed a valid sort, sort order, limit and offset",
    async () => {
      const request = await superoak(app);
      const articleResponse = await request.get(
        "/api/articles?sort_by=created_at&order=desc&limit=10&offset=0",
      ).expect(200);

      assertEquals(articleResponse.body.total, 12);
      assertEquals(articleResponse.body.articles.length, 10);
    },
  );
  await t.step(
    "invalid sorts are rejected",
    async () => {
      const request = await superoak(app);
      await request.get(
        "/api/articles?sort_by=blahblahblah&order=desc&limit=10&offset=0",
      ).expect(400);
    },
  );
  await t.step(
    "invalid sort orders are rejected",
    async () => {
      const request = await superoak(app);
      await request.get(
        "/api/articles?sort_by=created_at&order=blahblahblah&limit=10&offset=0",
      ).expect(400);
    },
  );
  await t.step(
    "invalid limits are rejected",
    async () => {
      const request = await superoak(app);
      await request.get(
        "/api/articles?sort_by=created_at&order=asc&limit=99999&offset=0",
      ).expect(400);
    },
  );
  await t.step(
    "only LIMIT values are returned",
    async () => {
      const request = await superoak(app);
      const articleResponse = await request.get(
        "/api/articles?sort_by=created_at&order=asc&limit=20&offset=0",
      ).expect(200);

      assertEquals(articleResponse.body.total, 12);
      assertEquals(articleResponse.body.articles.length, 12);
    },
  );
  await t.step(
    "only LIMIT values after OFFSET are returned",
    async () => {
      const request = await superoak(app);
      const articleResponse = await request.get(
        "/api/articles?sort_by=created_at&order=asc&limit=10&offset=2",
      ).expect(200);

      assertEquals(articleResponse.body.total, 12);
      assertEquals(articleResponse.body.articles.length, 10);
    },
  );
});

Deno.test("PATCH /api/articles/:article_id", async (t) => {
  await t.step(
    "should respond with an updated article when passed a valid article ID and valid request body (positive)",
    async () => {
      const request = await superoak(app);
      const articleResponse = await request.patch("/api/articles/1")
        .set({
          "Content-Type": "application/json",
        })
        .send({
          inc_votes: 1,
        })
        .expect(200);

      assertEquals(articleResponse.body.article, {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        votes: 101,
        created_at: "2020-07-09T20:11:00.000Z",
      });
    },
  );
  await t.step(
    "should respond with an updated article when passed a valid article ID and valid request body (negative)",
    async () => {
      const request = await superoak(app);
      const articleResponse = await request
        .patch("/api/articles/1")
        .set({
          "Content-Type": "application/json",
        })
        .send({
          inc_votes: -1,
        })
        .expect(200);

      assertEquals(articleResponse.body.article, {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        votes: 100,
        created_at: "2020-07-09T20:11:00.000Z",
      });
    },
  );
  await t.step(
    "should respond with a 404 when passed a non-existent valid article ID",
    async () => {
      const request = await superoak(app);
      await request.patch("/api/articles/999").set({
        "Content-Type": "application/json",
      }).send({ inc_votes: 1 }).expect(404);
    },
  );
  await t.step(
    "should respond with a 400 when passed an invalid article ID",
    async () => {
      const request = await superoak(app);
      await request.patch("/api/articles/dave").set({
        "Content-Type": "application/json",
      }).send({ inc_votes: 1 }).expect(400);
    },
  );
  await t.step(
    "should respond with a 400 when passed a valid article ID but an invalid request body (key invalid)",
    async () => {
      const request = await superoak(app);
      await request.patch("/api/articles/1").set({
        "Content-Type": "application/json",
      }).send({ nernerner: 1 }).expect(400);
    },
  );
  await t.step(
    "should respond with a 400 when passed a valid article ID but an invalid request body (key valid, value invalid)",
    async () => {
      const request = await superoak(app);
      await request
        .patch("/api/articles/1").set({
          "Content-Type": "application/json",
        })
        .send({ inc_votes: "Wrongety Wrong Wrong" })
        .expect(400);
    },
  );
});

Deno.test("DELETE /api/articles/:article_id", async (t) => {
  const client = await pool.connect();

  try {
    const articleResult = await client.queryObject(
      "INSERT INTO articles (title, topic, author, body, created_at, votes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [
        "Living in the shadow of a great man",
        "mitch",
        "butter_bridge",
        "I find this existence challenging",
        new Date(1594329060000),
        100,
      ],
    );
    const articleToDelete: IArticle = articleResult.rows[0] as IArticle;

    await t.step(
      "should delete an article when supplied with a valid, existent article ID, returning a 204",
      async () => {
        console.log(articleToDelete.article_id);
        const request = await superoak(app);
        await request
          .delete(`/api/articles/${articleToDelete.article_id}`)
          .expect(204);
      },
    );
    await t.step(
      "should return a 404 error if the article ID does not exist",
      async () => {
        const request = await superoak(app);
        await request.delete(`/api/articles/9999`).expect(404);
      },
    );
    await t.step(
      "should return a 400 error if an invalid article ID is supplied",
      async () => {
        const request = await superoak(app);
        await request.delete(`/api/articles/:blablabla`).expect(400);
      },
    );
  } finally {
    client?.release();
  }
});

Deno.test("POST /api/articles", async (t) => {
  await t.step(
    "should return a new article and a 201 when passed a valid new article object",
    async () => {
      const request = await superoak(app);
      await request.post("/api/articles")
        .send({
          author: "icellusedkars",
          title: "A nice title",
          body: "A nice body (for an article)",
          topic: "cats",
        })
        .expect(201);
    },
  );
  await t.step(
    "should return a 400 error if required parameters are missing",
    async () => {
      const request = await superoak(app);
      await request.post("/api/articles")
        .send({
          title: "A nice title",
          body: "A nice body (for an article)",
          topic: "cats",
        })
        .expect(400);
    },
  );
  await t.step("should return a 404 error if user does not exist", async () => {
    const request = await superoak(app);
    await request.post("/api/articles")
      .send({
        author: "sirnotappearinginthisapi",
        title: "A nice title",
        body: "A nice body (for an article)",
        topic: "cats",
      })
      .expect(404);
  });
  await t.step(
    "should return a 404 error if topic does not exist",
    async () => {
      const request = await superoak(app);
      await request
        .post("/api/articles")
        .send({
          author: "sirnotappearinginthisapi",
          title: "A nice title",
          body: "A nice body (for an article)",
          topic: "amagicalnonexistenttopic",
        })
        .expect(404);
    },
  );
});

Deno.test("GET /api/articles/recent", async (t) => {
  await t.step("should return a list of 3 most recent articles", async () => {
    const request = await superoak(app);
    await request
      .get("/api/articles/recent")
      .expect(200)
      .then(({ body: { articles } }) => {
        assertEquals(articles.length, 3);
        assertEquals(articles[0].title, "A nice title");
        assertEquals(
          articles[1].title,
          "Eight pug gifs that remind me of mitch",
        );
        assertEquals(articles[2].title, "A");
      });
  });
});

Deno.test("GET /api/articles/highest", async (t) => {
  await t.step("should return a list of 3 highest voted articles", async () => {
    const request = await superoak(app);
    await request
      .get("/api/articles/highest")
      .expect(200)
      .then(({ body: { articles } }) => {
        assertEquals(articles.length, 3);
        assertEquals(articles[0].title, "Living in the shadow of a great man");
        assertEquals(articles[1].title, "Sony Vaio; or, The Laptop");
        assertEquals(
          articles[2].title,
          "Eight pug gifs that remind me of mitch",
        );
      });
  });
});
