"use server";

import { AsyncReturnType } from "@/lib/get-return-type";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const getCollegeCalendar = async (
  supabase: SupabaseClient<Database>
) => {
  const query = await supabase
    .from("college_calendar")
    .select(`*`)
    .eq("id", 1)
    .single();

  return query;
};

export type CollegeCalendar = NonNullable<
  AsyncReturnType<typeof getCollegeCalendar>["data"]
>;
