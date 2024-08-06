import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/supabase";
import { create } from "zustand";

type LevelsState = {
  levels: Tables<"levels">[] | null;
}

type LevelActions = {
  fetch: () => Promise<void>;
}

type LevelStore = LevelsState & LevelActions;

export const useLevelsStore = create<LevelStore>((set) => ({
  levels: null,
  fetch: async () => {
    const { data } = await createClient().from("levels").select("*");
    set({ levels: data });
  }
}))

useLevelsStore.getState().fetch();