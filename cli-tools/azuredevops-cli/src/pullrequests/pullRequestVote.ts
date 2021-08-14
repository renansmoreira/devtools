const azureDevOpsPullRequestVoteCode: any = {
  '10': '✅ approved',
  '5': '✅ approved with suggestions',
  '0': '⏳ no vote yet',
  '-5': '🕑 waiting for author',
  '-10': '❌ rejected'
};

export class PullRequestVote {
  private _description: string;

  constructor(pullRequestVoteCode: string) {
    this._description = azureDevOpsPullRequestVoteCode[pullRequestVoteCode] as string;
  }

  get description(): string {
    return this._description;
  }
}
