import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

const f = createUploadthing();

// const handleAuth = () => {
//   const { userId } = auth();

//   if (!userId || !isTeacher(userId)) throw new Error("Unauthorized");
//   return { userId };
// };

export const ourFileRouter = {
  classScheduleImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
