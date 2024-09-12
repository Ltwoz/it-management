import { createClient } from "@/lib/supabase/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

const f = createUploadthing();

const handleAuth = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user?.aud !== "authenticated") throw new Error("Unauthorized");

  return { ...data.user };
};

export const ourFileRouter = {
  classScheduleImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
  activityScheduleImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
  collegeCalendarImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
