import { startBot, sendMessage } from 'https://deno.land/x/discordeno/mod.ts';
import { PipelineMapper } from '../../infra/pipelineMapper.ts';
import { AzureDevOpsHttpClient } from '../../infra/azureDevOpsHttpClient.ts';
import { ConfigJsonProvider } from '../../configs/configJsonProvider.ts';
import { DiscordChatClient } from '../../infra/discordChatClient.ts';
import { PipelineWatcher } from '../../pipelines/pipelineWatcher.ts';
import { PipelineApprovalWatcher } from '../../pipelines/pipelineApprovalWatcher.ts';
import { ExecutePipelineService } from '../../services/executePipelineService.ts';
import { MessageParser } from './messageParser.ts';
import { MessageCommand } from './messagecommands/messageCommand.ts';
import { PipelineMessageCommand } from './messagecommands/pipelineMessageCommand.ts';
import { DiscordMessage } from './discordMessage.ts';

/*
 * Ideas:
 * - Add a configurable http request service, so it can trigger with
 *  a desired endpoint, method and message trigger;
 *  */

const pipelineMapper = new PipelineMapper();
const azureDevOpsClient = new AzureDevOpsHttpClient(pipelineMapper);
const configProvider = new ConfigJsonProvider();
const discordChatClient = new DiscordChatClient();

const pipelineApprovalWatcher = new PipelineApprovalWatcher(azureDevOpsClient, discordChatClient);
const pipelineWatcher = new PipelineWatcher(azureDevOpsClient, pipelineApprovalWatcher, discordChatClient);
pipelineWatcher.startWatching();

const messageParser = new MessageParser(Deno.env.get('DISCORD_BOT_PREFFIX'), [
  new PipelineMessageCommand(new ExecutePipelineService(
    azureDevOpsClient, configProvider), pipelineWatcher, configProvider)
]);

startBot({
  token: Deno.env.get('DISCORD_BOT_TOKEN') || '',
  intents: ['Guilds', 'GuildMessages', 'GuildMessageReactions'],
  eventHandlers: {
    ready() {
      console.log('Successfully connected to gateway');
    },
    reactionAdd(message) {
      pipelineApprovalWatcher.approve(BigInt(message.messageId), message.emoji.name || '');
    },
    async messageCreate(message) {
      const messageCommands = messageParser.parse(message) || [];

      for (const command of messageCommands) {
        const createMessage = await command.execute(new DiscordMessage(message));
        sendMessage(message.channelId, createMessage);
      }
    },
  },
});
