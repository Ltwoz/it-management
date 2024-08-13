import { createClient } from "@/lib/supabase/server";
import { getGroups } from "./actions/get-groups";
import DataTable from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function Students() {
  const supabase = createClient();

  const { data: groups } = await getGroups(supabase);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">กลุ่ม</h1>
        <span className="text-base text-slate-700">จัดการกลุ่มที่เข้าร่วม</span>
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={groups!} />
      </div>
    </div>
  );
}
