import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types";

interface OrderDetailsDialogProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Order ID</dt>
              <dd className="text-lg font-semibold">{order.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Receipt Name</dt>
              <dd className="text-lg font-semibold">{order.customerName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Order Date</dt>
              <dd className="text-lg font-semibold">{order.date}</dd>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="border rounded-lg">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-2 text-left">Product ID</th>
                    <th className="px-4 py-2 text-left">Batch No</th>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Price per Unit</th>
                    <th className="px-4 py-2 text-left">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className={index % 2 === 1 ? "bg-secondary/50" : ""}>
                      <td className="px-4 py-2">{item.productId}</td>
                      <td className="px-4 py-2">01</td>
                      <td className="px-4 py-2">Product A</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">₹{item.price}/-</td>
                      <td className="px-4 py-2">₹{item.price * item.quantity}/-</td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td colSpan={3} className="px-4 py-2 text-right">Total:</td>
                    <td className="px-4 py-2">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">₹{order.total}/-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Go Back
            </Button>
            <Button variant="destructive">Delete Order</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}