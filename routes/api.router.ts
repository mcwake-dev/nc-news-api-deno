import { Router } from "https://deno.land/x/oak/mod.ts";

import { router as articleRouter } from "./articles.router.ts";
import { router as commentRouter } from "./comments.router.ts";
import { router as topicsRouter } from "./topics.router.ts";
import { router as usersRouter } from "./users.router.ts";

const router = new Router();

router.use("/api/articles", articleRouter.routes());
router.use("/api/comments", commentRouter.routes());
router.use("/api/topics", topicsRouter.routes());
router.use("/api/users", usersRouter.routes());

export { router };
