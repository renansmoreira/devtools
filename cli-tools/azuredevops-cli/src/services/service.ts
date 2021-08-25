import { Command } from './command.ts';

export interface Service<T> {
  execute(command: Command): Promise<T>;
}
