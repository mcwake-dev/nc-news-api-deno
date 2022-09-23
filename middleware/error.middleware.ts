import log from "../utils/log.ts";

const lg = log.getLogger();

// deno-lint-ignore no-explicit-any
export const errorHandler = async (ctx: any, next: any) => {
  try {
    await next();
  } catch (err) {
    console.log(err.constructor.name);
    if (err.constructor.name === "ZodError") {
      lg.warning(`${ctx.request.url} ${err.message}`);
      ctx.response.status = 400;
    } else if (err.status) {
      lg.warning(`${ctx.request.url} ${err.message}`);
      ctx.response.status = err.status;
    } else {
      lg.error(`${ctx.request.url} ${err.message}`);
      ctx.response.status = 500;
    }

    ctx.response.body = { err };
  }
};
