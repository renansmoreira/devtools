import { CreateMessage, MessageReference } from 'https://deno.land/x/discordeno/mod.ts';

export class DiscordMessage {
  private _id: number;
  private _channelId: bigint;
  private _guildId: number;

  constructor(messageToMap: any) {
    this._id = messageToMap.id;
    this._channelId = messageToMap.channelId;
    this._guildId = messageToMap.guildId;
  }

  createReply(message: string): CreateMessage {
    const messageReference: MessageReference = {
      messageId: this._id.toString(),
      channelId: this._channelId.toString(),
      guildId: this._guildId.toString(),
      failIfNotExists: true
    };

    return {
      content: message,
      messageReference: messageReference
    };
  }

  createSimpleMessage(message: string): CreateMessage {
    return {
      content: message
    };
  }
  
  get channelId(): bigint {
    return this._channelId;
  }
}
