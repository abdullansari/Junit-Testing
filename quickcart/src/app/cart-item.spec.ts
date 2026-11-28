import { CartItem } from './cart-item';

// Example test supplied with the project. Add your own tests for CartItem below it.
// Each test follows the same formula: setup, invoke, analyze.
describe('CartItem', () => {
  it('lineTotal multiplies the unit price by the quantity', () => {
    // setup
    const item = new CartItem('Pen', 2.5, 4);
    const expected = 10;

    // invoke
    const actual = item.lineTotal();

    // analyze
    expect(actual).toBe(expected);
  });

  it('TC-01 CI-1 constructor stores name, unit price and quantity', () => {
    // setup
    const name = 'Notebook';
    const unitPrice = 12.5;
    const quantity = 3;

    // invoke
    const item = new CartItem(name, unitPrice, quantity);

    // analyze
    expect(item.name).toBe(name);
    expect(item.unitPrice).toBe(unitPrice);
    expect(item.quantity).toBe(quantity);
  });

  it('TC-02 CI-2 quantity is 1 when it is omitted', () => {
    // setup
    const expected = 1;

    // invoke
    const item = new CartItem('Pen', 2);

    // analyze
    expect(item.quantity).toBe(expected);
  });

  it('TC-03 CI-3 lineTotal of a single unit equals the unit price', () => {
    // setup
    const item = new CartItem('Notebook', 20, 1);
    const expected = 20;

    // invoke
    const actual = item.lineTotal();

    // analyze
    expect(actual).toBe(expected);
  });

  it('TC-04 CI-3 lineTotal of an item built without a quantity equals the unit price', () => {
    // setup
    const item = new CartItem('Notebook', 20);
    const expected = 20;

    // invoke
    const actual = item.lineTotal();

    // analyze
    expect(actual).toBe(expected);
  });

  it('TC-05 CI-4 toString returns the name, " x ", then the quantity', () => {
    // setup
    const item = new CartItem('Pen', 2, 3);
    const expected = 'Pen x 3';

    // invoke
    const actual = item.toString();

    // analyze
    expect(actual).toBe(expected);
  });

  it('TC-06 CI-4 toString of an item built without a quantity shows quantity 1', () => {
    // setup
    const item = new CartItem('Pen', 2);
    const expected = 'Pen x 1';

    // invoke
    const actual = item.toString();

    // analyze
    expect(actual).toBe(expected);
  });
});
