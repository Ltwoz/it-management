"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";

type Faq = TablesUpdate<"faq">;

export const deleteFaq = async ({ id }: Faq) => {
  const supabase = createClient();

  await supabase.from("faq").delete().eq("id", id!);
};
