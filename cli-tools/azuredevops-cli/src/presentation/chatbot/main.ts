import { startBot, sendMessage } from 'https://deno.land/x/discordeno/mod.ts';
import { AzureDevOpsHttpClient } from '../../infra/azureDevOpsHttpClient.ts';
import { ConfigJsonProvider } from '../../configs/configJsonProvider.ts';
import { ExecutePipelineService } from '../../services/executePipelineService.ts';
import { MessageParser } from './messageParser.ts';
import { MessageCommand } from './messagecommands/messageCommand.ts';
import { PipelineMessageCommand } from './messagecommands/pipelineMessageCommand.ts';
import { DiscordMessage } from './discordMessage.ts';

const azureDevOpsClient = new AzureDevOpsHttpClient();
const configProvider = new ConfigJsonProvider();

const messageParser = new MessageParser(Deno.env.get('DISCORD_BOT_PREFFIX'), [
  new PipelineMessageCommand(new ExecutePipelineService(azureDevOpsClient, configProvider), configProvider)
]);

startBot({
  token: Deno.env.get('DISCORD_BOT_TOKEN') || '',
  intents: ['Guilds', 'GuildMessages'],
  eventHandlers: {
    ready() {
      console.log('Successfully connected to gateway');
    },
    async messageCreate(message) {
      console.log(message);
      const messageCommands = messageParser.parse(message) || [];

      for (let command of messageCommands) {
        const createMessage = await command.execute(new DiscordMessage(message));
        sendMessage(message.channelId, createMessage);
      }
    },
  },
});
