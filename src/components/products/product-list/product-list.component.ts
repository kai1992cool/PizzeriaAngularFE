import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ResourceService} from '../../../services/resources/resource.service';
import {ProductComponent} from '../product/product.component';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private resourceService = inject(ResourceService);
  protected products = toSignal(this.resourceService.getProducts("pizza"), {initialValue: []})
}
