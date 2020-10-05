import { Command } from '../commands/command.ts';
import { EmptyCommand } from '../commands/emptyCommand.ts';
import { PullRequestCommand } from '../commands/pr.ts';
import { WorkStateCommand } from '../commands/workState.ts';
import { BroadcastCommand } from '../commands/broadcast.ts';

export class CommandFactory {
  create(name: string): Command {
    const commands: any  = {
      'pr': (): Command => new PullRequestCommand(),
      'work': (): Command => new WorkStateCommand(),
      'broadcast': (): Command => new BroadcastCommand()
    };
    const functionToCreateCommand = commands[name];

    return functionToCreateCommand
      ? functionToCreateCommand() as Command
      : new EmptyCommand();
  }
}
