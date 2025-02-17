import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Badge } from "../ui/badge";

interface Product {
  id: string;
  name: string;
  photoUrl: string;
  unitOfMeasurement: "Milliliter" | "Liter";
  expiryDate: string;
  currentStock: number;
}

interface MainStockTableProps {
  products?: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Premium Vodka",
    photoUrl: "https://images.unsplash.com/photo-1598669266459-aeb2a9dad152",
    unitOfMeasurement: "Milliliter",
    expiryDate: "2025-12-31",
    currentStock: 2500,
  },
  {
    id: "2",
    name: "Single Malt Whiskey",
    photoUrl: "https://images.unsplash.com/photo-1582819509237-d5b75f5e5d96",
    unitOfMeasurement: "Liter",
    expiryDate: "2026-06-30",
    currentStock: 150,
  },
  {
    id: "3",
    name: "Craft Gin",
    photoUrl: "https://images.unsplash.com/photo-1614963326505-c07b24c574b4",
    unitOfMeasurement: "Milliliter",
    expiryDate: "2025-09-15",
    currentStock: 1800,
  },
];

const MainStockTable: React.FC<MainStockTableProps> = ({
  products = defaultProducts,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Product Name
                {sortField === "name" && (
                  <span className="ml-2 inline-block">
                    {sortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </span>
                )}
              </TableHead>
              <TableHead>Photo</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("unitOfMeasurement")}
              >
                Unit of Measurement
                {sortField === "unitOfMeasurement" && (
                  <span className="ml-2 inline-block">
                    {sortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("expiryDate")}
              >
                Expiry Date
                {sortField === "expiryDate" && (
                  <span className="ml-2 inline-block">
                    {sortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("currentStock")}
              >
                Current Stock
                {sortField === "currentStock" && (
                  <span className="ml-2 inline-block">
                    {sortDirection === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </span>
                )}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.photoUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.unitOfMeasurement}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(product.expiryDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{product.currentStock}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MainStockTable;
