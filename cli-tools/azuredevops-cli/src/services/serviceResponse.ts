export class ServiceResponse {
  private _content: any;

  constructor(content: any = undefined) {
    this._content = content;
  }

  get content(): any {
    return this._content;
  }
}
