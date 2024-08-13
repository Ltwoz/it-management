"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Group } from "../actions/get-groups";
import { leaveGroup } from "../actions/leave-group";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LeaveButtonFace {
  row: Group;
}

export default function LeaveButton({ row }: LeaveButtonFace) {
  const router = useRouter();

  const handleLeave = async () => {
    try {
      await leaveGroup({ id: row.id, gid: row.gid });

      toast.success("ออกจากกลุ่มแล้ว");
      router.refresh();
    } catch {
      toast.error("เกิดข้อผิดพลาดในการออกจากกลุ่ม");
    }
  };

  return (
    <ConfirmModal onConfirm={handleLeave}>
      <Button variant="destructive" className="self-end">
        ออกจากกลุ่ม
      </Button>
    </ConfirmModal>
  );
}
