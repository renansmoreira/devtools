import { PullRequestReviewer } from './pullRequestReviewer.ts';

export class PullRequest {
  private _repository: string;
  private _title: string;
  private _status: string;
  private _createdBy: string;
  private _sourceBranch: string;
  private _targetBranch: string;
  private _reviewers: PullRequestReviewer[];
  private _href: string;

  constructor(azureDevOpsUri: string, pullRequestToMap: any) {
    this._repository = pullRequestToMap.repository.name;
    this._title = pullRequestToMap.title;
    this._status = pullRequestToMap.status;
    this._createdBy = pullRequestToMap.createdBy.displayName;
    this._sourceBranch = pullRequestToMap.sourceRefName.replace('refs/heads/', '');
    this._targetBranch = pullRequestToMap.targetRefName.replace('refs/heads/', '');
    this._reviewers = this.mapReviewers(pullRequestToMap);
    this._href = `${azureDevOpsUri}/_git/${this._repository}/pullrequest/${pullRequestToMap.codeReviewId}`;
  }

  private mapReviewers(pullRequestToMap: any): PullRequestReviewer[] {
    return pullRequestToMap.reviewers
      .map((reviewer: any) => new PullRequestReviewer(reviewer));
  }

  itsFrom(repository: string): boolean {
    return this._repository === repository;
  }

  get title(): string {
    return this._title;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get targetBranchWarnIsNeeded(): boolean {
    return this._targetBranch === 'dev' || this._targetBranch === 'master';
  }

  get sourceBranch(): string {
    return this._sourceBranch;
  }

  get targetBranch(): string {
    const devWarning = this._targetBranch === 'dev' ? '⚠️': '';
    const masterWarning = this._targetBranch === 'master' ? '☢️': '';
    return `${this._targetBranch} ${devWarning || masterWarning}`;
  }

  get reviewers(): PullRequestReviewer[] {
    return this._reviewers;
  }

  get status(): string {
    return this._status;
  }

  get href(): string {
    return this._href;
  }
}
