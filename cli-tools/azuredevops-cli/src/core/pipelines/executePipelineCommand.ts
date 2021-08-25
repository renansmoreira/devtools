export class ExecutePipelineCommand {
  private _pipelineName: string;
  private _branchName: string;
  private _personalAccessToken: string;

  constructor(pipelineName: string, branchName: string, personalAccessToken: string) {
    this._pipelineName = pipelineName;
    this._branchName = branchName;
    this._personalAccessToken = personalAccessToken;
  }

  get pipelineName(): string {
    return this._pipelineName;
  }

  get branchName(): string {
    return this._branchName;
  }

  get personalAccessToken(): string {
    return this._personalAccessToken;
  }
}
