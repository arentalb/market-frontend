// CustomersColumns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Customer } from "@/features/customer/api/customerApiSlice";
import { Link } from "react-router-dom";

export const customersColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ناوی یەکەم
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "lastName",
    header: () => <div className="text-right">ناوی دوەم </div>,
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-left">ژمارە </div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("phone")}</div>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>کردارەکان</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/app/customers/${customer.id}`}>بینینی زیاتر</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>پرینت</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
  },
];
