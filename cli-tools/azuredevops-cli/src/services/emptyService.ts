import { Service } from './service.ts';
import { Command } from './command.ts';
import { ServiceResponse } from './serviceResponse.ts';
import { AzureDevOpsClient } from '../infra/azureDevOpsClient.ts'

export class EmptyService implements Service<ServiceResponse> {
  constructor(azureDevOpsClient: AzureDevOpsClient) {
  }

  execute(command: Command): Promise<ServiceResponse> {
    console.log('Invalid command');
    return Promise.resolve(new ServiceResponse('Invalid command'));
  }
}
