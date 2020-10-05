import { Command } from './command.ts';

export class EmptyCommand implements Command {
  addArguments(commandArguments: Array<string>): void {
  }

  execute(): Promise<Command> {
    return new Promise((resolve) => {
      console.warn('Command not found, runinng an empty command...');
      resolve();
    });
  }
}
