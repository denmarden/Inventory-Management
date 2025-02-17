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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecordSaleModal } from "./RecordSaleModal";
import { Download, Plus } from "lucide-react";
import { format } from "date-fns";

interface SaleRecord {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  date: string;
}

const INITIAL_SALES: SaleRecord[] = [
  {
    id: "1",
    productId: "1",
    productName: "Scotch Whisky",
    quantity: 3,
    unitPrice: 45.99,
    totalAmount: 137.97,
    date: "2024-04-10",
  },
  {
    id: "2",
    productId: "2",
    productName: "Vodka Premium",
    quantity: 5,
    unitPrice: 29.99,
    totalAmount: 149.95,
    date: "2024-04-10",
  },
];

export default function SalesManagement() {
  const [sales, setSales] = useState<SaleRecord[]>(INITIAL_SALES);

  const handleRecordSale = (saleData: Omit<SaleRecord, "id">) => {
    const newSale = {
      ...saleData,
      id: Date.now().toString(),
    };
    setSales([...sales, newSale]);
  };

  const getMonthlySummary = () => {
    const summary = sales.reduce(
      (acc, sale) => {
        return {
          totalSales: acc.totalSales + sale.totalAmount,
          totalUnits: acc.totalUnits + sale.quantity,
        };
      },
      { totalSales: 0, totalUnits: 0 },
    );

    return summary;
  };

  const monthlySummary = getMonthlySummary();

  const exportToCSV = () => {
    // Implementation for CSV export
    console.log("Exporting to CSV...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sales Management</h2>
        <div className="flex gap-4">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <RecordSaleModal onSave={handleRecordSale}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Record Sale
            </Button>
          </RecordSaleModal>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Total Sales
                </dt>
                <dd className="text-2xl font-bold">
                  ${monthlySummary.totalSales.toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Units Sold
                </dt>
                <dd className="text-2xl font-bold">
                  {monthlySummary.totalUnits}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>
                {format(new Date(sale.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>{sale.productName}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>${sale.unitPrice.toFixed(2)}</TableCell>
              <TableCell>${sale.totalAmount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
