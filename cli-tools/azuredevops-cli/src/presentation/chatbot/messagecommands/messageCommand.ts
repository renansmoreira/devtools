import { CreateMessage } from 'https://deno.land/x/discordeno/mod.ts';
import { ChatMessage } from '../../../chats/chatMessage.ts';

export interface MessageCommand {
  parse(messageCommand: string): boolean;
  execute(chatMessage: ChatMessage): Promise<CreateMessage>;
}
