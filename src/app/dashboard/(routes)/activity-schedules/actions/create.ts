"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesInsert } from "@/types/supabase";

type Activity = TablesInsert<"activity_schedules">;

export const create = async (param: Activity) => {
  const supabase = createClient();

  await supabase.from("activity_schedules").insert(param);
};
