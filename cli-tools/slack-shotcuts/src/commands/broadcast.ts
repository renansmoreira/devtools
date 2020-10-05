import configuration from '../adapters/configuration.ts';
import { Command } from './command.ts';
import { SlackClient } from '../adapters/slackClient.ts';

export class BroadcastCommand implements Command {
  message: string = '';
  channels: Array<string> = configuration.getChannels();


  addArguments(commandArguments: Array<string>): void {
    [ this.message ] = commandArguments;
  }

  async execute(): Promise<Command> {
    return new Promise(async (resolve, reject) => {
      const slackClient = new SlackClient();

      for (const channel of this.channels) {
        await slackClient.sendMessage(channel, this.message);
        await slackClient.waitTime(3);
      }

      resolve(this);
    });
  }
}

