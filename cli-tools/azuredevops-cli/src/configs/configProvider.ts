export interface ConfigProvider {
  getPipelineId(pipelineAlias: string): string;
  getPipelineAliases(): string[];
}
