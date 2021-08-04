import { Command } from './command.ts';
import { AzureDevOpsClient } from '../azureDevOpsClient.ts'
import { PullRequestsPrinter } from '../pullrequests/pullRequestsPrinter.ts';

export class PullRequestCommand implements Command {
  private azureDevOpsClient: AzureDevOpsClient;

  constructor(azureDevOpsClient: AzureDevOpsClient) {
    this.azureDevOpsClient = azureDevOpsClient;
  }

  private get desiredRepositories(): string[] {
    return (Deno.env.get('AZURE_DEVOPS_DESIRED_REPOSITORIES') || '').split(',');
  }

  async execute(): Promise<void> {
    const desiredPullRequests = await this.azureDevOpsClient.getPullRequests();
    new PullRequestsPrinter(this.desiredRepositories).print(desiredPullRequests);
  }
}
