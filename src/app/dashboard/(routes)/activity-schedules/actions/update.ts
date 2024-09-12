"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";
import { utapi } from "@/app/api/uploadthing/core";

type Activity = TablesUpdate<"activity_schedules">;

export const update = async (param: Activity) => {
  const supabase = createClient();

  if (param.public_url) {
    const { data } = await supabase
      .from("activity_schedules")
      .select("*")
      .eq("id", param.id!)
      .single();

    if (data?.public_url) {
      const imageName = data.public_url.split("/").pop();
      await utapi.deleteFiles(imageName!);
    }
  }

  await supabase.from("activity_schedules").update(param).eq("id", param.id!);
};
