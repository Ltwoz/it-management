import { createClient } from "@/lib/supabase/server";
import { getActivities } from "./actions/get-activity";
import DataGrid from "./_components/data-grid";
import CreateForm from "./_components/create-form";

export default async function ActivitySchedules() {
  const supabase = createClient();

  const { data: activities } = await getActivities(supabase);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center gap-x-4">
        <div className="flex flex-col gap-y-2 w-full">
          <h1 className="text-2xl font-medium">ตารางกิจกรรม</h1>
          <span className="text-base text-slate-700">
            จัดการตารางกิจกรรม
          </span>
        </div>
        <CreateForm />
      </div>
      <div className="mt-4">
        <DataGrid activities={activities} />
      </div>
    </div>
  );
}
