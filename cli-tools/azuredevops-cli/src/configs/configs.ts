export type AzureDevOpsConfig = {
  instance: string;
  teamProject: string;
  username: string;
  pat: string;
  desiredRepositories: string;
};

export type DiscordConfig = {
  botToken: string;
  botPreffix: string;
};

export type Config = {
  azureDevOps: AzureDevOpsConfig;
  discord: DiscordConfig;
  pipelines: { [key: string]: string };
};
