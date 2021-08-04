import { PullRequest } from './pullrequests/pullRequest.ts';

export class AzureDevOpsClient {
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
    return `https://dev.azure.com/${this.instance}/${this.teamProject}/_apis`;
  }

  private get authenticationToken(): string {
    return btoa(`${this.username}:${this.personalAccessToken}`);
  }

  async getPullRequests(): Promise<any> {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.authenticationToken}`
      }
    };
    const response = await fetch(`${this.uri}/git/pullrequests?api-version=6.0`, requestOptions);
    const foundPullRequests = await response.json();
    return foundPullRequests.value.map(
      (pullRequestToMap: any) => new PullRequest(pullRequestToMap));
  }
}
