import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { notYetImplemented } from "../controllers/notYetImplemented.controller.ts";
import {
  getArticle,
  getArticles,
  patchArticle,
  removeArticle,
} from "../controllers/article.controller.ts";
import { validateArticleId } from "../middleware/article_id.validate.middleware.ts";
import { validateArticleSearch } from "../middleware/article_search.validate.middleware.ts";
import { validateArticlePatch } from "../middleware/article_patch.validate.middleware.ts";
import { validateArticleExists } from "../middleware/article_exists.validate.middleware.ts";

const router = new Router();

router
  .get("/", validateArticleSearch, getArticles)
  .post("/", notYetImplemented)
  .get("/recent", notYetImplemented)
  .get("/highest", notYetImplemented)
  .get("/:article_id", validateArticleId, validateArticleExists, getArticle)
  .patch(
    "/:article_id",
    validateArticlePatch,
    validateArticleExists,
    patchArticle,
  )
  .delete(
    "/:article_id",
    validateArticleId,
    validateArticleExists,
    removeArticle,
  )
  .get(
    "/:article_id/comments",
    validateArticleId,
    validateArticleExists,
    notYetImplemented,
  )
  .post(
    "/:article_id/comments",
    validateArticleId,
    validateArticleExists,
    notYetImplemented,
  );

export { router };
