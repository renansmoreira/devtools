export class Command {
  constructor(private _content: any = {}) {
  }

  get content(): any {
    return this._content;
  }
}
