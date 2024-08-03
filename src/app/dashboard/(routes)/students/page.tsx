import { createClient } from "@/lib/supabase/server";
import { columns } from "./_components/columns";
import DataTable from "./_components/data-table";
import { getStudents } from "./actions/get-students";

export default async function Students() {
  const supabase = createClient();

  const { data: students } = await getStudents(supabase);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">นักศึกษา</h1>
        <span className="text-base text-slate-700">
          จัดการนักศึกษา และข้อมูลของนักศึกษา
        </span>
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={students!} />
      </div>
    </div>
  );
}
