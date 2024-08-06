"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";

type Student = TablesUpdate<"students">;

export const update = async (param: Student) => {
  const supabase = createClient();

  await supabase.from("students").update(param).eq("id", param.id!);
};
