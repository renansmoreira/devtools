import { AzureDevOpsClient } from './azureDevOpsClient.ts';
import { ConfigProvider } from '../configs/configProvider.ts';
import { PullRequest } from '../pullrequests/pullRequest.ts';
import { ExecutedPipeline } from '../pipelines/executedPipeline.ts';
import { Pipeline } from '../pipelines/pipeline.ts';
import { PipelineApproval } from '../pipelines/pipelineApproval.ts';
import { Build } from './build.ts';
import { Timeline } from './timeline.ts';
import { TimelineRecord } from './timelineRecord.ts';
import { PipelineMapper } from './pipelineMapper.ts';

export class AzureDevOpsHttpClient implements AzureDevOpsClient {
  private instance: string;
  private teamProject: string;
  private username: string;
  private personalAccessToken: string;
  private _pipelineMapper: PipelineMapper;

  constructor(configProvider: ConfigProvider, pipelineMapper: PipelineMapper) {
    this.instance = configProvider.azureDevOpsInstance;
    this.teamProject = configProvider.azureDevOpsTeamProject;
    this.username = configProvider.azureDevOpsUsername;
    this.personalAccessToken = configProvider.azureDevOpsPersonalAccessToken;
    this._pipelineMapper = pipelineMapper;
  }

  private get uri(): string {
    return `https://dev.azure.com/${this.instance}/${this.teamProject}`;
  }

  private get authenticationToken(): string {
    return btoa(`${this.username}:${this.personalAccessToken}`);
  }

  private createRequestOptions(method: string): RequestInit {
    return {
      method: method || 'GET',
      headers: {
        'Authorization': `Basic ${this.authenticationToken}`,
        'Content-Type': 'application/json',
      }
    };
  }

  async getPullRequests(): Promise<PullRequest[]> {
    const response = await fetch(
      `${this.uri}/_apis/git/pullrequests?api-version=6.0`, this.createRequestOptions('GET'));
    const foundPullRequests = await response.json();

    return foundPullRequests.value.map(
      (pullRequestToMap: unknown) => new PullRequest(this.uri, pullRequestToMap));
  }

  async getPipeline(pipelineId: string): Promise<Pipeline> {
    const response = await fetch(
      `${this.uri}/_apis/build/builds/${pipelineId}?api-version=5.1`, this.createRequestOptions('GET'));
    const foundPipeline: Build = await response.json();

    return this._pipelineMapper.map(foundPipeline);
  }

  async getApprovals(pipelineId: string): Promise<PipelineApproval[]> {
    const response = await fetch(
      `${this.uri}/_apis/build/builds/${pipelineId}/Timeline?api-version=6.1-preview.2`, this.createRequestOptions('GET'));
    const timeline: Timeline = await response.json();
    const approvals = timeline.records.filter(
      (timelineRecord: TimelineRecord) => timelineRecord.type === 'Checkpoint.Approval');

    return approvals.map((approval: TimelineRecord) => new PipelineApproval(approval.id, approval.state));

  }

  async approve(pipelineApproval: PipelineApproval): Promise<void> {
    return await this.pipelineApprovals(pipelineApproval, 'approved');
  }

  async reject(pipelineApproval: PipelineApproval): Promise<void> {
    return await this.pipelineApprovals(pipelineApproval, 'rejected');
  }

  private async pipelineApprovals(pipelineApproval: PipelineApproval, status: string): Promise<void> {
    const requestOptions = Object.assign({},
      this.createRequestOptions('PATCH'),
      {
        body: JSON.stringify([{
          approvalId: pipelineApproval.id,
          comment: '',
          status: status
        }])
      }
    );

    const response = await fetch(
      `${this.uri}/_apis/pipelines/approvals?api-version=6.1-preview.1`, requestOptions);

    return Promise.resolve();
  }

  async runPipeline(pipelineId: string, branchName: string): Promise<ExecutedPipeline> {
    const requestOptions = Object.assign({},
      this.createRequestOptions('POST'),
      {
        body: JSON.stringify({
          resources: {
            repositories: {
              self: {
                refName: `refs/heads/${branchName}`
              }
            }
          }
        })
      }
    );
    const response = await fetch(
      `${this.uri}/_apis/pipelines/${pipelineId}/runs?api-version=6.1-preview.1`, requestOptions);
    const executedPipelineToMap = await response.json();

    return new ExecutedPipeline(true, this.uri, executedPipelineToMap);
  }
}
