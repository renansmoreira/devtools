import { sendMessage } from '../../deps.ts';
import { ChatClient } from '../chatClient.ts';

export class DiscordChatClient implements ChatClient {
  async sendMessage(channelId: bigint, message: string): Promise<bigint> {
    const discordenoMessage = await sendMessage(channelId, message);
    return discordenoMessage.id;
  }
}
