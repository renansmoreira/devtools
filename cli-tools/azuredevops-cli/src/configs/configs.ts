export type AzureDevOpsConfig = {
  instance: string;
  teamProject: string;
  username: string;
  cliUserPat: string;
  pats: { [key: string]: string };
  desiredRepositories: string[];
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
