export interface LiquorItem {
  id: string;
  name: string;
  photo?: string;
  category: string;
  unitValue: number;
  unitMeasurement: "Milliliter" | "Liter";
  unitContainer: "Bottle" | "Can" | "Box" | "Keg";
  expiryDate: string;
  price: number;
  currentStock: number;
  supplier?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
}

export type UserRole = "Admin" | "Manager" | "Staff";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  date: string;
  userId: string;
}
