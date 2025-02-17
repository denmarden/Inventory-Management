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
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { UserRole } from "@/types/inventory";
import { AddEditUserModal } from "./AddEditUserModal";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  lastActive: string;
}

const INITIAL_USERS: User[] = [
  {
    id: "1",
    username: "denmar",
    email: "denmar@example.com",
    role: "Admin",
    lastActive: "2024-04-10",
  },
  {
    id: "2",
    username: "manager1",
    email: "manager1@example.com",
    role: "Manager",
    lastActive: "2024-04-09",
  },
  {
    id: "3",
    username: "staff1",
    email: "staff1@example.com",
    role: "Staff",
    lastActive: "2024-04-10",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleSave = (userData: Partial<User>) => {
    if (userData.id) {
      setUsers(
        users.map((user) =>
          user.id === userData.id ? { ...user, ...userData } : user,
        ),
      );
    } else {
      setUsers([
        ...users,
        {
          ...(userData as User),
          id: Date.now().toString(),
          lastActive: new Date().toISOString().split("T")[0],
        },
      ]);
    }
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    setUserToDelete(null);
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return "destructive";
      case "Manager":
        return "default";
      case "Staff":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <AddEditUserModal onSave={handleSave}>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </AddEditUserModal>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{user.lastActive}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <AddEditUserModal onSave={handleSave} user={user}>
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </AddEditUserModal>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setUserToDelete(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToDelete && deleteUser(userToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
