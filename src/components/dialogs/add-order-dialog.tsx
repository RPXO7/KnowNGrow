import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { saveOrder, getProducts } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { generateOrderId } from "@/lib/utils";
import { getOrders } from "@/lib/storage";
import { Product, Batch } from "@/types";
import { useAddOrderMutation } from "@/store/features/orderSlice";
import { useGetProductsQuery } from "@/store/features/productSlice";

interface OrderItem {
  productId: string;
  batchId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddOrderDialog({ open, onOpenChange }: AddOrderDialogProps) {
  const { toast } = useToast();
  const [addOrder] = useAddOrderMutation();
  const { data: products = [], isLoading } = useGetProductsQuery();

  const [orderImage, setOrderImage] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  // const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      productId: "",
      batchId: "",
      productName: "",
      quantity: 0,
      pricePerUnit: 0,
      totalPrice: 0,
    },
  ]);

  // useEffect(() => {
  //   const loadProducts = () => {
  //     const loadedProducts = getProducts();
  //     setProducts(loadedProducts);
  //   };

  //   loadProducts();
  //   window.addEventListener('storage', loadProducts);

  //   return () => {
  //     window.removeEventListener('storage', loadProducts);
  //   };
  // }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrderImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      {
        productId: "",
        batchId: "",
        productName: "",
        quantity: 0,
        pricePerUnit: 0,
        totalPrice: 0,
      },
    ]);
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...orderItems];

    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      if (product) {
        newItems[index] = {
          ...newItems[index],
          productId: value as string,
          productName: product.name,
          batchId: product.batches?.[0]?.batchId || '',
        };
      }
    } else if (field === 'batchId') {
      newItems[index] = {
        ...newItems[index],
        batchId: value as string,
      };
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value,
        totalPrice: field === 'quantity' || field === 'pricePerUnit'
          ? (field === 'quantity' ? Number(value) : newItems[index].quantity) *
          (field === 'pricePerUnit' ? Number(value) : newItems[index].pricePerUnit)
          : newItems[index].totalPrice
      };
    }

    setOrderItems(newItems);
  };

  const handleSubmit = async () => {
    try {
      const existingOrders = getOrders();
      const existingOrderIds = existingOrders.map(o => o.id);

      const order = {
        id: generateOrderId(existingOrderIds),
        customerName: receiptName,
        date: orderDate,
        items: orderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.pricePerUnit
        })),
        total: orderItems.reduce((sum, item) => sum + item.totalPrice, 0),
        status: 'completed' as const
      };

      await addOrder(order).unwrap;
      toast({
        title: "Order Added",
        description: "Order has been successfully created",
      });
      onOpenChange(false);
      setOrderItems([{
        productId: "",
        batchId: "",
        productName: "",
        quantity: 0,
        pricePerUnit: 0,
        totalPrice: 0,
      }]);
      setReceiptName("");
      setOrderDate("");
      setOrderImage(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add Order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-start gap-6">
            <div className="w-[200px]">
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {orderImage ? (
                  <img src={orderImage} alt="Order Bill" className="w-full h-auto" />
                ) : (
                  <>
                    <Label htmlFor="orderImage" className="cursor-pointer">
                      Drag image here
                      <br />
                      or
                      <br />
                      Browse image
                      <br />
                      <span className="text-sm text-red-500">Add Image of Order Bill</span>
                    </Label>
                    <Input
                      id="orderImage"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="receiptName">Receipt Name</Label>
                <Input
                  id="receiptName"
                  value={receiptName}
                  onChange={(e) => setReceiptName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Input
                  id="orderDate"
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Add Products in bill</h3>
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index} className="grid grid-cols-6 gap-4">
                  <div>
                    <Label>Product</Label>
                    <Select
                      value={item.productId}
                      onValueChange={(value) => updateOrderItem(index, 'productId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Batch</Label>
                    <Select
                      value={item.batchId}
                      onValueChange={(value) => updateOrderItem(index, 'batchId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        {products
                          .find(p => p.id === item.productId)
                          ?.batches?.map((batch) => (
                            <SelectItem key={batch.batchId} value={batch.batchId}>
                              {batch.batchId}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Product Name</Label>
                    <Input value={item.productName} disabled />
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateOrderItem(index, 'quantity', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Price per Unit</Label>
                    <Input
                      type="number"
                      value={item.pricePerUnit}
                      onChange={(e) => updateOrderItem(index, 'pricePerUnit', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Total Price</Label>
                    <Input type="number" value={item.totalPrice} disabled />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addOrderItem}
              >
                <Plus className="h-4 w-4 mr-2" /> Add More
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Discard
            </Button>
            <Button onClick={handleSubmit}>Confirm Order</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}