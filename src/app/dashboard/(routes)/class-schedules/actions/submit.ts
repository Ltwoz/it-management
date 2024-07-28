"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesInsert } from "@/types/supabase";

type ClassSchedule = TablesInsert<"class_schedules">;

export const submit = async (param: ClassSchedule) => {
  const supabase = createClient();

  await supabase.from("class_schedules").upsert(param);
};
