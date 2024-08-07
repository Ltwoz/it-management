"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";

type Faq = TablesUpdate<"faq">;

export const update = async (param: Faq) => {
  const supabase = createClient();

  await supabase.from("faq").update(param).eq("id", param.id!);
};
