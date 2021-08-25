import { Command } from './command.ts';
import { Service } from './service.ts';
import { ExecutedPipeline } from '../pipelines/executedPipeline.ts';
import { AzureDevOpsClient } from '../infra/azureDevOpsClient.ts'
import { ConfigProvider } from '../configs/configProvider.ts';

export class ExecutePipelineService implements Service<ExecutedPipeline> {
  private _azureDevOpsClient: AzureDevOpsClient;
  private _configProvider: ConfigProvider;

  constructor(
    azureDevOpsClient: AzureDevOpsClient,
    configProvider: ConfigProvider) {
    this._azureDevOpsClient = azureDevOpsClient;
    this._configProvider = configProvider;
  }

  async execute(command: Command): Promise<ExecutedPipeline> {
    const pipelineName = command.content[0] || '';
    const branchName = command.content[1] || 'master';
    const pipelineId: string = this._configProvider.getPipelineId(pipelineName);

    if (!pipelineId) {
      console.error(`No pipeline named "${pipelineName}" was found`);
      // TODO: Add some overload to this guy
      return new ExecutedPipeline(false, '', {});
    }

    return await this._azureDevOpsClient.runPipeline(pipelineId, branchName);
  }
}
