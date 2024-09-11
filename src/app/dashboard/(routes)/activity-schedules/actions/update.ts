"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";

type Activity = TablesUpdate<"activity_schedules">;

export const update = async (param: Activity) => {
  const supabase = createClient();

  await supabase.from("activity_schedules").update(param).eq("id", param.id!);
};
