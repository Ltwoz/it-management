"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export type FormData = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async ({ email, password }: FormData) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("data : ", data);

    if (error) {
      console.error("Error logging out:", error.message);
      toast.error(error?.message);
      return;
    }

    if (data.user.aud === "authenticated") {
      toast.success("เข้าสู่ระบบสำเร็จ");
      router.replace("/");
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-cover">
      <Image
        alt="Background"
        src={"https://it.cmtc.ac.th/wp-content/uploads/2024/07/895663_0.jpg"}
        quality={100}
        fill
        priority
        sizes="100vw"
        className="-z-50 object-cover"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-sm w-full">
            <CardHeader>
              <CardTitle className="text-center">
                IT Line OA Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-xs">Email</FormLabel>
                    <FormControl>
                      <Input type="email" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-xs">Password</FormLabel>
                    <FormControl>
                      <Input type="password" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button disabled={isSubmitting} type="submit" className="w-full">
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
