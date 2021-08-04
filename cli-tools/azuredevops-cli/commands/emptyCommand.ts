import { Command } from './command.ts';
import { AzureDevOpsClient } from '../azureDevOpsClient.ts'

export class EmptyCommand implements Command {
  constructor(azureDevOpsClient: AzureDevOpsClient) {
  }

  execute(): Promise<void> {
    console.log('Invalid command');
    return Promise.resolve();
  }
}
