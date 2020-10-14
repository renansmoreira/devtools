const { args } = Deno;
import configuration from './adapters/configuration.ts';
import { Command } from './commands/command.ts';
import { CommandFactory } from './commands/commandFactory.ts';

const [command, parameters] = args;
try {
  checkConfiguration(command)
    .then(selectCommand)
    .then(parseArguments)
    .then(executeInstruction)
    .catch((error: any) => console.error(error));
} catch (error) {
  console.error(error);
}

function checkConfiguration(commandText: string): Promise<string> {
  return new Promise((resolve) => {
    configuration.configure();
    resolve(commandText);
  });
}

function selectCommand(commandText: string): Promise<Command> {
  return new Promise((resolve, reject) => {
    const command = new CommandFactory().create(commandText);
    resolve(command);
  });
}

function parseArguments(command: Command): Promise<Command> {
  return new Promise((resolve, reject) => {
    command.addArguments(args.slice(1));
    resolve(command);
  });
}

function executeInstruction(command: Command): Promise<Command> {
  return command.execute();
}
