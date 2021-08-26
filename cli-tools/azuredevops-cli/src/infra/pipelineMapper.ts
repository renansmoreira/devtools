import { Build } from './build.ts';
import { Pipeline } from '../pipelines/pipeline.ts';

export class PipelineMapper {
  map(build: Build): Pipeline {
    const linkMap = new Map(Object.entries(build._links));
    const webHref = (linkMap.get('web') || { href: '' }).href;

    const pipeline = new Pipeline(build.id.toString(), build.definition.name, webHref);
    pipeline.status = build.status;
    pipeline.result = build.result;

    return pipeline;
  }
}
