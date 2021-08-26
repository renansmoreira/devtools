import { sendMessage } from '../../deps.ts';
import { ChatClient } from '../chatClient.ts';

export class DiscordChatClient implements ChatClient {
  async sendMessage(channelId: string, message: string): Promise<string> {
    const discordenoMessage = await sendMessage(BigInt(channelId), message);
    return discordenoMessage.id.toString();
  }
}
