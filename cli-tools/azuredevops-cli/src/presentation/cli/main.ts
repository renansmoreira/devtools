import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { Command } from '../../services/command.ts';
import { ServiceFactory } from '../../services/serviceFactory.ts';
import { ServiceResponse } from '../../services/serviceResponse.ts';
import { PullRequestsPrinter } from './pullRequestsPrinter.ts';
import { ExecutedPipelinePrinter } from './executedPipelinePrinter.ts';
import { ExecutedPipeline } from '../../pipelines/executedPipeline.ts';

config({
  export: true,
  safe: true
});

const [operation, arg1, arg2] = Deno.args;

(async function () {
  const response: any = await new ServiceFactory()
    .create(operation)
    .execute(new Command([ arg1, arg2 ]));

  // TODO: Refactor to remove all ifs
  if (operation === 'pr') {
    const desiredRepositories = (Deno.env.get('AZURE_DEVOPS_DESIRED_REPOSITORIES') || '').split(',');
    new PullRequestsPrinter(desiredRepositories).print(response.content);
  }

  if (operation === 'pipeline') {
    new ExecutedPipelinePrinter().print(response);
  }
})();
