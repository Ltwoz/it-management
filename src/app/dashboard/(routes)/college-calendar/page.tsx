import { createClient } from "@/lib/supabase/server";
import { getCollegeCalendar } from "./actions/get-calendar";
import Item from "./_components/item";

export default async function ActivitySchedules() {
  const supabase = createClient();

  const { data: collegeCalendar } = await getCollegeCalendar(supabase);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center gap-x-4">
        <div className="flex flex-col gap-y-2 w-full">
          <h1 className="text-2xl font-medium">ปฏิทินการศึกษา</h1>
          <span className="text-base text-slate-700">จัดการปฏิทินการศึกษา</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-col gap-y-4">
          <Item initialData={collegeCalendar!} />
        </div>
      </div>
    </div>
  );
}
