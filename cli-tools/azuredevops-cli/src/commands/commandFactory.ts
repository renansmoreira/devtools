import { AzureDevOpsClient } from '../azureDevOpsClient.ts';
import { Command } from './command.ts';
import { EmptyCommand } from './emptyCommand.ts';
import { PullRequestCommand } from './pullRequestCommand.ts';

export class CommandFactory {
  private azureDevOpsClient: AzureDevOpsClient;
  private availableCommands: any;
  private emptyCommandFactory: any = () => new EmptyCommand(this.azureDevOpsClient);

  constructor() {
    this.azureDevOpsClient = new AzureDevOpsClient();
    this.availableCommands = {
      'pr': (): Command => new PullRequestCommand(this.azureDevOpsClient)
    };
  }

  create(command: string): Command {
    return (this.availableCommands[command] || this.emptyCommandFactory)();
  }
}
