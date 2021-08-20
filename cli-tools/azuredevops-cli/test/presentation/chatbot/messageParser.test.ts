import { assertEquals, assertStrictEquals } from 'https://deno.land/std@0.104.0/testing/asserts.ts';
import { MessageCommandStub } from './messageCommandStub.ts';
import { MessageParser } from '../../../src/presentation/chatbot/messageParser.ts';

const parser = new MessageParser();
const botPreffix = parser.botPreffix;

Deno.test('should check if the message contains the bot preffix for a command', () => {
  const message = `bot random text after`;
  const expectedResult = true;

  const result: boolean = parser.containsBotCommandPrefix(message);

  assertEquals(result, expectedResult);
});

Deno.test('should check the bot preffix command in a message with blank spaces', () => {
  const messageWithBlankSpaces = `     bot`;
  const expectedResult = true;

  const result: boolean = parser.containsBotCommandPrefix(messageWithBlankSpaces);

  assertEquals(result, expectedResult);
});

Deno.test('should check the bot preffix command in a message ignoring case', () => {
  const messageWithRandomCases = 'BoT random message';
  const expectedResult = true;

  const result: boolean = parser.containsBotCommandPrefix(messageWithRandomCases);

  assertEquals(result, expectedResult);
});

Deno.test('should check for a missing bot preffix command in message', () => {
  const messageWithoutPreffix = 'Random message';
  const expectedResult = false;

  const result: boolean = parser.containsBotCommandPrefix(messageWithoutPreffix);

  assertEquals(result, expectedResult);
});

Deno.test('should check for a missing bot preffix in a empty message', () => {
  const emptyMessage = '';
  const expectedResult = false;

  const result: boolean = parser.containsBotCommandPrefix(emptyMessage);

  assertEquals(result, expectedResult);
});

Deno.test('should check for a missing bot preffix in a null message', () => {
  const nullMessage: any = null;
  const expectedResult = false;

  const result: boolean = parser.containsBotCommandPrefix(nullMessage);

  assertEquals(result, expectedResult);
});

Deno.test('should check for a missing bot preffix in a undefined message', () => {
  const undefinedMessage: any = undefined;
  const expectedResult = false;

  const result: boolean = parser.containsBotCommandPrefix(undefinedMessage);

  assertEquals(result, expectedResult);
});

Deno.test('should get only the message commands that are available for the given message command', () => {
  const messageCommand = { content: 'bot random' };
  const commandToExecute = new MessageCommandStub(true);
  const commandToSkip = new MessageCommandStub(false);
  const anotherCommandToExecute = new MessageCommandStub(true);
  const parser = new MessageParser('bot', [commandToExecute, commandToSkip, anotherCommandToExecute]);

  const commands = parser.parse(messageCommand);

  assertEquals(commands.length, 2);
  assertStrictEquals(commands[0], commandToExecute);
  assertStrictEquals(commands[1], anotherCommandToExecute);
});

Deno.test('should not get any command if the command message does not contain bot preffix message', () => {
  const messageCommand = { content: 'random' };
  const parser = new MessageParser('bot', [new MessageCommandStub(true)]);

  const commands = parser.parse(messageCommand);

  assertEquals(commands.length, 0);
});

Deno.test('should not get any command if the command message is undefined', () => {
  const parser = new MessageParser('bot', [new MessageCommandStub(true)]);

  const commands = parser.parse(undefined);

  assertEquals(commands.length, 0);
});

Deno.test('should not get any command if the command message is null', () => {
  const parser = new MessageParser('bot', [new MessageCommandStub(true)]);

  const commands = parser.parse(null);

  assertEquals(commands.length, 0);
});
