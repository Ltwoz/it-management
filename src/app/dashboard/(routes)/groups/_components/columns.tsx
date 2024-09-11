"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Group } from "../actions/get-groups";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import LeaveButton from "./leave-button";

export const columns: ColumnDef<Group>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ชื่อกลุ่ม
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <div>รูปภาพกลุ่ม</div>;
    },
    cell: ({ row }) => {
      return (
        <Avatar className="w-14 h-14">
          <AvatarImage src={row.original.image} key={row.original.id} />
        </Avatar>
      );
    },
  },
  {
    accessorKey: "gid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          รหัสกลุ่ม
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <LeaveButton row={row.original} />
      );
    },
  },
];
