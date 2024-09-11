"use client";

import { Pencil } from "lucide-react";

import { Activity } from "../actions/get-activity";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ItemProps {
  activity: Activity;
}

export default function Item({ activity }: ItemProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start gap-x-4">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex flex-col gap-y-2">
            <p className="font-medium">{activity.title}</p>
          </div>
          <div className="text-sm opacity-70">
            สร้างเมื่อ {new Date(activity.created_at).toLocaleString("th-TH", {
              dateStyle: "long",
            })}
          </div>
        </div>
        <div className="flex justify-end items-center gap-2 w-1/3">
          <Badge
            className={cn(
              "rounded-sm hover:bg-slate-500 bg-slate-500",
              activity.is_publish && "hover:bg-green-700 bg-green-700"
            )}
          >
            {activity.is_publish ? "เผยแพร่แล้ว" : "ยังไม่เผยแพร่"}
          </Badge>
          <Link href={`/dashboard/activity-schedules/${activity.id}`}>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
