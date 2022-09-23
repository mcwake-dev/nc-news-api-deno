import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { errorHandler } from "../middleware/error.middleware.ts";

import { router as articleRouter } from "./articles.router.ts";
import { router as commentRouter } from "./comments.router.ts";
import { router as topicsRouter } from "./topics.router.ts";
import { router as usersRouter } from "./users.router.ts";

const router = new Router();

router.use(errorHandler);
router.use("/api/articles", articleRouter.routes());
router.use("/api/comments", commentRouter.routes());
router.use("/api/topics", topicsRouter.routes());
router.use("/api/users", usersRouter.routes());

export { router };
