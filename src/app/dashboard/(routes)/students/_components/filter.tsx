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
import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { Tables } from "@/types/supabase";

interface FilterProps<TData> {
  table: Table<TData>;
}

export default function Filter<TData>({ table }: FilterProps<TData>) {
  const supabase = createClient();

  const [levels, setLevels] = useState<Tables<"levels">[] | null>(null);

  const getLevels = useCallback(async () => {
    const { data } = await supabase.from("levels").select("*");
    setLevels(data);
  }, [supabase]);

  useEffect(() => {
    getLevels();
  }, [getLevels]);

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
    </div>
  );
}
