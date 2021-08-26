import { assert, assertEquals } from 'https://deno.land/std@0.104.0/testing/asserts.ts';
import { TokenService } from '../../../src/core/auth/tokenService.ts';
import { SpyService } from '../../services/spyService.ts';
import { ConfigProviderStub } from '../../configs/configProviderStub.ts';
import { PipelineMessageCommand } from '../../../src/presentation/chatbot/messagecommands/pipelineMessageCommand.ts';
import { ExecutePipelineCommand } from '../../../src/core/pipelines/executePipelineCommand.ts';
import { ChatMessage } from '../../../src/chats/chatMessage.ts';

class TokenServiceStub extends TokenService {
}

const spyService = new SpyService({
  name: 'random name',
  href: 'random href'
});
const configProviderStub = new ConfigProviderStub({
  pipelineId: '',
  pipelineAliases: [ 'pipename', 'anotherpipename' ]
});
const command = new PipelineMessageCommand(new TokenServiceStub(), spyService, configProviderStub);

Deno.test('should check if can be applied', () => {
  const fullChatMessage = 'pipeline pipename dev';

  const canBeApplied = command.parse(fullChatMessage);

  assert(canBeApplied);
});

Deno.test('should check if cannot be applied', () => {
  const fullChatMessage = 'anothercommand pipename dev';

  const canBeApplied = command.parse(fullChatMessage);

  assert(!canBeApplied);
});

Deno.test('should parse a message with random texts between keywords and still check if can be applied', () => {
  const fullChatMessageWithRandomTexts = 'random random pipeline random anotherpipename random random random my-branch-name';

  const canBeApplied = command.parse(fullChatMessageWithRandomTexts);

  assert(canBeApplied);
});

Deno.test('should execute returning a simple response message with the execution content', async () => {
  const discordMessage = new ChatMessage('', '', '');
  const expectedMessage = 'Running pipeline random name @ random href';
  command.parse('pipeline anotherpipename branch-name');

  const responseMessage = await command.execute(discordMessage);

  assertEquals(responseMessage.content, expectedMessage);
});

Deno.test('should execute using the correct pipeline service command', async () => {
  const discordMessage = new ChatMessage('', '', '');
  const expectedCommandContent = [ 'anotherpipename', 'branch-name' ];
  command.parse('pipeline anotherpipename branch-name');

  await command.execute(discordMessage);

  const commandUsed: ExecutePipelineCommand = spyService.commandUsed as ExecutePipelineCommand;
  assertEquals(commandUsed.pipelineName, 'anotherpipename');
  assertEquals(commandUsed.branchName, 'branch-name');
});

Deno.test('should execute using the correct pipeline service command with another params', async () => {
  const discordMessage = new ChatMessage('', '', '');
  command.parse('pipeline pipename another-branch-name');

  await command.execute(discordMessage);

  const commandUsed: ExecutePipelineCommand = spyService.commandUsed as ExecutePipelineCommand;
  assertEquals(commandUsed.pipelineName, 'pipename');
  assertEquals(commandUsed.branchName, 'another-branch-name');
});
