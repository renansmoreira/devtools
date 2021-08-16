import { AzureDevOpsClient } from '../src/azureDevOpsClient.ts';

export class AzureDevOpsClientStub implements AzureDevOpsClient {
  async getPullRequests(): Promise<any> {
    return Promise.resolve();
  }
}
