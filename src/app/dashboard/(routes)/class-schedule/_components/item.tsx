"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as z from "zod";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

import { type Level } from "../actions/get-levels";
import { submit } from "../actions/submit";
import { FileUpload } from "@/components/file-upload";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";
import { useState } from "react";
import { deleteClassSchedule } from "../actions/delete";

interface ItemProps {
  level: Level;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export default function Item({ level }: ItemProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      submit({
        public_url: values.imageUrl,
        level: level.level_code,
        academic_year: 2567,
      });

      toast.success("อัพโหลดตารางเรียนแล้ว");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการอัพโหลด");
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteClassSchedule({ id: level.class_schedules?.id });
      setIsLoading(false);
      toast.success("ลบตารางเรียนแล้ว");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการลบ");
    }
  };

  return (
    <div className="p-6 border rounded-md flex flex-col justify-between md:flex-row hover:bg-slate-50/80">
      <div className="w-full">
        <h2 className="text-lg">{level.level_name}</h2>
      </div>
      <div className="w-full md:w-2/3 flex-shrink-0">
        {!level.class_schedules?.public_url ? (
          <FileUpload
            endpoint="classScheduleImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
        ) : (
          <>
            <div className="relative aspect-[28/17]">
              <Dialog>
                <DialogTrigger>
                  <Image
                    alt="Class Schedule"
                    fill
                    className="object-cover rounded-md transition-opacity opacity-0 duration-[2000]"
                    src={level.class_schedules.public_url}
                    onLoad={(image) =>
                      image.currentTarget.classList.remove("opacity-0")
                    }
                  />
                </DialogTrigger>
                <DialogContent className="p-0 max-w-screen-lg">
                  <DialogTitle className="sr-only">
                    ตารางเรียนของชั้น {level.level_name}
                  </DialogTitle>
                  <div className="relative aspect-[28/17]">
                    <Image
                      alt="Class Schedule"
                      fill
                      className="object-cover rounded-md"
                      src={level.class_schedules.public_url}
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <ConfirmModal onConfirm={onDelete}>
                {/* <Button
                  className="px-3 absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                  variant="destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button> */}
                <Button size="sm" disabled={isLoading} className="absolute right-4 top-4">
                  <Trash className="h-4 w-4" />
                </Button>
              </ConfirmModal>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
