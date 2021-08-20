export class ExecutedPipeline {
  private _success: boolean;
  private _id: string;
  private _name: string;
  private _state: string;
  private _href: string;

  constructor(success: boolean, azureDevOpsUri: string, executedPipelineToMap: any) {
    this._success = success;
    this._id = executedPipelineToMap.id;
    this._name = executedPipelineToMap.name;
    this._state = executedPipelineToMap.state;
    this._href = executedPipelineToMap._links.web.href;
  }

  get success(): boolean {
    return this._success;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get state(): string {
    return this._state;
  }

  get href(): string {
    return this._href;
  }
}
