import { assert } from 'https://deno.land/std@0.104.0/testing/asserts.ts';
import { AzureDevOpsFakeClient } from '../azureDevOpsFakeClient.ts';
import { CommandFactory } from '../../src/commands/commandFactory.ts';
import { Command } from '../../src/commands/command.ts';
import { EmptyCommand } from '../../src/commands/emptyCommand.ts';
import { PullRequestCommand } from '../../src/commands/pullRequestCommand.ts';

const factory = new CommandFactory(new AzureDevOpsFakeClient());

Deno.test('should create an empty factory for a unknown cli input', () => {
  const cliInput: string = 'random cli input';

  const newCommand: Command = factory.create(cliInput);

  assert(newCommand instanceof EmptyCommand);
});

Deno.test('should create an empty factory for a undefined cli input', () => {
  const cliInput: string = undefined as any;

  const newCommand: Command = factory.create(cliInput);

  assert(newCommand instanceof EmptyCommand);
});

Deno.test('should create command for pull requests', () => {
  const cliInput: string = 'pr';

  const newCommand: Command = factory.create(cliInput);

  assert(newCommand instanceof PullRequestCommand);
});

Deno.test('should remove empty spaces for a cli input', () => {
  const cliInput: string = '  pr    ';

  const newCommand: Command = factory.create(cliInput);

  assert(newCommand instanceof PullRequestCommand);
});
