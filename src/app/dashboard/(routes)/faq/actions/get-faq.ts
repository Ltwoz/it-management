"use server";

import { AsyncReturnType } from "@/lib/get-return-type";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const getFaqs = async (supabase: SupabaseClient<Database>) => {
  const query = await supabase.from("faq").select(`*`);

  return query;
};

export type Faq = NonNullable<AsyncReturnType<typeof getFaqs>["data"]>[number];
