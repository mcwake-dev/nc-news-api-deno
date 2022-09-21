import * as log from "https://deno.land/std@0.156.0/log/mod.ts";

await log.setup({
  handlers: {
    formatted: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: "[{datetime}] {levelName} {msg}",
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["formatted"],
    },
  },
});

export default log;
