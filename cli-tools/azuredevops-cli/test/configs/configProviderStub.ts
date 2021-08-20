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
}
