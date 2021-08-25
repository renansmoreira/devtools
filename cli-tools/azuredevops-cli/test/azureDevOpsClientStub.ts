import { AzureDevOpsClient } from '../src/infra/azureDevOpsClient.ts';
import { PullRequest } from '../src/pullrequests/pullRequest.ts';
import { ExecutedPipeline } from '../src/pipelines/executedPipeline.ts';
import { Pipeline } from '../src/pipelines/pipeline.ts';
import { PipelineApproval } from '../src/pipelines/pipelineApproval.ts';

export class AzureDevOpsClientStub implements AzureDevOpsClient {
  async getPullRequests(): Promise<PullRequest[]> {
    return Promise.resolve([]);
  }

  getPipeline(pipelineId: number): Promise<Pipeline> {
    return Promise.resolve({} as Pipeline);
  }

  getApprovals(pipelineId: number): Promise<PipelineApproval[]> {
    return Promise.resolve([]);
  }

  approve(pipelineApproval: PipelineApproval): Promise<void> {
    return Promise.resolve();
  }

  reject(pipelineApproval: PipelineApproval): Promise<void> {
    return Promise.resolve();
  }

  async runPipeline(pipelineId: string, branchName: string): Promise<ExecutedPipeline> {
    return Promise.resolve({} as ExecutedPipeline);
  }
}
