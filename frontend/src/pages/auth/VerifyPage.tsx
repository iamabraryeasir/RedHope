import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import type { IVerifyOTP } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState<string>(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendOtp = async () => {
    try {
      const toastId = toast.loading("Sending OTP...");
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("OTP sent successfully! Check your email.", {
          id: toastId,
        });
        setConfirmed(true);
        setTimer(180);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.message || "Failed to send OTP";
      toast.error(errorMessage);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Verifying OTP...");

    try {
      const userInfo: IVerifyOTP = {
        email,
        otp: data.pin,
      };

      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("Email verified successfully!", { id: toastId });
        setConfirmed(true);
        setTimeout(() => navigate("/login"), 1500);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.message || "Failed to verify OTP";
      toast.error(errorMessage, { id: toastId });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!confirmed || timer === 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [confirmed, timer]);

  return (
    <div className="grid place-content-center min-h-screen px-4">
      {confirmed ? (
        <Card className="w-full min-w-md shadow-lg">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl font-bold">
              Verify your email
            </CardTitle>
            <CardDescription className="text-base">
              We sent a 6-digit code to <br />
              <span className="font-semibold text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter OTP</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          disabled={isSubmitting || isVerifyingOtp}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="flex items-center justify-between pt-2">
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0 || isSendingOtp}
                          className={cn("p-0 m-0 h-auto", {
                            "cursor-pointer": timer === 0,
                            "text-muted-foreground": timer !== 0,
                          })}
                        >
                          {isSendingOtp && (
                            <Dot className="animate-spin mr-1 h-3 w-3" />
                          )}
                          Resend OTP
                        </Button>
                        <span
                          className={cn("text-sm font-medium", {
                            "text-red-500": timer > 0 && timer <= 30,
                            "text-foreground": timer > 30 || timer === 0,
                          })}
                        >
                          {timer > 0
                            ? `${Math.floor(timer / 60)}:${(timer % 60)
                                .toString()
                                .padStart(2, "0")}`
                            : ""}
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button
              form="otp-form"
              type="submit"
              disabled={
                isSubmitting ||
                isVerifyingOtp ||
                !form.watch("pin") ||
                form.watch("pin").length !== 6
              }
              className="min-w-24"
            >
              {isSubmitting || isVerifyingOtp ? (
                <>
                  <Dot className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-[500px] shadow-lg">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl font-bold">
              Verify your email
            </CardTitle>
            <CardDescription className="text-base">
              We'll send a verification code to <br />
              <span className="font-semibold text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <Button
              onClick={handleSendOtp}
              disabled={isSendingOtp}
              className="w-full"
              size="lg"
            >
              {isSendingOtp ? (
                <>
                  <Dot className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
