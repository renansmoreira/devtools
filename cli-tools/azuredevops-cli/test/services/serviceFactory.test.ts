import { assert } from 'https://deno.land/std@0.104.0/testing/asserts.ts';
import { AzureDevOpsClientStub } from '../azureDevOpsClientStub.ts';
import { ConfigProviderStub } from '../configs/configProviderStub.ts';
import { ServiceFactory } from '../../src/services/serviceFactory.ts';
import { Command } from '../../src/services/command.ts';
import { Service } from '../../src/services/service.ts';
import { EmptyService } from '../../src/services/emptyService.ts';
import { PullRequestService } from '../../src/services/pullRequestService.ts';

const configProviderStub = new ConfigProviderStub();
const factory = new ServiceFactory(configProviderStub, new AzureDevOpsClientStub());

Deno.test('should create an empty factory for a unknown cli input', () => {
  const cliInput: string = 'random cli input';

  const newCommand = factory.create(cliInput);

  assert(newCommand instanceof EmptyService);
});

Deno.test('should create an empty factory for a undefined cli input', () => {
  const cliInput: string = undefined as any;

  const newCommand = factory.create(cliInput);

  assert(newCommand instanceof EmptyService);
});

Deno.test('should create command for pull requests', () => {
  const cliInput: string = 'pr';

  const newCommand = factory.create(cliInput);

  assert(newCommand instanceof PullRequestService);
});

Deno.test('should remove empty spaces for a cli input', () => {
  const cliInput: string = '  pr    ';

  const newCommand = factory.create(cliInput);

  assert(newCommand instanceof PullRequestService);
});
