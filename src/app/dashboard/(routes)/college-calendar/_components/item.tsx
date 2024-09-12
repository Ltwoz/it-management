"use client";

import * as z from "zod";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { update } from "../actions/update";
import { CollegeCalendar } from "../actions/get-calendar";

interface ItemProps {
  initialData: CollegeCalendar;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

type FormType = z.infer<typeof formSchema>;

const Item = ({ initialData }: ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const onSubmit = async (values: FormType) => {
    try {
      await update({
        id: initialData.id,
        public_url: values.imageUrl,
      });

      toast.success("แก้ไขรูปภาพแล้ว");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขรูปภาพ");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        ปฏิทินการศึกษา
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>ยกเลิก</>}
          {!isEditing && !initialData.public_url && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              เพิ่มปฏิทินการศึกษา
            </>
          )}
          {!isEditing && initialData.public_url && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              แก้ไขปฏิทินการศึกษา
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.public_url ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Dialog>
              <DialogTrigger>
                <Image
                  alt="Upload"
                  fill
                  className="object-contain rounded-md"
                  src={initialData.public_url}
                />
              </DialogTrigger>
              <DialogContent className="p-0 max-w-screen-lg">
                <DialogTitle className="sr-only">{initialData.id}</DialogTitle>
                <div className="relative aspect-video">
                  <Image
                    alt="Class Schedule"
                    fill
                    className="object-contain rounded-md"
                    src={initialData.public_url}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      {isEditing && (
        <>
          <FileUpload
            endpoint="activityScheduleImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default Item;
