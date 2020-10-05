import configuration from '../adapters/configuration.ts';
import { Command } from './command.ts';
import { RandomMessages } from '../adapters/randomMessages.ts';
import { SlackClient } from '../adapters/slackClient.ts';

export class WorkStateCommand implements Command {
  message: string = '';
  statusEmoji: string = '';
  statusMessage: string = '';
  statusExpiration: number = 0;
  channels: Array<string> = configuration.getChannels();

  addArguments(commandArguments: Array<string>): void {
    const state: string = commandArguments[0];
    [
      this.message,
      this.statusEmoji,
      this.statusMessage,
      this.statusExpiration
    ] = this.getWorkStateConfigs(state);
  }

  getWorkStateConfigs(state: string): Array<any> {
    const randomMessages = new RandomMessages();
    const messages: any = {
      start: [randomMessages.getStartMessage(), '', '', 0],
      lunch: [randomMessages.getLunchMessage(), ':meat_on_bone:', 'Almoçando', 0],
      end: [randomMessages.getEndMessage(), ':raised_hand_with_fingers_splayed:', 'Parei por hoje', 0],
      pause: [randomMessages.getPauseMessage(), ':double_vertical_bar:', 'Em pausa', 0],
      back: [randomMessages.getBackMessage(), '', '', 0]
    };

    return messages[state];
  }

  async execute(): Promise<Command> {
    const defaultWaitTime: number = 3;
    const slackClient: SlackClient = new SlackClient();

    return new Promise(async (resolve, reject) => {
      await slackClient.changeStatus(this.statusEmoji, this.statusMessage, this.statusExpiration);

      for (const channel of this.channels) {
        await slackClient.waitTime(defaultWaitTime);
        await slackClient.sendMessage(channel, this.message);
      }

      resolve(this);
    });
  }
}
