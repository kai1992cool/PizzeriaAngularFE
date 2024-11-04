import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent {

}
