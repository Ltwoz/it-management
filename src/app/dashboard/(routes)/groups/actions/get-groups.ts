"use server";

import { AsyncReturnType } from "@/lib/get-return-type";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const getGroups = async (supabase: SupabaseClient<Database>) => {
  const query = supabase
    .from("groups")
    .select(`*`)

  return query;
};

export type Group = NonNullable<
  AsyncReturnType<typeof getGroups>["data"]
>[number];
