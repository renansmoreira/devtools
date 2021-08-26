import { startBot, sendMessage } from 'https://deno.land/x/discordeno/mod.ts';
import { PipelineMapper } from '../../infra/pipelineMapper.ts';
import { AzureDevOpsHttpClient } from '../../infra/azureDevOpsHttpClient.ts';
import { ConfigJsonProvider } from '../../configs/configJsonProvider.ts';
import { ChatMessage } from '../../../src/chats/chatMessage.ts';
import { DiscordChatClient } from '../../infra/discordChatClient.ts';
import { PipelineWatcher } from '../../pipelines/pipelineWatcher.ts';
import { PipelineApprovalWatcher } from '../../pipelines/pipelineApprovalWatcher.ts';
import { TokenService } from '../../core/auth/tokenService.ts';
import { ExecutePipeline } from '../../core/pipelines/executePipeline.ts';
import { MessageParser } from './messageParser.ts';
import { MessageCommand } from './messagecommands/messageCommand.ts';
import { PipelineMessageCommand } from './messagecommands/pipelineMessageCommand.ts';

/*
 * Ideas:
 * - Add a configurable http request service, so it can trigger with
 *  a desired endpoint, method and message trigger;
 *  */

const pipelineMapper = new PipelineMapper();
const configProvider = new ConfigJsonProvider();
const azureDevOpsClient = new AzureDevOpsHttpClient(configProvider, pipelineMapper);
const discordChatClient = new DiscordChatClient();

const pipelineApprovalWatcher = new PipelineApprovalWatcher(azureDevOpsClient, discordChatClient);
const pipelineWatcher = new PipelineWatcher(azureDevOpsClient, pipelineApprovalWatcher, discordChatClient);
pipelineWatcher.startWatching();

const messageParser = new MessageParser(configProvider.discordBotPreffix, [
  new PipelineMessageCommand(new TokenService(configProvider), new ExecutePipeline(
    azureDevOpsClient, configProvider), configProvider, pipelineWatcher)
]);

startBot({
  token: configProvider.discordBotToken,
  intents: ['Guilds', 'GuildMessages', 'GuildMessageReactions'],
  eventHandlers: {
    ready() {
      console.log('Successfully connected to gateway');
    },
    reactionAdd(message) {
      pipelineApprovalWatcher.approve(message.messageId.toString(), message.emoji.name || '');
    },
    async messageCreate(message) {
      const messageCommands = messageParser.parse(message) || [];

      for (const command of messageCommands) {
        const chatMessage = new ChatMessage(message.id.toString(),
          message.channelId.toString(), message.authorId.toString());
        const createMessage = await command.execute(chatMessage);

        sendMessage(message.channelId, createMessage);
      }
    },
  },
});
