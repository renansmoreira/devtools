import { Command } from './command.ts';
import { Service } from './service.ts';
import { ServiceResponse } from './serviceResponse.ts';
import { AzureDevOpsClient } from '../infra/azureDevOpsClient.ts'
import { ConfigProvider } from '../configs/configProvider.ts';

export class PullRequestService implements Service<ServiceResponse> {
  private _azureDevOpsClient: AzureDevOpsClient;
  private _configProvider: ConfigProvider;

  constructor(azureDevOpsClient: AzureDevOpsClient, configProvider: ConfigProvider) {
    this._azureDevOpsClient = azureDevOpsClient;
    this._configProvider = configProvider;
  }

  async execute(_command: Command): Promise<ServiceResponse> {
    const desiredPullRequests = await this._azureDevOpsClient
      .configToken(this._configProvider.azureDevOpsCliUserPat)
      .getPullRequests();
    return new ServiceResponse(desiredPullRequests);
  }
}
