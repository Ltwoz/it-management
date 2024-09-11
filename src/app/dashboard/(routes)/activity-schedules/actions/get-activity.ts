"use server";

import { AsyncReturnType } from "@/lib/get-return-type";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const getActivities = async (supabase: SupabaseClient<Database>) => {
  const query = await supabase.from("activity_schedules").select(`*`);

  return query;
};

export const getActivityById = async (supabase: SupabaseClient<Database>, id: number) => {
  const query = await supabase.from("activity_schedules").select(`*`).eq("id", id).single();

  return query;
}

export type Activity = NonNullable<AsyncReturnType<typeof getActivities>["data"]>[number];
