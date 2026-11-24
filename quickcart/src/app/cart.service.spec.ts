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
});
