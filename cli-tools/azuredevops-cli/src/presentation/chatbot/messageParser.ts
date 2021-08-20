import { MessageCommand } from './messagecommands/messageCommand.ts';
import { PipelineMessageCommand } from './messagecommands/pipelineMessageCommand.ts';

export class MessageParser {
  constructor(
    private _botPreffix: string = 'bot',
    private _messageCommands: any[] = []) {
  }

  containsBotCommandPrefix(messageContent: string): boolean {
    return (messageContent || '').trim().toLowerCase().startsWith(this._botPreffix);
  }

  parse(message: any): MessageCommand[] {
    if (!this.containsBotCommandPrefix((message || { content: '' }).content)) {
      return [];
    }

    return this._messageCommands
      .filter((command: any) => command.parse(message.content));
  }

  get botPreffix(): string {
    return this._botPreffix;
  }
}
