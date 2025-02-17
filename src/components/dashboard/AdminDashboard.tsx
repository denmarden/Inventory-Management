import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Store,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import UserManagement from "../users/UserManagement";
import SalesManagement from "../sales/SalesManagement";
import MetricsOverview from "./MetricsOverview";
import MainStockTable from "../inventory/MainStockTable";
import ImportDataModal from "../inventory/ImportDataModal";

interface AdminDashboardProps {
  businessName?: string;
  userAvatar?: string;
  userName?: string;
}

const AdminDashboard = ({
  businessName = "Liquor Inventory Management",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  userName = "Admin User",
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showImportModal, setShowImportModal] = useState(false);

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "users", label: "Users", icon: Users },
    { id: "sales", label: "Sales", icon: ShoppingCart },
    { id: "outlets", label: "Outlets", icon: Store },
    { id: "reports", label: "Reports", icon: ClipboardList },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold truncate">{businessName}</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start mb-1"
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
        <div className="absolute bottom-0 w-64 border-t bg-white p-4">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={userAvatar} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start mt-4 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="overview">
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
              <MetricsOverview />
            </TabsContent>

            <TabsContent value="inventory">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Inventory Management</h2>
                <div className="space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowImportModal(true)}
                  >
                    Import Data
                  </Button>
                  <Button>Add New Item</Button>
                </div>
              </div>
              <MainStockTable />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="sales">
              <SalesManagement />
            </TabsContent>

            <TabsContent value="outlets">
              <h2 className="text-2xl font-bold mb-6">Outlet Management</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Outlets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Outlet management content here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <h2 className="text-2xl font-bold mb-6">Reports</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Reports Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Reports content here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Settings content here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ImportDataModal
        open={showImportModal}
        onOpenChange={setShowImportModal}
        onImport={(data) => {
          console.log("Imported data:", data);
          setShowImportModal(false);
        }}
      />
    </div>
  );
};

export default AdminDashboard;
