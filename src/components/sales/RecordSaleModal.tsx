import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SaleRecord {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  date: string;
}

interface Props {
  onSave: (sale: SaleRecord) => void;
  children: React.ReactNode;
}

const SAMPLE_PRODUCTS = [
  { id: "1", name: "Scotch Whisky", price: 45.99 },
  { id: "2", name: "Vodka Premium", price: 29.99 },
  { id: "3", name: "Gin London Dry", price: 34.99 },
];

export function RecordSaleModal({ onSave, children }: Props) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<SaleRecord>>({
    date: new Date().toISOString().split("T")[0],
  });

  const handleProductSelect = (productId: string) => {
    const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setFormData({
        ...formData,
        productId,
        productName: product.name,
        unitPrice: product.price,
        totalAmount: product.price * (formData.quantity || 0),
      });
    }
  };

  const handleQuantityChange = (quantity: number) => {
    setFormData((prev) => ({
      ...prev,
      quantity,
      totalAmount: (prev.unitPrice || 0) * quantity,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.productId && formData.quantity && formData.unitPrice) {
      onSave(formData as SaleRecord);
      setOpen(false);
      setFormData({ date: new Date().toISOString().split("T")[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Sale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Product</Label>
              <Select
                value={formData.productId}
                onValueChange={handleProductSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {SAMPLE_PRODUCTS.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - ${product.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity || ""}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            {formData.totalAmount !== undefined && (
              <div className="pt-2">
                <Label>Total Amount</Label>
                <p className="text-2xl font-bold">
                  ${formData.totalAmount.toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <Button type="submit" className="w-full">
            Record Sale
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
