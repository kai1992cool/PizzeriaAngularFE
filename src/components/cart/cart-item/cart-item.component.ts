import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {CartService, OrderItemDTO} from '../../../services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  item = input.required<OrderItemDTO>();
  protected cartService: CartService = inject(CartService);

  public deleteItem(id: number) {
    this.cartService.deleteItem(id);
  }
}
