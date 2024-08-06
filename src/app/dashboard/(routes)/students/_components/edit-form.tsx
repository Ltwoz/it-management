"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Student } from "../actions/get-students";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useLevelsStore } from "@/stores/levels-store";
import { update } from "../actions/update";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditFormProps {
  row: Student;
}

const formSchema = z.object({
  code: z
    .string()
    .regex(/^\d+$/, { message: "รหัสนักศึกษาต้องประกอบด้วยตัวเลขเท่านั้น" })
    .length(11, { message: "รหัสนักศึกษาต้องมี 11 หลัก" }),
  name: z
    .string()
    .regex(/^[A-Za-zก-๙]+ [A-Za-zก-๙]+$/, {
      message: "ชื่อ-นามสกุลต้องประกอบด้วยตัวอักษรเท่านั้น",
    })
    .min(3, { message: "กรุณากรอก ชื่อ-นามสกุลให้ถูกต้อง" })
    .max(50, { message: "ชื่อ-นามสกุลต้องมีความยาวไม่เกิน 50 ตัวอักษร" }),
  level: z.string().min(1, { message: "กรุณาเลือกระดับชั้น" }),
  email: z.string().email({ message: "กรุณาใส่อีเมลที่ถูกต้อง" }),
  phone_no: z
    .string()
    .regex(/^\d+$/, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
    .length(10, { message: "เบอร์โทรศัพท์ต้องมี 10 หลัก" }),
});

export type StudentType = z.infer<typeof formSchema>;

export default function EditForm({ row }: EditFormProps) {
  // console.log(row);
  const router = useRouter();

  const levels = useLevelsStore((state) => state.levels);

  const [open, setOpen] = useState(false);

  const form = useForm<StudentType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    values: {
      code: row.code,
      name: row.name,
      level: row.level,
      email: row.email,
      phone_no: row.phone_no,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: StudentType) => {
    const changedFields = Object.keys(values).reduce((changes, key) => {
      if (values[key as keyof StudentType] !== row[key as keyof StudentType]) {
        changes[key as keyof StudentType] = values[key as keyof StudentType];
      }
      return changes;
    }, {} as Partial<StudentType>);

    if (Object.keys(changedFields).length === 0) {
      toast("ไม่มีการเปลี่ยนแปลงข้อมูล", { icon: "👹" });
      setOpen(false);
      return;
    }

    try {
      await update({
        ...changedFields,
        id: row.id,
      });

      toast.success("แก้ไขข้อมูลนักศึกษาแล้ว");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
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
        <Button
          className="p-1 h-8 w-8 rounded-full"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogTitle className="">แก้ไขข้อมูลนักศึกษา</DialogTitle>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="code" className="text-right">
                          รหัสนักศึกษา
                        </Label>
                        <Input className="col-span-3" {...field} />
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          ชื่อ-นามสกุล
                        </Label>
                        <Input className="col-span-3" {...field} />
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
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="level" className="text-right">
                          ระดับชั้น
                        </Label>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="ระดับชั้น" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {levels?.map((level) => (
                                <SelectItem
                                  key={level.id}
                                  value={level.level_code}
                                >
                                  {level.level_name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          อีเมล
                        </Label>
                        <Input className="col-span-3" {...field} />
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
                name="phone_no"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone_no" className="text-right">
                          เบอร์โทรศัพท์
                        </Label>
                        <Input className="col-span-3" {...field} />
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
                บันทึก
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
