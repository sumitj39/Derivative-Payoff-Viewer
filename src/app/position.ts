export class Position {
  positionType: string;
  optionKind: string;
  direction: string;
  strikePrice: number;
  premium: number;
  constructor(
  positionType: string,
  optionKind: string,
  direction: string,
  strikePrice: number,
  premium: number) {
    this.positionType = positionType;
    this.optionKind = optionKind;
    this.direction = direction;
    this.strikePrice = strikePrice;
    this.premium = premium;
  }
}