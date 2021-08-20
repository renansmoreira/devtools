import { PullRequestVote } from './pullRequestVote.ts';

export class PullRequestReviewer {
  private _name: string;
  private _vote: PullRequestVote;

  constructor(reviewerToMap: any) {
    this._name = reviewerToMap.displayName;
    this._vote = new PullRequestVote(reviewerToMap.vote);
  }

  checkIfCanBePrinted(): boolean {
    return this._name.indexOf('[Projetos]') <= -1;
  }

  get voteDescription(): string {
    return this._vote.description;
  }

  get name(): string {
    return this._name;
  }
}
