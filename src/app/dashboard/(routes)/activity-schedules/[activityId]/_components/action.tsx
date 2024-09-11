"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";
import { deleteActivity } from "../../actions/delete";
import { update } from "../../actions/update";

interface ActionsProps {
  disabled: boolean;
  activityId: number;
  isPublished: boolean;
}

const Actions = ({ disabled, activityId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await update({
          id: activityId,
          is_publish: false,
        });

        toast.success("ยกเลิกการเผยแพร่กิจกรรมแล้ว");
      } else {
        await update({
          id: activityId,
          is_publish: true,
        });

        toast.success("เผยแพร่กิจกรรมแล้ว");
      }

      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await deleteActivity({ id: activityId });

      toast.success("ลบคำถามแล้ว");
      router.push(`/dashboard/activity-schedules`);
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการลบคำถาม");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "ยกเลิกการเผยแพร่" : "เผยแพร่"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;
