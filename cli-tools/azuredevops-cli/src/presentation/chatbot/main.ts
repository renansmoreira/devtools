import { startBot, sendMessage } from 'https://deno.land/x/discordeno/mod.ts';
import { AzureDevOpsHttpClient } from '../../infra/azureDevOpsHttpClient.ts';
import { ExecutePipelineService } from '../../services/executePipelineService.ts';
import { MessageParser } from './messageParser.ts';
import { MessageCommand } from './messagecommands/messageCommand.ts';
import { PipelineMessageCommand } from './messagecommands/pipelineMessageCommand.ts';
import { DiscordMessage } from './discordMessage.ts';

const azureDevOpsClient = new AzureDevOpsHttpClient();

const messageParser = new MessageParser('boga', [
  new PipelineMessageCommand(new ExecutePipelineService(azureDevOpsClient))
]);

startBot({
  token: Deno.env.get('DISCORD_BOT_TOKEN') || '',
  intents: ['Guilds', 'GuildMessages'],
  eventHandlers: {
    ready() {
      console.log('Successfully connected to gateway');
    },
    async messageCreate(message) {
      const messageCommands = messageParser.parse(message) || [];

      for (let command of messageCommands) {
        const createMessage = await command.execute(new DiscordMessage(message));
        sendMessage(message.channelId, createMessage);
      }
    },
  },
});
