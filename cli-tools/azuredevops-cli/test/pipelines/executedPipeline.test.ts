import { assert, assertEquals } from 'https://deno.land/std@0.104.0/testing/asserts.ts';
import { ExecutedPipeline } from '../../src/pipelines/executedPipeline.ts';

const executedPipelinePayloadSample = {
  _links: {
    web: {
      href: 'https://dev.azure.com/sampleorg/7882cc3a-1b60-4286-91e2-70cbdc0a818c/_build/results?buildId=12345'
    }
  },
  state: 'inProgress',
  id: 12345,
  name: '20210801.21'
};

Deno.test('should map if it was a success', () => {
  const mappedExecutedPipeline = new ExecutedPipeline(true, 'randomuri', executedPipelinePayloadSample);

  assert(mappedExecutedPipeline.success);
});

Deno.test('should map if it was not a success', () => {
  const mappedExecutedPipeline = new ExecutedPipeline(false, 'randomuri', executedPipelinePayloadSample);

  assert(!mappedExecutedPipeline.success);
});

Deno.test('should map an executed pipeline id', () => {
  const mappedExecutedPipeline = new ExecutedPipeline(true, 'randomuri', executedPipelinePayloadSample);

  assertEquals(mappedExecutedPipeline.id, executedPipelinePayloadSample.id);
});

Deno.test('should map an executed pipeline name', () => {
  const mappedExecutedPipeline = new ExecutedPipeline(true, 'randomuri', executedPipelinePayloadSample);

  assertEquals(mappedExecutedPipeline.name, executedPipelinePayloadSample.name);
});

Deno.test('should map an executed pipeline state', () => {
  const mappedExecutedPipeline = new ExecutedPipeline(true, 'randomuri', executedPipelinePayloadSample);

  assertEquals(mappedExecutedPipeline.state, executedPipelinePayloadSample.state);
});

Deno.test('should map an executed pipeline href', () => {
  const mappedExecutedPipeline = new ExecutedPipeline(true, 'randomuri', executedPipelinePayloadSample);

  assertEquals(mappedExecutedPipeline.href, executedPipelinePayloadSample._links.web.href);
});
