"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

interface FilterProps<TData> {
  table: Table<TData>;
}

export default function Filter<TData>({ table }: FilterProps<TData>) {
  return (
    <div className="flex items-center space-x-4 pb-4">
      <Input
        placeholder="ค้นหาด้วยชื่อกลุ่ม"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Button
        className="group px-3"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          table.resetColumnFilters();
        }}
      >
        <RotateCw className="h-5 w-5 transition duration-700 group-hover:rotate-[360deg]" />
      </Button>
    </div>
  );
}
