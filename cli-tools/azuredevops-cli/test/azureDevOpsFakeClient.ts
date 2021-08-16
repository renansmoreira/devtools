import { AzureDevOpsClient } from '../src/azureDevOpsClient.ts';

export class AzureDevOpsFakeClient implements AzureDevOpsClient {
  async getPullRequests(): Promise<any> {
    return Promise.resolve();
  }
}
