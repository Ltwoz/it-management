import { AsyncReturnType } from "@/lib/get-return-type";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const getLevels = async (supabase: SupabaseClient<Database>) => {
  const query = supabase.from("levels").select(`
    *,
    class_schedules (*)
  `);

  return query;
};

export type Level = NonNullable<
  AsyncReturnType<typeof getLevels>["data"]
>[number];
