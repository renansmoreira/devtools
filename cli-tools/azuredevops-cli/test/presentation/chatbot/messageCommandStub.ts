import { MessageCommand } from '../../../src/presentation/chatbot/messagecommands/messageCommand.ts';

export class MessageCommandStub implements MessageCommand {
  constructor(
    private _canBeApplied: boolean = false) {
  }

  parse(messageCommand: string): boolean {
    return this._canBeApplied;
  }

  execute(): Promise<any> {
    return Promise.resolve('');
  }
}
