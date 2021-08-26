import { PullRequest } from '../pullrequests/pullRequest.ts';
import { Pipeline } from '../pipelines/pipeline.ts';
import { PipelineApproval } from '../pipelines/pipelineApproval.ts';
import { ExecutedPipeline } from '../pipelines/executedPipeline.ts';

export interface AzureDevOpsClient {
  getPullRequests(): Promise<PullRequest[]>;

  getPipeline(pipelineId: string): Promise<Pipeline>;
  getApprovals(pipelineId: string): Promise<PipelineApproval[]>;
  approve(pipelineApproval: PipelineApproval): Promise<void>;
  reject(pipelineApproval: PipelineApproval): Promise<void>;
  runPipeline(pipelineId: string, branchName: string): Promise<ExecutedPipeline>;
}
