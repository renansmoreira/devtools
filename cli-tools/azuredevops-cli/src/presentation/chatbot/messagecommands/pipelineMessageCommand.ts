import { CreateMessage } from 'https://deno.land/x/discordeno/mod.ts';
import { MessageCommand } from './messageCommand.ts';
import { ChatMessage } from '../../../chats/chatMessage.ts';
import { TokenService } from '../../../core/auth/tokenService.ts';
import { Service } from '../../../services/service.ts';
import { ExecutePipelineCommand } from '../../../core/pipelines/executePipelineCommand.ts';
import { ExecutedPipeline } from '../../../pipelines/executedPipeline.ts';
import { PipelineWatcher } from '../../../pipelines/pipelineWatcher.ts';
import { ConfigProvider } from '../../../configs/configProvider.ts';

export class PipelineMessageCommand implements MessageCommand {
  private _pipelineName = '';
  private _branchName = '';
  private _tokenService: TokenService;
  private _executePipeline: Service<ExecutedPipeline>;
  private _pipelineWatcher: PipelineWatcher | undefined;
  private _configProvider: ConfigProvider;

  constructor(tokenService: TokenService, executePipeline: Service<ExecutedPipeline>,
    configProvider: ConfigProvider,
    // TODO: Remove this watcher and split responsabilities of watch from the operation
    pipelineWatcher?: PipelineWatcher) {
    this._tokenService = tokenService;
    this._executePipeline = executePipeline;
    this._configProvider = configProvider;
    this._pipelineWatcher = pipelineWatcher;
  }

  // TODO: Create a specific type for message parser
  parse(messageContent: string): boolean {
    const splittedMessage = messageContent.split(' ');

    this._pipelineName = this._configProvider.getPipelineAliases()
      .find((name: string) => splittedMessage.indexOf(name) > -1) || '';
    this._branchName = splittedMessage[splittedMessage.length - 1];

    return splittedMessage.indexOf('pipeline') > -1
      && this._pipelineName !== undefined && this._branchName !== undefined
  }

  async execute(chatMessage: ChatMessage): Promise<CreateMessage> {
    const userToken = this._tokenService.getFor(chatMessage.authorId);
    const command = new ExecutePipelineCommand(this._pipelineName, this._branchName, userToken);
    const executedPipeline = await this._executePipeline.execute(command);

    if (this._pipelineWatcher) {
      this._pipelineWatcher.add(executedPipeline.id.toString(), chatMessage.channelId.toString());
    }

    return {
      content: `Running pipeline ${executedPipeline.name} @ ${executedPipeline.href}`
    };
  }
}
