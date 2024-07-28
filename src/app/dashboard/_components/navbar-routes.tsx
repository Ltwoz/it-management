"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NavbarRoutes = () => {
  const supabase = createClient();
  const router =  useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
      toast.error("Failed to logout");
      return;
    }

    toast.success("Logged out successfully");
    router.replace("/login");
  };

  return (
    <>
      <div className="flex gap-x-2 ml-auto">
        <Button size="default" variant="ghost" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );
};

export default NavbarRoutes;
