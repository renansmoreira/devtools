import { Command } from './command.ts';
import { SlackClient } from '../adapters/slackClient.ts';

export class PullRequestCommand implements Command {
  channel: string = '';
  message: string = '';

  addArguments(commandArguments: Array<string>): void {
    const [ channel, url ] = commandArguments;
    const channels: any = {
      cheff: 'bichodagoiaba-dev',
      nexxus: 'condores-dev',
      tech: 'techleaders'
    };

    this.channel = channels[channel];
    this.message = `@here tem PR! :caetanodog: -> ${url}`;
  }

  async execute(): Promise<Command> {
    return new Promise(async (resolve, reject) => {
      await new SlackClient().sendMessage(this.channel, this.message);
      resolve(this);
    });
  }
}
