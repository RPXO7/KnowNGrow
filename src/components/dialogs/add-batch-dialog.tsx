import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateBatchId } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Product, Batch } from "@/types";

interface AddBatchDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBatchAdd: (batch: Batch) => void;
}

export function AddBatchDialog({
  product,
  open,
  onOpenChange,
  onBatchAdd,
}: AddBatchDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    quantity: "",
    mfgDate: "",
    expDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // Get existing batch IDs to prevent duplicates
    const existingBatchIds = product.batches?.map(b => b.batchId) || [];
    
    const batch: Batch = {
      batchId: generateBatchId(existingBatchIds),
      productId: product.id,
      quantity: parseInt(formData.quantity) || 0,
      mfgDate: formData.mfgDate,
      expDate: formData.expDate,
    };

    onBatchAdd(batch);
    toast({
      title: "Batch Added",
      description: "New batch has been successfully added to the product",
    });
    onOpenChange(false);
    setFormData({
      quantity: "",
      mfgDate: "",
      expDate: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Add New Batch</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mfgDate">Manufacturing Date</Label>
            <Input
              id="mfgDate"
              type="date"
              value={formData.mfgDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expDate">Expiry Date</Label>
            <Input
              id="expDate"
              type="date"
              value={formData.expDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Batch</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}