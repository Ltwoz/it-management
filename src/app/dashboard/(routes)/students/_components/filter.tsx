"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useLevelsStore } from "@/stores/levels-store";

interface FilterProps<TData> {
  table: Table<TData>;
}

export default function Filter<TData>({ table }: FilterProps<TData>) {
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(
    undefined
  );
  const [key, setKey] = useState(+new Date());

  const levels = useLevelsStore((state) => state.levels);

  return (
    <div className="flex items-center space-x-4 pb-4">
      <Input
        placeholder="ค้นหาด้วย ชื่อ-นามสกุล"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Select
        key={key}
        value={selectedLevel}
        onValueChange={(value) =>
          table.getColumn("level")?.setFilterValue(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ระดับชั้น" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {levels?.map((level) => (
              <SelectItem key={level.id} value={level.level_code}>
                {level.level_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        className="group px-3"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedLevel(undefined);
          setKey(+new Date());
          table.resetColumnFilters();
        }}
      >
        <RotateCw className="h-5 w-5 transition duration-700 group-hover:rotate-[360deg]" />
      </Button>
    </div>
  );
}
