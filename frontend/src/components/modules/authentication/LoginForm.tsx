/**
 * Node Modules
 */
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

/**
 * Local Modules
 */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoginMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { Form, FormField } from "@/components/ui/form";

/**
 * Assets
 */
import LoginImage from "@/assets/login-image.jpeg";
import { PasswordField } from "./PasswordField";
import { UserRole } from "@/constants/role";

/**
 * Form Schema
 */
const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * Component Logic
 */
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { refetch } = useUserInfoQuery(null); // 👈 RTK Query refetch

  async function onSubmit(loginInfo: z.infer<typeof loginFormSchema>) {
    const toastId = toast.loading("User logging in....");
    try {
      const res = await login(loginInfo).unwrap();

      if (res.success) {
        // Refetch user info before navigating
        await refetch();

        if (res.data.user.role === UserRole.admin) {
          toast.success("Welcome to Admin Dashboard", { id: toastId });
          navigate("/admin");
        } else if (res.data.user.isVerified) {
          toast.success("Successfully logged in", { id: toastId });
          navigate("/donors");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data?.message === "Invalid email or password") {
        toast.error(error.data.message, { id: toastId });
      } else if (error.data?.message === "User is not verified") {
        toast.error("Your account is not verified", { id: toastId });
        navigate("/verify", { state: loginInfo.email });
      } else {
        toast.error("Error while logging in", { id: toastId });
        console.log(error);
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your RedHope account
                  </p>
                </div>

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input placeholder="mymail@gmail.com" {...field} />
                    </div>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          to="/forgot-password"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <PasswordField field={field} />
                    </div>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-muted relative hidden md:block">
            <img
              src={LoginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
