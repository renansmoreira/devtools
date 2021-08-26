import { ConfigProvider } from '../../src/configs/configProvider.ts';

export class ConfigProviderStub implements ConfigProvider {
  private _fakeConfigs: any;

  constructor(fakeConfigs: {
    pipelineId: string,
    pipelineAliases: string[]
  } = {
    pipelineId: '',
    pipelineAliases: []
  }) {
    this._fakeConfigs = fakeConfigs;
  }

  getPipelineId(pipelineAlias: string): string {
    return this._fakeConfigs.pipelineId;
  }

  getPipelineAliases(): string[] {
    return this._fakeConfigs.pipelineAliases;
  }

  get azureDevOpsInstance(): string {
    return '';
  }

  get azureDevOpsTeamProject(): string {
    return '';
  }

  get azureDevOpsUsername(): string {
    return '';
  }

  get azureDevOpsDesiredRepositories(): string[] {
    return [];
  }

  getUserPat(userId: string): string | undefined {
    return 'randompat';
  }

  get discordBotToken(): string {
    return '';
  }

  get discordBotPreffix(): string {
    return '';
  }
}
