import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Order } from '@/types';
import { AddOrderDialog } from '@/components/dialogs/add-order-dialog';
import { OrderDetailsDialog } from '@/components/dialogs/order-details-dialog';
import { useGetOrdersQuery } from '@/store/features/orderSlice';

export default function Orders() {
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const { data: orders = [], isLoading } = useGetOrdersQuery();

  const stats = {
    totalOrders: orders.length,
    totalQuantity: orders.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0),
    totalBill: orders.reduce((sum, order) => sum + order.total, 0),
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button 
          onClick={() => setIsAddOrderOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Quantity</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalQuantity}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Bill</h3>
          <p className="text-3xl font-bold mt-2">₹{stats.totalBill}/-</p>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-secondary">
                <tr>
                  <th className="px-6 py-3">Order Id</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Order Value</th>
                  <th className="px-6 py-3">Receipt Name</th>
                  <th className="px-6 py-3">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="border-b cursor-pointer hover:bg-secondary/50"
                    onClick={() => handleViewOrder(order)}
                  >
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">Multiple Products</td>
                    <td className="px-6 py-4">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </td>
                    <td className="px-6 py-4">₹{order.total}/-</td>
                    <td className="px-6 py-4">{order.customerName}</td>
                    <td className="px-6 py-4">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <AddOrderDialog 
        open={isAddOrderOpen} 
        onOpenChange={setIsAddOrderOpen} 
      />

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={isOrderDetailsOpen}
          onOpenChange={setIsOrderDetailsOpen}
        />
      )}
    </div>
  );
}