import * as path from 'https://deno.land/std@0.105.0/path/mod.ts';
import { ConfigProvider } from './configProvider.ts';

export class ConfigJsonProvider implements ConfigProvider {
  private _configs: any;

  constructor() {
    const configPath = path.join(path.fromFileUrl(import.meta.url), '..', '..', '..', 'config.json');
    const configData = Deno.readTextFileSync(configPath);
    this._configs = JSON.parse(configData);
  }

  getPipelineId(pipelineAlias: string): string {
    return this._configs.pipelines[pipelineAlias];
  }

  getPipelineAliases(): string[] {
    return Object.keys(this._configs.pipelines);
  }
}
