import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AlertTriangle, TrendingUp, Package, Calendar } from "lucide-react";

interface MetricsOverviewProps {
  topSellingItems?: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  nearExpiryProducts?: Array<{
    name: string;
    expiryDate: string;
    daysUntilExpiry: number;
  }>;
  recentDeliveries?: Array<{
    name: string;
    quantity: number;
    date: string;
  }>;
}

const MetricsOverview = ({
  topSellingItems = [
    { name: "Johnnie Walker Black", quantity: 45, revenue: 4500 },
    { name: "Grey Goose Vodka", quantity: 38, revenue: 3800 },
    { name: "Hennessy VS", quantity: 32, revenue: 4800 },
    { name: "Don Julio 1942", quantity: 28, revenue: 8400 },
    { name: "Macallan 12", quantity: 25, revenue: 5000 },
  ],
  nearExpiryProducts = [
    { name: "Corona Extra", expiryDate: "2024-05-15", daysUntilExpiry: 15 },
    { name: "Heineken", expiryDate: "2024-05-20", daysUntilExpiry: 20 },
    { name: "Budweiser", expiryDate: "2024-05-25", daysUntilExpiry: 25 },
  ],
  recentDeliveries = [
    { name: "Jack Daniels", quantity: 24, date: "2024-04-01" },
    { name: "Absolut Vodka", quantity: 36, date: "2024-04-02" },
    { name: "Bacardi Rum", quantity: 48, date: "2024-04-03" },
  ],
}: MetricsOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 bg-white">
      {/* Top Selling Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Top Selling Items
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px]">
            <div className="space-y-4">
              {topSellingItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} units
                    </p>
                  </div>
                  <div className="text-sm font-medium">
                    ${item.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Near Expiry Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Near Expiry Products
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px]">
            <div className="space-y-4">
              {nearExpiryProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires: {product.expiryDate}
                    </p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant={
                            product.daysUntilExpiry <= 15
                              ? "destructive"
                              : "default"
                          }
                        >
                          {product.daysUntilExpiry} days
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Days until expiry</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recent Deliveries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Recent Deliveries
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px]">
            <div className="space-y-4">
              {recentDeliveries.map((delivery, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {delivery.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {delivery.quantity} units
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{delivery.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
