"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesInsert } from "@/types/supabase";

type Faq = TablesInsert<"faq">;

export const create = async (param: Faq) => {
  const supabase = createClient();

  await supabase.from("faq").insert(param);
};
