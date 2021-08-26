import { cron } from '../../deps.ts';
import { AzureDevOpsClient } from '../infra/azureDevOpsClient.ts';
import { ChatClient } from '../chatClient.ts';
import { PipelineApproval } from './pipelineApproval.ts';
import { PipelineApprovalWatcher } from './pipelineApprovalWatcher.ts';

export class PipelineWatcher {
  private _azureDevOpsClient: AzureDevOpsClient;
  private _pipelineApprovalWatcher: PipelineApprovalWatcher;
  private _chatClient: ChatClient;
  private _pipelinesToWatch: Map<string, string> = new Map();

  constructor(azureDevOpsClient: AzureDevOpsClient,
    pipelineApprovalWatcher: PipelineApprovalWatcher, chatClient: ChatClient) {
    this._azureDevOpsClient = azureDevOpsClient;
    this._pipelineApprovalWatcher = pipelineApprovalWatcher;
    this._chatClient = chatClient;
  }

  add(pipelineId: string, channelId: string): void {
    this._pipelinesToWatch.set(pipelineId, channelId);
  }

  startWatching(): void {
    cron('*/15 * * * * *', () => this.execute());
  }

  async execute(): Promise<void> {
    for (const pipelineId of this._pipelinesToWatch.keys()) {
      const pipeline = await this._azureDevOpsClient.getPipeline(pipelineId);

      if (pipeline.isInProgress) {
        const approvals = await this._azureDevOpsClient.getApprovals(pipeline.id);

        for (const approval of approvals
          .filter((approval: PipelineApproval) => approval.isPending)) {
          const message = `A pipe ${pipeline.name} (${pipeline.webHref}) está aguardando aprovação. Para responder, reaja com:\n- ✅ para aprovar;\n- ❌ para rejeitar;\n- ⚪️  para ignorar e largar lá.`;
          const channelId = this._pipelinesToWatch.get(pipelineId) || '';

          const messageId = await this._chatClient.sendMessage(channelId, message);
          this._pipelineApprovalWatcher.add(messageId, channelId, approval);
        }
      }
    }
  }
}
