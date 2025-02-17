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
import { LiquorItem } from "@/types/inventory";

interface Props {
  onSave: (item: Partial<LiquorItem>) => void;
  item?: LiquorItem;
}

export function AddEditItemModal({ onSave, item }: Props) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<LiquorItem>>(
    item || {
      name: "",
      category: "",
      unitValue: 0,
      unitMeasurement: "Milliliter",
      unitContainer: "Bottle",
      expiryDate: "",
      price: 0,
      currentStock: 0,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{item ? "Edit Item" : "Register New Item"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Register New Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unitValue">Unit Value</Label>
              <Input
                id="unitValue"
                type="number"
                value={formData.unitValue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unitValue: Number(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Unit Measurement</Label>
              <Select
                value={formData.unitMeasurement}
                onValueChange={(value: "Milliliter" | "Liter") =>
                  setFormData({ ...formData, unitMeasurement: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Milliliter">Milliliter</SelectItem>
                  <SelectItem value="Liter">Liter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Container Type</Label>
              <Select
                value={formData.unitContainer}
                onValueChange={(value: "Bottle" | "Can" | "Box" | "Keg") =>
                  setFormData({ ...formData, unitContainer: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select container" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bottle">Bottle</SelectItem>
                  <SelectItem value="Can">Can</SelectItem>
                  <SelectItem value="Box">Box</SelectItem>
                  <SelectItem value="Keg">Keg</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currentStock">Current Stock</Label>
              <Input
                id="currentStock"
                type="number"
                value={formData.currentStock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentStock: Number(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Save Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
