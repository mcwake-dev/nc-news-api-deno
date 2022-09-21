import { Router } from "https://deno.land/x/oak/mod.ts";
import { notYetImplemented } from "../controllers/notYetImplemented.controller.ts";

const router = new Router();

router
  .get("/", notYetImplemented)
  .post("/", notYetImplemented)
  .get("/:username", notYetImplemented)
  .get("/exists/:username", notYetImplemented);

export { router };
