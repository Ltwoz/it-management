"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { update } from "../../actions/update";
import { Activity } from "../../actions/get-activity";

interface DescriptionFormProps {
  initialData: Activity;
  activityId: number;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "กรุณาใส่หรายละเอียด",
  }),
});

type ActivityType = z.infer<typeof formSchema>;

const DescriptionForm = ({ initialData, activityId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const form = useForm<ActivityType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: ActivityType) => {
    try {
      await update({
        ...values,
        id: activityId,
      });

      toast.success("แก้ไขรายละเอียดแล้ว");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขรายละเอียด");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        รายละเอียด
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>ยกเลิก</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              แก้ไขรายละเอียด
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {initialData.description || "ไม่มีรายละเอียด"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                size="sm"
              >
                บันทึก
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescriptionForm;
