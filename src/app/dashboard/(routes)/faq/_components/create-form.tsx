"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { create } from "../actions/create";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  question: z.string().min(1, { message: "กรุณากรอกคำถาม" }),
  answer: z.string().min(1, { message: "กรุณากรอกคำตอบ" }),
});

type FaqType = z.infer<typeof formSchema>;

export default function CreateForm() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const form = useForm<FaqType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FaqType) => {
    try {
      await create(values);

      toast.success("เพิ่มคำถามแล้ว");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการเพิ่มคำถาม");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setOpen((prev) => !prev);
      }}
    >
      <DialogTrigger asChild>
        <Button>เพิ่มคำถาม</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>เพิ่มคำถามที่พบบ่อย</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2">
                        <Label htmlFor="question">คำถาม</Label>
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
                        <Label htmlFor="answer">คำตอบ</Label>
                        <Textarea {...field} />
                      </div>
                    </FormControl>
                    <div className="grid grid-cols-4">
                      <FormMessage className="col-span-3 col-start-2" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                เพิ่มคำถาม
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
