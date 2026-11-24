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
});
