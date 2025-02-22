import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProductListComponent} from '../products/product-list/product-list.component';
import {ThemeSelectorComponent} from '../theme-selector/theme-selector.component';
import {CartComponent} from '../cart/cart.component';
import {AnonUserCheckoutFormComponent} from '../forms/checkout/AnonUserCheckoutForm/anon-user-checkout-form.component';
import {NavigationBarComponent} from '../navigation/navigation-bar/navigation-bar.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, ThemeSelectorComponent, CartComponent,
    AnonUserCheckoutFormComponent, RouterOutlet, NavigationBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'PizzeriaAngularFE';
}
