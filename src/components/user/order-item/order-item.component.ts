import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemComponent {

}
