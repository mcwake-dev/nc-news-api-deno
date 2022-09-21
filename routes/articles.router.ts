import { Router } from "https://deno.land/x/oak/mod.ts";
import { notYetImplemented } from "../controllers/notYetImplemented.controller.ts";

const router = new Router();

router
    .get("/", notYetImplemented)
    .post("/", notYetImplemented)
    .get("/recent", notYetImplemented)
    .get("/highest", notYetImplemented)
    .get("/:article_id", notYetImplemented)
    .patch("/:article_id", notYetImplemented)
    .delete("/:article_id", notYetImplemented)
    .get("/:article_id/comments", notYetImplemented)
    .post("/:article_id/comments", notYetImplemented);
    
export { router };