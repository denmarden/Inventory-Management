import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { Upload, FileSpreadsheet, X } from "lucide-react";

interface ImportDataModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onImport?: (data: any[]) => void;
}

const ImportDataModal = ({
  open = true,
  onOpenChange,
  onImport,
}: ImportDataModalProps) => {
  const [importType, setImportType] = useState<"csv" | "google">("csv");
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({
    productName: "",
    unitMeasurement: "",
    expiryDate: "",
    currentStock: "",
  });

  // Mock preview data
  const mockPreviewData = [
    { col1: "Whiskey", col2: "Bottle", col3: "2024-12-31", col4: "50" },
    { col2: "Can", col1: "Beer", col4: "100", col3: "2024-06-30" },
    { col1: "Vodka", col2: "Bottle", col3: "2025-01-15", col4: "30" },
  ];

  const availableColumns = ["col1", "col2", "col3", "col4"];
  const requiredFields = [
    "Product Name",
    "Unit of Measurement",
    "Expiry Date",
    "Current Stock",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // In a real implementation, parse the file here
      setPreviewData(mockPreviewData);
    }
  };

  const handleImport = () => {
    // In a real implementation, process the data with the column mapping
    onImport?.(previewData);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <DialogTitle>Import Inventory Data</DialogTitle>
          <DialogDescription>
            Import your inventory data from a CSV file or Google Sheet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Import Type</Label>
            <Select
              value={importType}
              onValueChange={(value: "csv" | "google") => setImportType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select import type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV File</SelectItem>
                <SelectItem value="google">Google Sheet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {importType === "csv" && (
            <div className="space-y-4">
              <Label>Upload File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {!file ? (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      Drag and drop your CSV file here, or
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="ml-1 text-blue-600 hover:text-blue-500 cursor-pointer"
                      >
                        browse
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="h-6 w-6 text-gray-400" />
                      <span>{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {previewData.length > 0 && (
            <div className="space-y-4">
              <Label>Column Mapping</Label>
              <div className="grid grid-cols-2 gap-4">
                {requiredFields.map((field, index) => (
                  <div key={field} className="space-y-2">
                    <Label>{field}</Label>
                    <Select
                      value={columnMapping[Object.keys(columnMapping)[index]]}
                      onValueChange={(value) => {
                        setColumnMapping((prev) => ({
                          ...prev,
                          [Object.keys(columnMapping)[index]]: value,
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${field} column`} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableColumns.map((col) => (
                          <SelectItem key={col} value={col}>
                            {col}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Data Preview</Label>
                <ScrollArea className="h-[200px] border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {availableColumns.map((col) => (
                          <TableHead key={col}>{col}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, i) => (
                        <TableRow key={i}>
                          {availableColumns.map((col) => (
                            <TableCell key={col}>{row[col]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || Object.values(columnMapping).some((v) => !v)}
          >
            Import Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDataModal;
