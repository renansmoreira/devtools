import { Command } from '../../services/command.ts';
import { ServiceFactory } from '../../services/serviceFactory.ts';
import { ServiceResponse } from '../../services/serviceResponse.ts';
import { PullRequestsPrinter } from './pullRequestsPrinter.ts';
import { ExecutedPipelinePrinter } from './executedPipelinePrinter.ts';
import { ExecutedPipeline } from '../../pipelines/executedPipeline.ts';
import { ConfigJsonProvider } from '../../configs/configJsonProvider.ts';

const configJsonProvider = new ConfigJsonProvider();
const [operation, arg1, arg2] = Deno.args;

(async function () {
  const service: any = await new ServiceFactory()
    .create(operation)
    .execute(new Command([ arg1, arg2 ]));

  // TODO: Refactor to remove all ifs
  if (operation === 'pr') {
    const desiredRepositories = configJsonProvider.azureDevOpsDesiredRepositories;
    new PullRequestsPrinter(desiredRepositories).print(response.content);
  }

  if (operation === 'pipeline') {
    new ExecutedPipelinePrinter().print(response);
  }
})();
