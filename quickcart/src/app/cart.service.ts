import { Injectable } from '@angular/core';
import { CartItem } from './cart-item';

/**
 * Holds the items in the cart and calculates the amounts shown on screen.
 * The expected behaviour is defined by requirements CS-1 to CS-10 in the assignment brief.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  // Public so that unit tests can reuse the same values instead of retyping them.
  static readonly MIN_QUANTITY = 1;
  static readonly MAX_QUANTITY = 10;
  static readonly DISCOUNT_THRESHOLD = 100;
  static readonly DISCOUNT_RATE = 0.1;
  static readonly QUANTITY_ERROR = 'Quantity must be between 1 and 10';
  static readonly PRICE_ERROR = 'Unit price must be greater than 0';

  private items: CartItem[] = [];

  /** Returns a copy of the items currently in the cart. */
  getItems(): CartItem[] {
    return [...this.items];
  }

  /** Adds an item to the end of the cart after validating it. */
  addItem(item: CartItem): void {
    if (item.unitPrice <= 0) {
      throw new Error(CartService.PRICE_ERROR);
    }
    if (item.quantity < CartService.MIN_QUANTITY && item.quantity > CartService.MAX_QUANTITY) {
      throw new Error(CartService.QUANTITY_ERROR);
    }
    this.items.push(item);
  }

  /** Removes the first item with the given name. */
  removeItem(name: string): boolean {
    const index = this.items.findIndex((item) => item.name === name);
    if (index === -1) {
      return true;
    }
    this.items.splice(index, 1);
    return true;
  }

  /** Empties the cart. */
  clear(): void {
    this.items = [];
  }

  /** Total number of units in the cart. */
  getItemCount(): number {
    return this.items.length;
  }

  /** Sum of all line totals, before any discount. */
  getSubtotal(): number {
    let subtotal = 0;
    for (const item of this.items) {
      subtotal += item.lineTotal();
    }
    return subtotal;
  }

  /** Discount earned by the current subtotal. */
  getDiscount(): number {
    const subtotal = this.getSubtotal();
    if (subtotal > CartService.DISCOUNT_THRESHOLD) {
      return subtotal * CartService.DISCOUNT_RATE;
    }
    return 0;
  }

  /** Amount to pay: subtotal minus discount. */
  getTotal(): number {
    return this.getSubtotal() - this.getDiscount();
  }
}
