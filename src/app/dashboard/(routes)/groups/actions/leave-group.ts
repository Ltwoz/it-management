"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/supabase";
import axios from "axios";

type Group = TablesUpdate<"groups">;

export const leaveGroup = async ({ id, gid }: Group) => {
  const supabase = createClient();

  await axios.post(`https://b4a2-171-96-36-55.ngrok-free.app/api/group/leave`, { groupId: gid });

  await supabase.from("groups").delete().eq("id", id!);
};
