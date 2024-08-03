"use server";

import { AsyncReturnType } from "@/lib/get-return-type";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const getStudents = async (supabase: SupabaseClient<Database>) => {
  const query = supabase
    .from("students")
    .select(`*, levels(*)`)

  return query;
};

export type Student = NonNullable<
  AsyncReturnType<typeof getStudents>["data"]
>[number];
