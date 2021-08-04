import { config } from "https://deno.land/x/dotenv/mod.ts";
import { CommandFactory } from './commands/commandFactory.ts';

config({
  export: true,
  safe: true
});

const [cliCommand] = Deno.args;

(async function () {
  new CommandFactory()
    .create(cliCommand)
    .execute();
})();
