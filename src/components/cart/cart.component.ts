import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CartService} from '../../services/cart/cart.service';
import {CartItemComponent} from './cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartItemComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  private cartService: CartService = inject(CartService);
  protected items = this.cartService.allItems;
}
