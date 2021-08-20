import { AzureDevOpsClient } from './azureDevOpsClient.ts';
import { PullRequest } from '../pullrequests/pullRequest.ts';
import { ExecutedPipeline } from '../pipelines/executedPipeline.ts';

export class AzureDevOpsHttpClient implements AzureDevOpsClient {
  private instance: string;
  private teamProject: string;
  private username: string;
  private personalAccessToken: string;

  constructor() {
    this.instance = Deno.env.get('AZURE_DEVOPS_INSTANCE') || '';
    this.teamProject = Deno.env.get('AZURE_DEVOPS_TEAM_PROJECT') || '';
    this.username = Deno.env.get('AZURE_DEVOPS_USERNAME') || '';
    this.personalAccessToken = Deno.env.get('AZURE_DEVOPS_PAT') || '';
  }

  private get uri(): string {
    return `https://dev.azure.com/${this.instance}/${this.teamProject}`;
  }

  private get authenticationToken(): string {
    return btoa(`${this.username}:${this.personalAccessToken}`);
  }

  private createRequestOptions(method: string): any {
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
      (pullRequestToMap: any) => new PullRequest(this.uri, pullRequestToMap));
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
