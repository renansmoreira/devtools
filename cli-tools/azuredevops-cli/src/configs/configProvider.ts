export interface ConfigProvider {
  get azureDevOpsInstance(): string;
  get azureDevOpsTeamProject(): string;
  get azureDevOpsUsername(): string;
  get azureDevOpsDesiredRepositories(): string[];
  get discordBotToken(): string;
  get discordBotPreffix(): string;
  getUserPat(userId: string): string | undefined;
  getPipelineId(pipelineAlias: string): string;
  getPipelineAliases(): string[];
}
