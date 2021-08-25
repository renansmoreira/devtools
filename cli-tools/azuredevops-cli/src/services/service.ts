import { Command } from '../core/command.ts';

export interface Service<T> {
  execute(command: Command): Promise<T>;
}
