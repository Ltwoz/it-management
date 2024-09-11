import { createClient } from "@/lib/supabase/server";
import { getActivityById } from "../actions/get-activity";
import Actions from "./_components/action";
import TitleForm from "./_components/title-form";
import { redirect } from "next/navigation";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import Banner from "@/components/banner";

export default async function ActivityIdPage({
  params,
}: {
  params: { activityId: number };
}) {
  const supabase = createClient();

  const { data: activity } = await getActivityById(supabase, params.activityId);

  if (!activity) return redirect("/dashboard/activity-schedules");

  const requiredFields = [activity.title, activity.description];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!activity.is_publish && (
        <Banner
          variant="warning"
          label="กิจกรรมนี้ยังไม่ได้เผยแพร่ นักเรียนจะไม่สามารถเห็นได้"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex flex-col gap-y-2 w-full">
            <h1 className="text-2xl font-medium">จัดการกิจกรรม</h1>
            <span className="text-sm text-slate-700">
              กรอกข้อมูลที่จำเป็นให้ครบ {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            activityId={params.activityId}
            isPublished={activity.is_publish}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TitleForm initialData={activity} activityId={activity.id} />
            <DescriptionForm initialData={activity} activityId={activity.id} />
          </div>
          <div>
            <ImageForm initialData={activity} activityId={activity.id} />
          </div>
        </div>
      </div>
    </>
  );
}
