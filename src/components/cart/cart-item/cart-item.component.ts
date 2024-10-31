import {Component, inject, input} from '@angular/core';
import {CartService, OrderItemDTO} from '../../../services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  public item = input.required<OrderItemDTO>();
  private cartService: CartService = inject(CartService);

  decreaseItemQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  increaseItemQuantity(id: number) {
    this.cartService.increaseQuantity(id);
  }
}
