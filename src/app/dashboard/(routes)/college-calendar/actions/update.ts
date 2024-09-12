"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";
import { utapi } from "@/app/api/uploadthing/core";

type CollegeCalendar = TablesUpdate<"college_calendar">;

export const update = async (param: CollegeCalendar) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("college_calendar")
    .select("*")
    .eq("id", param.id!)
    .single();

  if (data?.public_url) {
    const imageName = data.public_url.split("/").pop();
    await utapi.deleteFiles(imageName!);
  }

  await supabase.from("college_calendar").update(param).eq("id", param.id!);
};
