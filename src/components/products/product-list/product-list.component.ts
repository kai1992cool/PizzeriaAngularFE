import {Component, inject, OnInit} from '@angular/core';
import {ResourceService} from '../../../services/resources/resource.service';
import {ProductComponent, ProductDTO} from '../product/product.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    AsyncPipe,
    ProductComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private resourceService = inject(ResourceService);
  protected products$!: Observable<ProductDTO[]>;

  ngOnInit(): void {
    this.products$ = this.resourceService.getProducts("pizza");
  }
}
