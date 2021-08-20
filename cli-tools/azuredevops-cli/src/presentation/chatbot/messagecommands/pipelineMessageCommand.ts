import { CreateMessage } from 'https://deno.land/x/discordeno/mod.ts';
import { MessageCommand } from './messageCommand.ts';
import { DiscordMessage } from '../discordMessage.ts';
import { Command } from '../../../services/command.ts';
import { Service } from '../../../services/service.ts';
import { ExecutePipelineService } from '../../../services/executePipelineService.ts';
import { ExecutedPipeline } from '../../../pipelines/executedPipeline.ts';
import { ConfigProvider } from '../../../configs/configProvider.ts';

export class PipelineMessageCommand implements MessageCommand {
  private _pipelineName: string = '';
  private _branchName: string = '';
  private _executePipelineService: Service<ExecutedPipeline>;
  private _configProvider: ConfigProvider;

  constructor(executePipelineService: Service<ExecutedPipeline>, configProvider: ConfigProvider) {
    this._executePipelineService = executePipelineService;
    this._configProvider = configProvider;
  }

  parse(messageContent: string): boolean {
    const splittedMessage = messageContent.split(' ');

    this._pipelineName = this._configProvider.getPipelineAliases()
      .find((name: string) => splittedMessage.indexOf(name) > -1) || '';
    this._branchName = splittedMessage[splittedMessage.length - 1];

    return splittedMessage.indexOf('pipeline') > -1
      && this._pipelineName !== undefined && this._branchName !== undefined
  }

  async execute(discordMessage: DiscordMessage): Promise<CreateMessage> {
    const command = new Command([ this._pipelineName, this._branchName ]);
    const executedPipeline = await this._executePipelineService.execute(command);

    return discordMessage
      .createSimpleMessage(`Running pipeline ${executedPipeline.name} @ ${executedPipeline.href}`);
  }
}
