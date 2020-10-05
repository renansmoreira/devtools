import configuration from './configuration.ts';

export class SlackClient {
  async sendMessage(channel: string, message: string): Promise<SlackClient> {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('token', configuration.getSlackApiToken());
      formData.append('channel', channel);
      formData.append('text', message);
      formData.append('as_user', 'true');

      await this.sendSlackRequest('https://slack.com/api/chat.postMessage', 'post', formData);
      resolve(this);
    });
  }

  async changeStatus(emoji: string, message: string, statusExpirationTime: number): Promise<SlackClient> {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('token', configuration.getSlackApiToken());
      formData.append('profile', JSON.stringify({
        'status_emoji': emoji,
        'status_expiration': statusExpirationTime.toString(),
        'status_text': message
      }));

      await this.sendSlackRequest('https://slack.com/api/users.profile.set', 'post', formData);
      resolve(this);
    });
  }

  waitTime(timeInSeconds: number): Promise<SlackClient> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this);
      }, timeInSeconds * 1000);
    });
  }

  private async sendSlackRequest(url: string, method: string, formData: FormData): Promise<Response> {
    try {
      if (configuration.checkIfCanSendSlackMessages())
        return await fetch(url, { method: method, body: formData });
      else {
        console.log(formData);
        return new Response();
      }
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
}

