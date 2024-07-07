"use client";

import { List } from "lucide-react";

import SidebarItem from "./sidebar-item";

const adminRoutes = [
  {
    icon: List,
    label: "ระดับชั้น",
    href: "/dashboard/level",
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
