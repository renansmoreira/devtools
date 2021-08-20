import * as ink from 'https://deno.land/x/ink/mod.ts';
import { ExecutedPipeline } from '../../pipelines/executedPipeline.ts';

export class ExecutedPipelinePrinter {
  print(executedPipeline: ExecutedPipeline): void {
    ink.terminal.log(`Running pipeline <yellow>${executedPipeline.name}</yellow> @ <blue>${executedPipeline.href}</blue>`);
  }
}
