import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Button} from 'primeng/button';

export type ProductDTO = {
  id: number;
  productType: string;
  image: string;
  name: string;
  description: string;
  price: number;
  format: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgOptimizedImage,
    Button
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product = input.required<ProductDTO>();

}
