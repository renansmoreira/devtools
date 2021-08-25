import { DefinitionReference } from './definitionReference.ts';
import { ReferenceLink } from './referenceLink.ts';

export type Build = {
  id: number;
  status: string;
  result: string;
  definition: DefinitionReference;
  _links: Map<string, ReferenceLink>;
}
