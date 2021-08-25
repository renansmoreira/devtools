import * as path from '../../deps.ts';
import { ConfigProvider } from './configProvider.ts';
import { Config } from './configs.ts';

export class ConfigJsonProvider implements ConfigProvider {
  private _configs: Config;

  constructor() {
    // TODO: Add fallback to another default config.json if necessary
    const configPath = path.join(path.fromFileUrl(import.meta.url),
      '..', '..', '..', 'config.json');
    const configData = Deno.readTextFileSync(configPath);
    this._configs = JSON.parse(configData);
  }

  get azureDevOpsInstance(): string {
    return this._configs.azureDevOps.instance;
  }

  get azureDevOpsTeamProject(): string {
    return this._configs.azureDevOps.teamProject;
  }

  get azureDevOpsUsername(): string {
    return this._configs.azureDevOps.username;
  }

  get azureDevOpsPersonalAccessToken(): string {
    return this._configs.azureDevOps.pat;
  }

  get discordBotToken(): string {
    return this._configs.discord.botToken;
  }

  get discordBotPreffix(): string {
    return this._configs.discord.botPreffix;
  }

  getPipelineId(pipelineAlias: string): string {
    return this._configs.pipelines[pipelineAlias];
  }

  getPipelineAliases(): string[] {
    return Object.keys(this._configs.pipelines);
  }
}
