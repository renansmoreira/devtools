export class Pipeline {
  private _id: string;
  private _name: string;
  private _webHref: string;
  private _status = '';
  private _result = '';

  constructor(id: string, name: string, webHref: string) {
    this._id = id;
    this._name = name;
    this._webHref = webHref;
  }

  set status(newStatus: string) {
    this._status = newStatus;
  }

  set result(newResult: string) {
    this._result = newResult;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get webHref(): string {
    return this._webHref;
  }

  get isInProgress(): boolean {
    return this._status === 'inProgress';
  }
}
