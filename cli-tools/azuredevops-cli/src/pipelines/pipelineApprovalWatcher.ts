import { cron } from '../../deps.ts';
import { AzureDevOpsClient } from '../infra/azureDevOpsClient.ts';
import { ChatClient } from '../chatClient.ts';
import { PipelineApproval } from './pipelineApproval.ts';

export class PipelineApprovalWatcher {
  private _azureDevOpsClient: AzureDevOpsClient;
  private _chatClient: ChatClient;
  private _approvalsToWatch: Map<string, {
    channelId: string,
    pipelineApproval: PipelineApproval
  }> = new Map();

  constructor(azureDevOpsClient: AzureDevOpsClient, chatClient: ChatClient) {
    this._azureDevOpsClient = azureDevOpsClient;
    this._chatClient = chatClient;
  }

  add(messageId: string, channelId: string, pipelineApproval: PipelineApproval): void {
    this._approvalsToWatch.set(messageId, {
      channelId, pipelineApproval
    });
  }

  async approve(messageId: string, reaction: string): Promise<void> {
    if (this._approvalsToWatch.has(messageId)) {
      let message = '';
      const approvalDetails = this._approvalsToWatch.get(messageId) as any;

      if (reaction === '✅') {
        message = 'Pipeline aprovada';
        await this._azureDevOpsClient.approve(approvalDetails.pipelineApproval);
      }
      else if (reaction === '❌') {
        message = 'Pipeline rejeitada';
        await this._azureDevOpsClient.reject(approvalDetails.pipelineApproval);
      }
      else if (reaction === '🐸') {
        message = 'Pipeline ignorada';
      }

      if (message) {
        await this._chatClient.sendMessage(approvalDetails.channelId, message);

        // TODO: Sometimes there will be more than one message for a specific pipeline
        // notification and it needs to be deleted too.
        this._approvalsToWatch.delete(messageId);
      }
    }

    return Promise.resolve();
  }
}
