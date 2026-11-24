/**
 * One line in the shopping cart: a product, its unit price and how many units.
 * The expected behaviour is defined by requirements CI-1 to CI-4 in the assignment brief.
 */
export class CartItem {
  readonly name: string;
  readonly unitPrice: number;
  readonly quantity: number;

  constructor(name: string, unitPrice: number, quantity: number = 0) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
  }

  /** Price of this line: unit price multiplied by quantity. */
  lineTotal(): number {
    return this.unitPrice * this.quantity;
  }

  /** Short text form, for example "Pen x 3". */
  toString(): string {
    return `${this.name} x ${this.quantity}`;
  }
}
