
const configuration = {
  configure: configure,
  checkIfCanSendSlackMessages: () => getConfig('SEND_SLACK_MESSAGES') === 'true',
  getSlackApiToken: () => getConfig('SLACK_API_TOKEN'),
  getChannels: () => getConfig('SLACK_CHANNELS').split(' ')
};

function configure(): void {
  if (!getConfig('SLACK_API_TOKEN')) {
    console.warn('Slack API token not found');
  }

  if (!getConfig('SLACK_CHANNELS')) {
    console.warn('Slack channels are not configured, messages will not be sent');
    Deno.env.set('SEND_SLACK_MESSAGES', 'false');
  }

  if (!getConfig('SEND_SLACK_MESSAGES')) {
    console.warn('Messages are configured to just output in shell');
  }
}

function getConfig(name: string): string {
  return Deno.env.get(name) || '';
}

export default configuration;
