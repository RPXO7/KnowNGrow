import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product, Batch } from "@/types";
import { AddBatchDialog } from "./add-batch-dialog";

interface ProductDetailsDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailsDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailsDialogProps) {
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [batches, setBatches] = useState<Batch[]>(product.batches || []);

  const handleAddBatch = (batch: Batch) => {
    const updatedBatches = [...batches, batch];
    setBatches(updatedBatches);
    // Update product quantity
    product.quantity += batch.quantity;
    product.batches = updatedBatches;
    // Here you would typically update the product in storage
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex items-start gap-6">
              <div className="w-[200px] h-[200px] bg-secondary rounded-lg flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/200"
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex-1">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Product Name</dt>
                    <dd className="text-lg font-semibold">{product.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                    <dd className="text-lg font-semibold">{product.productId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Vendor Name</dt>
                    <dd className="text-lg font-semibold">{product.vendorName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">SKU</dt>
                    <dd className="text-lg font-semibold">{product.sku}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Current Stock</dt>
                    <dd className="text-lg font-semibold">{product.quantity}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Batch Information</h3>
                <Button onClick={() => setIsAddBatchOpen(true)}>
                  Add New Batch
                </Button>
              </div>
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-4 py-2 text-left">Batch ID</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                      <th className="px-4 py-2 text-left">MFG Date</th>
                      <th className="px-4 py-2 text-left">EXP Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch, index) => (
                      <tr
                        key={`${batch.batchId}-${index}`}
                        className={index % 2 === 1 ? "bg-secondary/50" : ""}
                      >
                        <td className="px-4 py-2">{batch.batchId}</td>
                        <td className="px-4 py-2">{batch.quantity}</td>
                        <td className="px-4 py-2">{batch.mfgDate}</td>
                        <td className="px-4 py-2">{batch.expDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddBatchDialog
        product={product}
        open={isAddBatchOpen}
        onOpenChange={setIsAddBatchOpen}
        onBatchAdd={handleAddBatch}
      />
    </>
  );
}