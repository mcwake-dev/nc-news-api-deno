import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { notYetImplemented } from "../controllers/notYetImplemented.controller.ts";

const router = new Router();

router
  .get("/", notYetImplemented)
  .post("/", notYetImplemented)
  .get("/:username", notYetImplemented)
  .get("/exists/:username", notYetImplemented);

export { router };
