import {Routes} from '@angular/router';
import {AnonUserCheckoutFormComponent} from '../forms/checkout/AnonUserCheckoutForm/anon-user-checkout-form.component';
import {ProductListComponent} from '../products/product-list/product-list.component';
import {MenuComponent} from '../menu/menu.component';
import {HomeComponent} from '../home/home.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "menu",
    component: MenuComponent,
    children: [
      {
        path: "pizzas",
        component: ProductListComponent,
      }
    ]
  },
  {
    path: "pedido-nuevo",
    component: AnonUserCheckoutFormComponent,
    title: "Pedido Nuevo",
  }
];
