import { AzureDevOpsClient } from '../azureDevOpsClient.ts';
import { AzureDevOpsHttpClient } from '../azureDevOpsHttpClient.ts';
import { Command } from './command.ts';
import { EmptyCommand } from './emptyCommand.ts';
import { PullRequestCommand } from './pullRequestCommand.ts';

export class CommandFactory {
  private availableCommands: any;
  private emptyCommandFactory: any = () => new EmptyCommand(this.azureDevOpsClient);

  constructor(
    private azureDevOpsClient: AzureDevOpsClient = new AzureDevOpsHttpClient()) {
    this.availableCommands = {
      'pr': (): Command => new PullRequestCommand(this.azureDevOpsClient)
    };
  }

  create(command: string): Command {
    return (this.availableCommands[(command || '').trim()] || this.emptyCommandFactory)();
  }
}
