import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { notYetImplemented } from "../controllers/notYetImplemented.controller.ts";
import { getArticle, getArticles } from "../controllers/article.controller.ts";
import { validateArticleId } from "../middleware/article_id.validate.middleware.ts";
import { validateArticleSearch } from "../middleware/article_search.validate.middleware.ts";

const router = new Router();

router
  .get("/", validateArticleSearch, getArticles)
  .post("/", notYetImplemented)
  .get("/recent", notYetImplemented)
  .get("/highest", notYetImplemented)
  .get("/:article_id", validateArticleId, getArticle)
  .patch("/:article_id", validateArticleId, notYetImplemented)
  .delete("/:article_id", validateArticleId, notYetImplemented)
  .get("/:article_id/comments", validateArticleId, notYetImplemented)
  .post("/:article_id/comments", validateArticleId, notYetImplemented);

export { router };
