import { createClient } from "@/lib/supabase/server";
import DataGrid from "./_components/data-grid";
import { getLevels } from "./actions/get-levels";

export default async function ClassSchedule() {
  const supabase = createClient();

  const { data: levels } = await getLevels(supabase); 

  return (
    <div className="p-6">
      <DataGrid levels={levels} />
    </div>
  );
}
