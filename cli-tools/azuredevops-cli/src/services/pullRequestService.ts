import { Command } from './command.ts';
import { Service } from './service.ts';
import { ServiceResponse } from './serviceResponse.ts';
import { AzureDevOpsClient } from '../infra/azureDevOpsClient.ts'

export class PullRequestService implements Service<ServiceResponse> {
  private azureDevOpsClient: AzureDevOpsClient;

  constructor(azureDevOpsClient: AzureDevOpsClient) {
    this.azureDevOpsClient = azureDevOpsClient;
  }

  private get desiredRepositories(): string[] {
    return (Deno.env.get('AZURE_DEVOPS_DESIRED_REPOSITORIES') || '').split(',');
  }

  async execute(command: Command): Promise<ServiceResponse> {
    const desiredPullRequests = await this.azureDevOpsClient.getPullRequests();
    return new ServiceResponse(desiredPullRequests);
  }
}
