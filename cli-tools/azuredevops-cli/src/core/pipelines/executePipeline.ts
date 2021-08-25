import { Command } from '../command.ts';
import { ExecutePipelineCommand } from './executePipelineCommand.ts';
import { Service } from '../../services/service.ts';
import { ExecutedPipeline } from '../../pipelines/executedPipeline.ts';
import { AzureDevOpsClient } from '../../infra/azureDevOpsClient.ts'
import { ConfigProvider } from '../../configs/configProvider.ts';

export class ExecutePipeline implements Service<ExecutedPipeline> {
  private _azureDevOpsClient: AzureDevOpsClient;
  private _configProvider: ConfigProvider;

  constructor(
    azureDevOpsClient: AzureDevOpsClient,
    configProvider: ConfigProvider) {
    this._azureDevOpsClient = azureDevOpsClient;
    this._configProvider = configProvider;
  }

  async execute(command: ExecutePipelineCommand): Promise<ExecutedPipeline> {
    const pipelineId: string = this._configProvider.getPipelineId(command.pipelineName);

    if (!pipelineId) {
      console.error(`No pipeline named "${command.pipelineName}" was found`);
      // TODO: Add some overload to this guy
      return new ExecutedPipeline(false, '', {});
    }

    return await this._azureDevOpsClient.runPipeline(pipelineId, command.branchName);
  }
}
