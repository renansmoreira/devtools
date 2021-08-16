import { AzureDevOpsClient } from '../src/azureDevOpsClient.ts';
import { PullRequest } from '../src/pullrequests/pullRequest.ts';

export class AzureDevOpsClientStub implements AzureDevOpsClient {
  async getPullRequests(): Promise<PullRequest[]> {
    return Promise.resolve([]);
  }
}
