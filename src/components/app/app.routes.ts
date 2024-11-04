import {Routes} from '@angular/router';
import {AnonUserCheckoutFormComponent} from '../forms/checkout/AnonUserCheckoutForm/anon-user-checkout-form.component';
import {ProductListComponent} from '../products/product-list/product-list.component';
import {MenuComponent} from '../menu/menu.component';
import {HomeComponent} from '../home/home.component';
import {RegisterComponent} from '../forms/register/register.component';
import {LoginComponent} from '../forms/login/login.component';
import {ProfileComponent} from '../user/profile/profile.component';
import {OrderListComponent} from '../user/order-list/order-list.component';
import {OrderItemComponent} from '../user/order-item/order-item.component';
import {SettingsComponent} from '../user/settings/settings.component';
import {userCredentialsGuard} from '../user/guard/user-credentials-guard';
import {NotFoundComponent} from '../wildcard-routes/not-found/not-found.component';
import {ForibiddenComponent} from '../wildcard-routes/forbidden/foribidden.component';

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
    path: "perfil",
    component: ProfileComponent,
    title: "Tu Perfil",
    canMatch: [userCredentialsGuard],
    children: [
      {
        path: "pedidos",
        component: OrderListComponent,
        title: "Tus pedidos",
        children: [
          {
            path: "pedidos/:id",
            component: OrderItemComponent,
            title: "Pedido"
          }
        ]
      },
      {
        path: "configuration",
        component: SettingsComponent,
        title: "Configuracion",
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
    title: "Crea tu cuenta"
  },
  {
    path: "iniciar-sesion",
    component: LoginComponent,
    title: "Inicia sesión"
  },
  {
    path: "acceso-denegado",
    component: ForibiddenComponent,
    title: "Acceso denegado",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Nos hemos perdido"
  }
];
