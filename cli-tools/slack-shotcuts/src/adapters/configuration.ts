import { config } from "https://deno.land/x/dotenv/mod.ts";

const envVars = config();
const configuration = {
  isValid: isValid,
  getError: getError,
  checkIfCanSendSlackMessages: () => getConfig('SEND_SLACK_MESSAGES') === 'true',
  getSlackApiToken: () => getConfig('SLACK_API_TOKEN'),
  getChannels: () => getConfig('SLACK_CHANNELS').split(' ')
};

function isValid(): boolean {
  return configuration.getSlackApiToken() !== undefined
    || configuration.getChannels() !== undefined;
}

function getError(): (Error | null) {
  return new Error('Invalid configurations, check your env vars');
}

function getConfig(name: string): string {
  return envVars[name] || '';
}

export default configuration;
