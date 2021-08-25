import { Service } from '../../src/services/service.ts';
import { Command } from '../../src/core/command.ts';

export class SpyService implements Service<any> {
  private _commandUsed?: Command;

  constructor(
    private _response: any = {}) {
  }
  
  execute(command: Command): Promise<any> {
    this._commandUsed = command;
    return Promise.resolve(this._response);
  }

  get commandUsed(): Command | undefined {
    return this._commandUsed;
  }
}
