import * as ink from 'https://deno.land/x/ink/mod.ts';
import { PullRequest } from '../../pullrequests/pullRequest.ts';
import { PullRequestReviewer } from '../../pullrequests/pullRequestReviewer.ts';

export class PullRequestsPrinter {
  private desiredRepositories: string[];

  constructor(desiredRepositories: string[]) {
    this.desiredRepositories = desiredRepositories;
  }

  print(pullRequests: PullRequest[]): void {
    this.desiredRepositories.forEach((repository: string) => {
      console.log(ink.colorize(`<b>${repository}</b>`));

      const pullRequestsToPrint = pullRequests
        .filter((pullRequest: PullRequest) => pullRequest.itsFrom(repository));

      if (pullRequestsToPrint.length) {
        pullRequestsToPrint.forEach(
          (pullRequest: PullRequest) => this.printPullRequest(pullRequest));
      }
      else {
        console.log(ink.colorize('<blue>Yaaay, nothing here!</blue>'));
        console.log('');
      }

      console.log('');
    });
  }

  private printPullRequest(pullRequest: PullRequest): void {
    const branchName = pullRequest.targetBranchWarnIsNeeded
    ? `<red>${pullRequest.targetBranch}</red>` : pullRequest.targetBranch;

    console.log(ink.colorize(`<b>${pullRequest.title}</b>`));
    console.log(ink.colorize(`<yellow>${pullRequest.createdBy}</yellow> @ ${pullRequest.sourceBranch} <yellow>to</yellow> ${branchName}`));
    this.printReviewers(pullRequest);
    console.log(ink.colorize(`<green>${pullRequest.status}</green> - <blue><u>${pullRequest.href}</u></blue>`));
    console.log('');

  }

  private printReviewers(pullRequest: PullRequest): void {
    pullRequest.reviewers
    .filter((reviewer: PullRequestReviewer) => reviewer.checkIfCanBePrinted())
    .forEach((reviewer: PullRequestReviewer) => console.log(`${reviewer.voteDescription} by ${reviewer.name}`));
  }
}
