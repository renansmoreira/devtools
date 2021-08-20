import { CreateMessage } from 'https://deno.land/x/discordeno/mod.ts';
import { DiscordMessage } from '../discordMessage.ts';

export interface MessageCommand {
  parse(messageCommand: string): boolean;
  execute(discordMessage: DiscordMessage): Promise<CreateMessage>;
}
