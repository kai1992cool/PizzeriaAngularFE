export type AddressFormData = {
  id: number | null;
  street: string
  streetNr: number;
  gate: string | null;
  staircase: string | null;
  door: string | null;
  floor: string | null;
}

export type OrderDetailsFormData = {
  id: number | null;
  deliveryChoice: string;
  paymentMethod: string;
  deliveryTime: string | null;
  changeRequestChoice: string | null;
  billToChange: number | null;
  comment: string | null;
}

export type OrderItemFormData = {
  id: number | null;
  productType: string | null;
  name: string | null;
  format: string | null;
  price: number | null;
  quantity: number | null;
}

type CartFormData = {
  id: number | null;
  totalQuantity: number;
  totalCost: number;
  totalCostOffers: number | null;
  orderItems: OrderItemFormData[];
}

export type AnonOrderFormData = {
  anonCustomerName: string;
  anonCustomerContactNumber: number;
  anonCustomerEmail: string;
  address: AddressFormData;
  orderDetails: OrderDetailsFormData;
  cart: CartFormData;
}

export type UserOrderFormData = {
  userId: number | null;
  addressId: number | null;
  orderDetails: OrderDetailsFormData;
  cart: CartFormData;
}

export type UpdatingUserOrderFormData = {
  orderId: number | null;
  userId: number | null;
  addressId: number | null;
  createdOn: string | null;
  orderDetails: OrderDetailsFormData;
  cart: CartFormData;
}
