import { Command } from './command.ts';
import { ServiceResponse } from './serviceResponse.ts';

export interface Service<T> {
  execute(command: Command): Promise<T>;
}
