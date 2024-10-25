import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ResourceService} from '../../../services/resources/resource.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {RouterOutlet} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductItemComponent,
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private resourceService = inject(ResourceService);
  protected products$ = this.resourceService.getProducts("pizza");
}
