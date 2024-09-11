"use client";

import * as z from "zod";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { Activity } from "../../actions/get-activity";
import { update } from "../../actions/update";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageFormProps {
  initialData: Activity;
  activityId: number;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

type ActivityType = z.infer<typeof formSchema>;

const ImageForm = ({ initialData, activityId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const onSubmit = async (values: ActivityType) => {
    try {
      await update({
        public_url: values.imageUrl,
        id: activityId,
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
        รูปภาพ
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.public_url && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              เพิ่มรูปภาพ
            </>
          )}
          {!isEditing && initialData.public_url && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              แก้ไขรูปภาพ
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
                  className="object-cover rounded-md"
                  src={initialData.public_url}
                />
              </DialogTrigger>
              <DialogContent className="p-0 max-w-screen-lg">
                <DialogTitle className="sr-only">
                  รูปภาพของกิจกรรม {initialData.title}
                </DialogTitle>
                <div className="relative aspect-video">
                  <Image
                    alt="Class Schedule"
                    fill
                    className="object-cover rounded-md"
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

export default ImageForm;
