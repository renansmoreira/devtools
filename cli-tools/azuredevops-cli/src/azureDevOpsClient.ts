import { PullRequest } from './pullrequests/pullRequest.ts';

export interface AzureDevOpsClient {
  getPullRequests(): Promise<any>;
}
