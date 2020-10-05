import { RandomNumber } from './randomNumber.ts';

export class RandomMessages {
  startMessages: Array<string> = [
    'Bom dia!',
    'Dia!',
    'Boooom diia! :charmander_dancing:'
  ];

  getStartMessage(): string {
    return this.startMessages[new RandomNumber(0, 2).getValue()];
  }

  getLunchMessage(): string {
    return 'Almoçando';
  }

  getEndMessage(): string {
    return 'Encerrando, até!';
  }

  getPauseMessage(): string {
    return 'Pausa, já volto.';
  }

  getBackMessage(): string {
    return 'Voltei';
  }
}
