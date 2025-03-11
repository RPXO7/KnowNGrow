export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Batch {
  batchId: string;
  productId: string;
  quantity: number;
  mfgDate: string;
  expDate: string;
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  vendorName: string;
  sku: string;
  quantity: number;
  image?: string;
  batches?: Batch[];
}

export interface OrderItem {
  productId: string;
  batchId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderId: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}