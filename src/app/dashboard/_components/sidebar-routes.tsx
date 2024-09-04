"use client";

import { Calendar, CircleHelp, Group, List, UsersRound } from "lucide-react";

import SidebarItem from "./sidebar-item";

const adminRoutes = [
  {
    icon: Group,
    label: "กลุ่ม",
    href: "/dashboard/groups",
  },
  // {
  //   icon: List,
  //   label: "ระดับชั้น",
  //   href: "/dashboard/levels",
  // },
  {
    icon: Calendar,
    label: "ตารางเรียน",
    href: "/dashboard/class-schedules",
  },
  {
    icon: Calendar,
    label: "ตารางกิจกรรม",
    href: "/dashboard/activity-schedules",
  },
  {
    icon: Calendar,
    label: "ปฏิทินการศึกษา",
    href: "/dashboard/college-calendar",
  },
  // {
  //   icon: UsersRound,
  //   label: "นักศึกษา",
  //   href: "/dashboard/students",
  // },
  {
    icon: CircleHelp,
    label: "คำถามที่พบบ่อย",
    href: "/dashboard/faq",
  },
];

const SidebarRoutes = () => {
  const routes = adminRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
