export class RandomNumber {
  minNumber: number = 0;
  maxNumber: number = 0;

  constructor(minNumber: number, maxNumber: number) {
    this.minNumber = minNumber;
    this.maxNumber = maxNumber;
  }

  getValue(): number {
    const min = Math.ceil(this.minNumber);
    const max = Math.floor(this.maxNumber);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
