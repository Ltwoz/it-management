"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";

type Activity = TablesUpdate<"activity_schedules">;

export const deleteActivity = async ({ id }: Activity) => {
  const supabase = createClient();

  await supabase.from("activity_schedules").delete().eq("id", id!);
};
