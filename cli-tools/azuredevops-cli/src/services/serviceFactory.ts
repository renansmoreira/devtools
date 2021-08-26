import { AzureDevOpsClient } from '../infra/azureDevOpsClient.ts';
import { AzureDevOpsHttpClient } from '../infra/azureDevOpsHttpClient.ts';
import { ConfigProvider } from '../configs/configProvider.ts';
import { ConfigJsonProvider } from '../configs/configJsonProvider.ts';
import { PipelineMapper } from '../infra/pipelineMapper.ts';
import { Service } from '../services/service.ts';
import { ServiceResponse } from '../services/serviceResponse.ts';
import { EmptyService } from '../services/emptyService.ts';
import { PullRequestService } from '../services/pullRequestService.ts';
import { ExecutedPipeline } from '../pipelines/executedPipeline.ts';
//import { ExecutePipeline } from '../core/pipelines/executePipeline.ts';

export class ServiceFactory {
  private availableServices: any;
  private emptyServiceFactory: any = () => new EmptyService(this._azureDevOpsClient);

  constructor(
    configProvider: ConfigProvider = new ConfigJsonProvider(),
    private _azureDevOpsClient: AzureDevOpsClient = new AzureDevOpsHttpClient(configProvider, new PipelineMapper())) {
    this.availableServices = {
      'pr': (): Service<ServiceResponse> => new PullRequestService(this._azureDevOpsClient)
      //'pipeline': (): Service<ExecutedPipeline> => new ExecutePipelineService(this._azureDevOpsClient, configProvider) 
    };
  }

  create(command: string): Service<any> {
    return (this.availableServices[(command || '').trim()] || this.emptyServiceFactory)();
  }
}
