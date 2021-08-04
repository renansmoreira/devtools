import * as ink from 'https://deno.land/x/ink/mod.ts';
import { PullRequest } from './pullRequest.ts';

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
        pullRequestsToPrint
          .forEach((pullRequest: PullRequest) => pullRequest.print());
      }
      else {
        console.log(ink.colorize('<blue>Yaaay, nothing here!</blue>'));
        console.log('');
      }

      console.log('');
    });
  }
}
