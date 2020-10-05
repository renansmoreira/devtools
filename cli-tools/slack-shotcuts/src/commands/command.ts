export interface Command {
  addArguments(commandArguments: Array<string>): void;
  execute(): Promise<Command>;
}
