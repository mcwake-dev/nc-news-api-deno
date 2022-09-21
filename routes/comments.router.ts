import { Router } from "https://deno.land/x/oak/mod.ts";
import { notYetImplemented } from "../controllers/notYetImplemented.controller.ts";

const router = new Router();

router
    .get("/recent", notYetImplemented)
    .get("/highest", notYetImplemented)
    .patch("/:comment_id", notYetImplemented)
    .delete("/", notYetImplemented)
    
export {router};