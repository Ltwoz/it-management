import { createClient } from "@/lib/supabase/server";
import DataGrid from "./_components/data-grid";
import { getLevels } from "./actions/get-levels";

export default async function ClassSchedule() {
  const supabase = createClient();

  const { data: levels } = await getLevels(supabase);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">ตารางเรียน</h1>
        <span className="text-base text-slate-700">
          จัดการตารางเรียน ตามระดับชั้น
        </span>
      </div>
      <div className="mt-4">
        <DataGrid levels={levels} />
      </div>
    </div>
  );
}
