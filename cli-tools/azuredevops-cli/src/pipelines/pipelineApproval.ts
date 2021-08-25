export class PipelineApproval {
  private _id: string;
  private _state: string;

  constructor(id: string, state: string) {
    this._id = id;
    this._state = state;
  }

  get id(): string {
    return this._id;
  }

  get isPending(): boolean {
    return this._state === 'inProgress';
  }
}
