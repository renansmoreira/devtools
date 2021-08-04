import * as ink from 'https://deno.land/x/ink/mod.ts';

export class PullRequest {
  private repository: string;
  private title: string;
  private status: string;
  private sourceBranch: string;
  private targetBranch: string;
  private href: string;

  constructor(pullRequestToMap: any) {
    this.repository = pullRequestToMap.repository.name;
    this.title = pullRequestToMap.title;
    this.status = pullRequestToMap.status;
    this.sourceBranch = pullRequestToMap.sourceRefName.replace('refs/heads/', '');
    this.targetBranch = pullRequestToMap.targetRefName.replace('refs/heads/', '');
    this.href = `https://dev.azure.com/solucoesdigix/Projetos/_git/${this.repository}/pullrequest/${pullRequestToMap.codeReviewId}`;
  }

  itsFrom(repository: string): boolean {
    return this.repository === repository;
  }

  print(): void {
    console.log(this.title);
    this.printBranches();
    console.log(`not reviewed, ${ink.colorize(`<green>${this.status}</green>`)} - ${ink.colorize(`<blue><u>${this.href}</u></blue>`)}`);
    console.log('');
  }

  private printBranches() {
    const devWarning = this.targetBranch === 'dev' ? ' ⚠️': '';
    const masterWarning = this.targetBranch === 'master' ? ' ☢️': '';
    console.log(`${this.sourceBranch} - ${this.targetBranch}${devWarning || masterWarning}`);
  }
}
