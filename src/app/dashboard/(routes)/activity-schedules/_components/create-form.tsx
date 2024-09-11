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

const formSchema = z.object({
  title: z.string().min(1, { message: "กรุณาใส่หัวข้อกิจกรรม" }),
});

type ActivityType = z.infer<typeof formSchema>;

export default function CreateForm() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const form = useForm<ActivityType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: ActivityType) => {
    try {
      await create(values);

      toast.success("เพิ่มกิจกรรมแล้ว");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการเพิ่มกิจกรรม");
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
        <Button>เพิ่มกิจกรรม</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>เพิ่มกิจกรรม</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2">
                        <Label htmlFor="title">หัวข้อ</Label>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <div className="grid grid-cols-4">
                      <FormMessage className="col-span-3" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                เพิ่มกิจกรรม
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
