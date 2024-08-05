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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { Tables } from "@/types/supabase";
import toast from "react-hot-toast";

interface EditFormProps {
  row: Student;
}

const formSchema = z.object({
  code: z
    .string()
    .min(11, { message: "รหัสนักศึกษาต้องมีอย่างน้อย 11 ตัวอักษร" }),
  name: z.string().min(3, { message: "กรุณากรอก ชื่อ-นามสกุลให้ถูกต้อง" }),
  level: z.string().min(1, { message: "กรุณาเลือกระดับชั้น" }),
  email: z.string().email({ message: "กรุณาใส่อีเมล์ที่ถูกต้อง" }),
  phone_no: z
    .string()
    .min(10, { message: "เบอร์โทรศัพท์ต้องมีความยาวอย่างน้อย 10 ตัวอักษร" }),
});

export type StudentType = z.infer<typeof formSchema>;

export default function EditForm({ row }: EditFormProps) {
  const supabase = createClient();

  const [levels, setLevels] = useState<Tables<"levels">[]>();

  const form = useForm<StudentType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: row.code,
      name: row.name,
      level: row.level,
      email: row.email,
      phone_no: row.phone_no,
    },
  });

  const getLevel = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("levels").select("*");

      if (error) {
        throw error;
      }

      if (data) {
        setLevels(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [supabase]);

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  const onSubmit = async (values: StudentType) => {
    console.log(values);

    // if (data) {
    //   toast.success("Register success");
    // } else {
    //   toast.error("Something went wrong");
    // }
  };

  return (
    <Dialog
      onOpenChange={() => {
        form.reset();
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
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">บันทึก</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
