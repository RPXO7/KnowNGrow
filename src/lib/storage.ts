import { Product, Order } from '@/types';

const STORAGE_KEYS = {
  PRODUCTS: 'knowngrow_products',
  ORDERS: 'knowngrow_orders',
};

export function getProducts(): Product[] {
  const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return products ? JSON.parse(products) : [];
}

export function saveProduct(product: Product) {
  const products = getProducts();
  products.push(product);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

export function getOrders(): Order[] {
  const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return orders ? JSON.parse(orders) : [];
}

export function saveOrder(order: Order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

export function getInventoryStats() {
  const products = getProducts();
  const totalProducts = products.length;
  const highStock = products.filter(p => p.quantity > 50).length;
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= 20).length;
  const outOfStock = products.filter(p => p.quantity === 0).length;

  return { totalProducts, highStock, lowStock, outOfStock };
}

export function getOrderStats() {
  const orders = getOrders();
  const totalOrders = orders.length;
  const totalQuantity = orders.reduce((sum, order) => 
    sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
  const totalBill = orders.reduce((sum, order) => sum + order.total, 0);

  return { totalOrders, totalQuantity, totalBill };
}