import { PullRequest } from '../pullrequests/pullRequest.ts';
import { ExecutedPipeline } from '../pipelines/executedPipeline.ts';

export interface AzureDevOpsClient {
  getPullRequests(): Promise<PullRequest[]>;
  runPipeline(pipelineId: string, branchName: string): Promise<ExecutedPipeline>;
}
