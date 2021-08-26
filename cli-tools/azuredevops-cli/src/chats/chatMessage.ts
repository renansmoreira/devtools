export class ChatMessage {
  private _id: string;
  private _channelId: string;
  private _authorId: string;

  constructor(id: string, channelId: string, authorId: string) {
    this._id = id;
    this._channelId = channelId;
    this._authorId = authorId;
  }

  get id(): string {
    return this._id;
  }

  get channelId(): string {
    return this._channelId;
  }

  get authorId(): string {
    return this._authorId;
  }
}
