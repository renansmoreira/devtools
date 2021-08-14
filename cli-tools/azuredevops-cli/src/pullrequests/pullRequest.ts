import * as ink from 'https://deno.land/x/ink/mod.ts';
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

  print(): void {
    console.log(ink.colorize(`<b>${this._title}</b>`));
    console.log(ink.colorize(`<yellow>${this._createdBy}</yellow> @ ${this.formatBranchToPrint()}`));
    this.printReviewers();
    console.log(ink.colorize(`<green>${this._status}</green> - <blue><u>${this._href}</u></blue>`));
    console.log('');
  }

  private printReviewers(): void {
    this._reviewers
      .filter((reviewer: PullRequestReviewer) => reviewer.checkIfCanBePrinted())
      .forEach((reviewer: PullRequestReviewer) => reviewer.print());
  }

  private formatBranchToPrint(): string {
    const devWarning = this._targetBranch === 'dev' ? ' ⚠️': '';
    const masterWarning = this._targetBranch === 'master' ? ' ☢️': '';
    return `${this._sourceBranch} to ${this._targetBranch}${devWarning || masterWarning}`;
  }
}
