import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartItem } from './cart-item';
import { CartService } from './cart.service';

@Component({
  imports: [DecimalPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly cart = inject(CartService);
  protected readonly error = signal('');

  protected onAdd(name: string, price: string, quantity: string): void {
    this.error.set('');
    try {
      this.cart.addItem(new CartItem(name.trim(), Number(price), Number(quantity)));
    } catch (e) {
      this.error.set((e as Error).message);
    }
  }

  protected onRemove(name: string): void {
    this.cart.removeItem(name);
  }

  protected onClear(): void {
    this.cart.clear();
    this.error.set('');
  }
}
