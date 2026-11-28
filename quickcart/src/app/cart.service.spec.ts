import { TestBed } from '@angular/core/testing';
import { CartItem } from './cart-item';
import { CartService } from './cart.service';

// Example test supplied with the project. Add your own tests for CartService below it.
describe('CartService', () => {
  let cart: CartService;

  // A new service is created before every test so that tests stay independent.
  beforeEach(() => {
    TestBed.configureTestingModule({});
    cart = TestBed.inject(CartService);
  });

  it('getSubtotal adds the line totals of all items', () => {
    // setup
    cart.addItem(new CartItem('Pen', 2.5, 4));
    cart.addItem(new CartItem('Notebook', 20, 2));

    // invoke
    const actual = cart.getSubtotal();

    // analyze
    expect(actual).toBe(50);
  });

  // CS-1 New cart 
  it('TC-07 CS-1 a new cart is empty and every amount is 0', () => {
    // setup: the cart created in beforeEach

    // invoke
    const items = cart.getItems();
    const count = cart.getItemCount();
    const subtotal = cart.getSubtotal();
    const discount = cart.getDiscount();
    const total = cart.getTotal();

    // analyze
    expect(items).toEqual([]);
    expect(count).toBe(0);
    expect(subtotal).toBe(0);
    expect(discount).toBe(0);
    expect(total).toBe(0);
  });

  // CS-2 addItem order
  it('TC-08 CS-2 addItem appends valid items in the order they were added', () => {
    // setup
    const pen = new CartItem('Pen', 2, 1);
    const notebook = new CartItem('Notebook', 20, 2);
    const eraser = new CartItem('Eraser', 1, 3);

    // invoke
    cart.addItem(pen);
    cart.addItem(notebook);
    cart.addItem(eraser);

    // analyze
    expect(cart.getItems()).toEqual([pen, notebook, eraser]);
  });

  // CS-3 quantity validation 
  it('TC-09 CS-3 addItem rejects quantity 0 (just below the lower limit)', () => {
    // setup
    const item = new CartItem('Pen', 2, 0);

    // invoke and analyze
    expect(() => cart.addItem(item)).toThrowError(CartService.QUANTITY_ERROR);
    expect(cart.getItems()).toEqual([]);
  });

  it('TC-10 CS-3 addItem rejects quantity 11 (just above the upper limit)', () => {
    // setup
    const item = new CartItem('Pen', 2, 11);

    // invoke and analyze
    expect(() => cart.addItem(item)).toThrowError(CartService.QUANTITY_ERROR);
    expect(cart.getItems()).toEqual([]);
  });

  it('TC-11 CS-3 addItem rejects quantity -1 and leaves an existing cart unchanged', () => {
    // setup
    const pen = new CartItem('Pen', 2, 1);
    cart.addItem(pen);
    const invalid = new CartItem('Notebook', 20, -1);

    // invoke and analyze
    expect(() => cart.addItem(invalid)).toThrowError(CartService.QUANTITY_ERROR);
    expect(cart.getItems()).toEqual([pen]);
  });

  it('TC-12 CS-3 addItem accepts quantity 1 (on the lower limit)', () => {
    // setup
    const item = new CartItem('Pen', 2, 1);

    // invoke
    cart.addItem(item);

    // analyze
    expect(cart.getItems()).toEqual([item]);
  });

  it('TC-13 CS-3 addItem accepts quantity 10 (on the upper limit)', () => {
    // setup
    const item = new CartItem('Pen', 2, 10);

    // invoke
    cart.addItem(item);

    // analyze
    expect(cart.getItems()).toEqual([item]);
  });

  // CS-4 unit price validation
  it('TC-14 CS-4 addItem rejects unit price 0 (on the limit)', () => {
    // setup
    const item = new CartItem('Pen', 0, 1);

    // invoke and analyze
    expect(() => cart.addItem(item)).toThrowError(CartService.PRICE_ERROR);
    expect(cart.getItems()).toEqual([]);
  });

  it('TC-15 CS-4 addItem rejects unit price -1 and leaves an existing cart unchanged', () => {
    // setup
    const pen = new CartItem('Pen', 2, 1);
    cart.addItem(pen);
    const invalid = new CartItem('Notebook', -1, 1);

    // invoke and analyze
    expect(() => cart.addItem(invalid)).toThrowError(CartService.PRICE_ERROR);
    expect(cart.getItems()).toEqual([pen]);
  });

  it('TC-16 CS-4 addItem accepts unit price 0.01 (just above the limit)', () => {
    // setup
    const item = new CartItem('Sticker', 0.01, 1);

    // invoke
    cart.addItem(item);

    // analyze
    expect(cart.getItems()).toEqual([item]);
  });

  //  CS-5 item count
  it('TC-17 CS-5 getItemCount returns the total units (4 pens and 2 notebooks give 6)', () => {
    // setup
    cart.addItem(new CartItem('Pen', 2, 4));
    cart.addItem(new CartItem('Notebook', 20, 2));

    // invoke
    const actual = cart.getItemCount();

    // analyze
    expect(actual).toBe(6);
  });

  //  CS-6 subtotal 
  it('TC-18 CS-6 getSubtotal sums the line totals of three items', () => {
    // setup
    cart.addItem(new CartItem('Pen', 1.5, 2)); // 3
    cart.addItem(new CartItem('Notebook', 10, 3)); // 30
    cart.addItem(new CartItem('Ruler', 7, 1)); // 7

    // invoke
    const actual = cart.getSubtotal();

    // analyze
    expect(actual).toBe(40);
  });

  //  CS-7 discount 
  it('TC-19 CS-7 getDiscount is 0 for subtotal 99.99 (just below the threshold)', () => {
    // setup
    cart.addItem(new CartItem('Bag', 99.99, 1));

    // invoke
    const actual = cart.getDiscount();

    // analyze
    expect(actual).toBe(0);
  });

  it('TC-20 CS-7 getDiscount is 10 for subtotal exactly 100 (on the threshold)', () => {
    // setup
    cart.addItem(new CartItem('Bag', 50, 2));

    // invoke
    const actual = cart.getDiscount();

    // analyze
    expect(actual).toBe(10);
  });

  it('TC-21 CS-7 getDiscount is 10.1 for subtotal 101 (just above the threshold)', () => {
    // setup
    cart.addItem(new CartItem('Bag', 101, 1));

    // invoke
    const actual = cart.getDiscount();

    // analyze
    expect(actual).toBeCloseTo(10.1, 2);
  });

  // CS-8 total 
  it('TC-22 CS-8 getTotal equals the subtotal when there is no discount', () => {
    // setup
    cart.addItem(new CartItem('Notebook', 20, 2));

    // invoke
    const actual = cart.getTotal();

    // analyze
    expect(actual).toBe(40);
  });

  it('TC-23 CS-8 getTotal subtracts the discount from the subtotal (200 gives 180)', () => {
    // setup
    cart.addItem(new CartItem('Shoes', 100, 2));

    // invoke
    const actual = cart.getTotal();

    // analyze
    expect(actual).toBe(180);
  });

  it('TC-24 CS-8 getTotal is 90 for subtotal exactly 100', () => {
    // setup
    cart.addItem(new CartItem('Bag', 50, 2));

    // invoke
    const actual = cart.getTotal();

    // analyze
    expect(actual).toBe(90);
  });

  // CS-9 removeItem 
  it('TC-25 CS-9 removeItem removes only the first item with that name and returns true', () => {
    // setup
    const firstPen = new CartItem('Pen', 2, 1);
    const notebook = new CartItem('Notebook', 20, 1);
    const secondPen = new CartItem('Pen', 2, 5);
    cart.addItem(firstPen);
    cart.addItem(notebook);
    cart.addItem(secondPen);

    // invoke
    const result = cart.removeItem('Pen');

    // analyze
    expect(result).toBe(true);
    expect(cart.getItems()).toEqual([notebook, secondPen]);
  });

  it('TC-26 CS-9 removeItem returns false for a missing name and leaves the cart unchanged', () => {
    // setup
    const pen = new CartItem('Pen', 2, 1);
    cart.addItem(pen);

    // invoke
    const result = cart.removeItem('Stapler');

    // analyze
    expect(result).toBe(false);
    expect(cart.getItems()).toEqual([pen]);
  });

  //  CS-10 clear
  it('TC-27 CS-10 clear removes all items from the cart', () => {
    // setup
    cart.addItem(new CartItem('Pen', 2, 3));
    cart.addItem(new CartItem('Notebook', 20, 1));

    // invoke
    cart.clear();

    // analyze
    expect(cart.getItems()).toEqual([]);
    expect(cart.getSubtotal()).toBe(0);
  });

  it('TC-28 CS-9 removeItem on an empty cart returns false', () => {
    // setup: the empty cart created in beforeEach

    // invoke
    const result = cart.removeItem('Pen');

    // analyze
    expect(result).toBe(false);
    expect(cart.getItems()).toEqual([]);
  });

  //  CS-3 failure path: amounts after a rejected item 
  it('TC-29 CS-3 a rejected quantity leaves the subtotal and total unchanged', () => {
    // setup
    cart.addItem(new CartItem('Pen', 2, 1));
    const invalid = new CartItem('Notebook', 20, 12);

    // invoke and analyze
    expect(() => cart.addItem(invalid)).toThrowError(CartService.QUANTITY_ERROR);
    expect(cart.getSubtotal()).toBe(2);
    expect(cart.getTotal()).toBe(2);
  });

  //  Combinations and state changes 
  it('TC-30 CS-7 getDiscount is 10 when two items together reach exactly 100', () => {
    // setup
    cart.addItem(new CartItem('Bag', 60, 1));
    cart.addItem(new CartItem('Book', 40, 1));

    // invoke
    const actual = cart.getDiscount();

    // analyze
    expect(actual).toBe(10);
  });

  it('TC-31 CS-5 getItemCount adds the units of the same product added twice', () => {
    // setup
    cart.addItem(new CartItem('Pen', 2, 3));
    cart.addItem(new CartItem('Pen', 2, 2));

    // invoke
    const actual = cart.getItemCount();

    // analyze
    expect(actual).toBe(5);
  });

  it('TC-32 CS-2 addItem keeps both entries when a name is added twice, in order', () => {
    // setup
    const firstPen = new CartItem('Pen', 2, 1);
    const secondPen = new CartItem('Pen', 2, 2);

    // invoke
    cart.addItem(firstPen);
    cart.addItem(secondPen);

    // analyze
    expect(cart.getItems()).toEqual([firstPen, secondPen]);
  });

  it('TC-33 CS-7 CS-9 the discount is recalculated after an item is removed', () => {
    // setup: subtotal 120 earns a discount
    cart.addItem(new CartItem('Shoes', 90, 1));
    cart.addItem(new CartItem('Socks', 30, 1));

    // invoke: subtotal drops to 90
    cart.removeItem('Socks');

    // analyze
    expect(cart.getSubtotal()).toBe(90);
    expect(cart.getDiscount()).toBe(0);
    expect(cart.getTotal()).toBe(90);
  });

  it('TC-34 CS-9 removing the only item empties the cart and every amount is 0', () => {
    // setup
    cart.addItem(new CartItem('Pen', 2, 3));

    // invoke
    const result = cart.removeItem('Pen');

    // analyze
    expect(result).toBe(true);
    expect(cart.getItems()).toEqual([]);
    expect(cart.getItemCount()).toBe(0);
    expect(cart.getSubtotal()).toBe(0);
    expect(cart.getDiscount()).toBe(0);
    expect(cart.getTotal()).toBe(0);
  });

  it('TC-35 CS-10 clear resets every amount to 0 and the cart can be used again', () => {
    // setup
    cart.addItem(new CartItem('Shoes', 100, 2));
    cart.addItem(new CartItem('Pen', 2, 3));
    const ruler = new CartItem('Ruler', 7, 1);

    // invoke
    cart.clear();
    const countAfterClear = cart.getItemCount();
    const subtotalAfterClear = cart.getSubtotal();
    const discountAfterClear = cart.getDiscount();
    const totalAfterClear = cart.getTotal();
    cart.addItem(ruler);

    // analyze
    expect(countAfterClear).toBe(0);
    expect(subtotalAfterClear).toBe(0);
    expect(discountAfterClear).toBe(0);
    expect(totalAfterClear).toBe(0);
    expect(cart.getItems()).toEqual([ruler]);
    expect(cart.getSubtotal()).toBe(7);
  });
});
