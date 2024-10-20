import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProductListComponent} from '../products/product-list/product-list.component';
import {ThemeSelectorComponent} from '../theme-selector/theme-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, ThemeSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PizzeriaAngularFE';
}
