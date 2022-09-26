import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import {
  getArticle,
  getArticles,
  highestVoted,
  mostRecent,
  patchArticle,
  postArticle,
  removeArticle,
} from "../controllers/article.controller.ts";
import { validateArticleId } from "../middleware/article_id.validate.middleware.ts";
import { validateArticleSearch } from "../middleware/article_search.validate.middleware.ts";
import { validateArticlePatch } from "../middleware/article_patch.validate.middleware.ts";
import { validateArticleExists } from "../middleware/article_exists.validate.middleware.ts";
import { validateTopicExists } from "../middleware/topic_exists.validate.middleware.ts";
import { validateNewArticle } from "../middleware/article_new.validate.middleware.ts";
import { validateUserExists } from "../middleware/user_exists.validate.middleware.ts";

const router = new Router();

router
  .get("/", validateArticleSearch, getArticles)
  .post(
    "/",
    validateNewArticle,
    validateTopicExists,
    validateUserExists,
    postArticle,
  )
  .get("/recent", mostRecent)
  .get("/highest", highestVoted)
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
  );

export { router };
