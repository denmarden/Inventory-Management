import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUp, Pencil, Trash2 } from "lucide-react";
import { AddEditItemModal } from "./AddEditItemModal";
import { LiquorItem } from "@/types/inventory";

const INITIAL_ITEMS: LiquorItem[] = [
  {
    id: "1",
    name: "Scotch Whisky",
    category: "Whisky",
    unitValue: 750,
    unitMeasurement: "Milliliter",
    unitContainer: "Bottle",
    expiryDate: "2025-12-31",
    price: 45.99,
    currentStock: 24,
    supplier: "Premium Spirits Inc",
  },
  {
    id: "2",
    name: "Vodka Premium",
    category: "Vodka",
    unitValue: 1000,
    unitMeasurement: "Milliliter",
    unitContainer: "Bottle",
    expiryDate: "2026-06-30",
    price: 29.99,
    currentStock: 36,
    supplier: "Global Beverages Ltd",
  },
  {
    id: "3",
    name: "Gin London Dry",
    category: "Gin",
    unitValue: 700,
    unitMeasurement: "Milliliter",
    unitContainer: "Bottle",
    expiryDate: "2025-09-15",
    price: 34.99,
    currentStock: 18,
    supplier: "Craft Spirits Co",
  },
];

export default function LiquorInventory() {
  const [items, setItems] = useState<LiquorItem[]>(INITIAL_ITEMS);

  const handleSave = (newItem: Partial<LiquorItem>) => {
    if (newItem.id) {
      setItems(
        items.map((item) =>
          item.id === newItem.id ? { ...item, ...newItem } : item,
        ),
      );
    } else {
      setItems([
        ...items,
        {
          ...(newItem as LiquorItem),
          id: Date.now().toString(),
        },
      ]);
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleImport = () => {
    // TODO: Implement CSV/Google Sheets import
    console.log("Import functionality to be implemented");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Liquor Inventory Management</h2>
        <div className="flex gap-4">
          <Button onClick={handleImport} variant="outline">
            <FileUp className="w-4 h-4 mr-2" />
            Import
          </Button>
          <AddEditItemModal onSave={handleSave} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Container</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                {item.unitValue} {item.unitMeasurement}
              </TableCell>
              <TableCell>{item.unitContainer}</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
              <TableCell>{item.currentStock}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <AddEditItemModal onSave={handleSave} item={item} />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
