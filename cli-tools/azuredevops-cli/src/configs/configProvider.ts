export interface ConfigProvider {
  get azureDevOpsInstance(): string;
  get azureDevOpsTeamProject(): string;
  get azureDevOpsUsername(): string;
  get azureDevOpsPersonalAccessToken(): string;
  get azureDevOpsDesiredRepositories(): string[];
  get discordBotToken(): string;
  get discordBotPreffix(): string;
  getPipelineId(pipelineAlias: string): string;
  getPipelineAliases(): string[];
}
