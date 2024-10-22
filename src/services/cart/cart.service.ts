import {Injectable, signal} from '@angular/core';

export type OrderItemDTO = {
  id: number;
  productType: string;
  name: string;
  format: string;
  price: number;
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = signal<OrderItemDTO[]>([]);
  allItems = this.items.asReadonly();

  public addItem(item:OrderItemDTO) {
    console.log(item.id)
    const items = this.items();
    const itemIndex = items.findIndex(existingItem => existingItem.id === item.id);
    if (itemIndex !== -1) {
      items[itemIndex].quantity++;
      this.items.update(prevItems => [...prevItems]);
    } else {
      this.items.update(prevItems => [...prevItems, item]);
    }
    console.log(this.items())
  }

  public deleteItem(id:number) {
    const items = this.items();
    const itemIndex = items.findIndex(existingItem => existingItem.id === id);
    const theItem = items[itemIndex];
    if (theItem.quantity === 1) {
      const cartItemsMinusTheItem = items.filter((item) => item.id !== theItem.id);
      this.items.set(cartItemsMinusTheItem);
    } else {
        items[itemIndex].quantity--;
        this.items.update(prevItems => [...prevItems]);
    }
    console.log(this.items())
  }
}
