import {Routes} from '@angular/router';
import {AnonUserCheckoutFormComponent} from '../forms/checkout/AnonUserCheckoutForm/anon-user-checkout-form.component';
import {ProductListComponent} from '../products/product-list/product-list.component';
import {MenuComponent} from '../menu/menu.component';
import {HomeComponent} from '../home/home.component';
import {RegisterComponent} from '../forms/register/register.component';
import {LoginComponent} from '../forms/login/login.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "menu",
    component: MenuComponent,
    title: "Menu",
    children: [
      {
        path: "pizzas",
        component: ProductListComponent,
        title: "Pizzas"
      }
    ]
  },
  {
    path: "pedido-nuevo",
    component: AnonUserCheckoutFormComponent,
    title: "Pedido Nuevo",
  },
  {
    path: "registracion-usuario",
    component: RegisterComponent,
    title: "Crear cuenta"
  },
  {
    path: "iniciar-sesion",
    component: LoginComponent,
    title: "Iniciar sesión"
  }
];
