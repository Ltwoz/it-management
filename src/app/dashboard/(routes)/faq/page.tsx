import { createClient } from "@/lib/supabase/server";
import { getFaqs } from "./actions/get-faq";
import DataGrid from "./_components/data-grid";
import CreateForm from "./_components/create-form";

export default async function Faq() {
  const supabase = createClient();

  const { data: faqs } = await getFaqs(supabase);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center gap-x-4">
        <div className="flex flex-col gap-y-2 w-full">
          <h1 className="text-2xl font-medium">คำถามที่พบบ่อย</h1>
          <span className="text-base text-slate-700">
            จัดการคำถามที่พบบ่อย และคำตอบของคำถาม
          </span>
        </div>
        <CreateForm />
      </div>
      <div className="mt-4">
        <DataGrid faqs={faqs} />
      </div>
    </div>
  );
}
