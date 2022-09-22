import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { notYetImplemented } from "../controllers/notYetImplemented.controller.ts";

const router = new Router();

router
  .get("/recent", notYetImplemented)
  .get("/highest", notYetImplemented)
  .patch("/:comment_id", notYetImplemented)
  .delete("/", notYetImplemented);

export { router };
