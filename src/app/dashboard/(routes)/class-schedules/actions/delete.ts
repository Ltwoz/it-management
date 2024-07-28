"use server";

import { utapi } from "@/app/api/uploadthing/core";
import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";

type ClassSchedule = TablesUpdate<"class_schedules">;

export const deleteClassSchedule = async ({ id }: ClassSchedule) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("class_schedules")
    .select("*")
    .eq("id", id!)
    .single();

  if (data?.public_url) {
    const imageName = data.public_url.split("/").pop();
    await utapi.deleteFiles(imageName!);
  }

  await supabase.from("class_schedules").delete().eq("id", id!);
};
