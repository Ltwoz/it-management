"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import * as z from "zod";

import { Faq } from "../actions/get-faq";
import { deleteFaq } from "../actions/delete";
import { update } from "../actions/update";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface ItemProps {
  faq: Faq;
}

const formSchema = z.object({
  question: z.string().min(1, { message: "กรุณากรอกคำถาม" }),
  answer: z.string().min(1, { message: "กรุณากรอกคำตอบ" }),
});

type FaqType = z.infer<typeof formSchema>;

export default function Item({ faq }: ItemProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<FaqType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: faq,
  });

  const { isSubmitting, isValid } = form.formState;

  const onDelete = async () => {
    try {
      await deleteFaq({ id: faq.id });

      toast.success("ลบคำถามแล้ว");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการลบคำถาม");
    }
  };

  const onSubmit = async (values: FaqType) => {
    try {
      await update({
        ...values,
        id: faq.id
      });

      toast.success("แก้ไขคำถามแล้ว");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขคำถาม");
    }
  };

  return (
    <Card className="p-6">
      {!isEditing && (
        <div className="flex justify-between gap-x-4">
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-col gap-y-2">
              <Label className="font-semibold">คำถาม</Label>
              <p>{faq.question}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label className="font-semibold">คำตอบ</Label>
              <p>{faq.answer}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={toggleEdit} size="sm">
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4 w-full">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2">
                        <Label htmlFor="question" className="font-semibold">
                          คำถาม
                        </Label>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <div className="grid grid-cols-4">
                      <FormMessage className="col-span-3 col-start-2" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2">
                        <Label htmlFor="answer" className="font-semibold">
                          คำถาม
                        </Label>
                        <Textarea {...field} />
                      </div>
                    </FormControl>
                    <div className="grid grid-cols-4">
                      <FormMessage className="col-span-3 col-start-2" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <ConfirmModal onConfirm={onDelete}>
                  <Button variant="destructive">ลบ</Button>
                </ConfirmModal>
                <Button variant="outline" onClick={toggleEdit}>
                  ยกเลิก
                </Button>
                <Button type="submit">บันทึก</Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </Card>
  );
}
