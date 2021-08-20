import { AzureDevOpsClient } from '../src/infra/azureDevOpsClient.ts';
import { PullRequest } from '../src/pullrequests/pullRequest.ts';
import { ExecutedPipeline } from '../src/pipelines/executedPipeline.ts';

export class AzureDevOpsClientStub implements AzureDevOpsClient {
  async getPullRequests(): Promise<PullRequest[]> {
    return Promise.resolve([]);
  }

  async runPipeline(pipelineId: string, branchName: string): Promise<ExecutedPipeline> {
    return Promise.resolve({} as ExecutedPipeline);
  }
}
