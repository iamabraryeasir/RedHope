import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { format, addHours, isBefore, isAfter } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateRequestMutation } from "@/redux/features/requests/requests.api";
import type { IRequestCreatePayload } from "@/redux/features/requests/requests.api";

const requestFormSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .refine((val) => val.length > 0, "Please select a valid blood group"),
  unitsNeeded: z.coerce
    .number()
    .min(1, "Units must be at least 1")
    .max(10, "Units cannot exceed 10"),
  urgency: z
    .enum(["LOW", "NORMAL", "HIGH", "EMERGENCY"])
    .refine((val) => val.length > 0, "Please select a valid urgency level"),
  reasonOfRequest: z
    .string()
    .min(1, "Reason for request is required")
    .optional()
    .or(z.literal("")),

  hospitalName: z.string().min(1, "Hospital name is required"),
  hospitalAddress: z.string().optional(),
  hospitalCity: z.string().min(1, "City is required"),
  hospitalDistrict: z.string().min(1, "District is required"),

  contactPhone: z
    .string()
    .min(1, "Contact phone is required")
    .refine(
      (phone) => /^\d+$/.test(phone),
      "Phone number must contain only digits"
    )
    .refine(
      (phone) => phone.length === 11,
      "Phone number must be exactly 11 digits"
    ),
  altContactPhone: z
    .string()
    .optional()
    .refine(
      (phone) => !phone || /^\d+$/.test(phone),
      "Phone number must contain only digits"
    )
    .refine(
      (phone) => !phone || phone.length === 11,
      "Phone number must be exactly 11 digits"
    ),

  neededBy: z
    .string()
    .min(1, "Needed by date and time is required")
    .refine((dateStr) => {
      if (!dateStr) return false;
      const selectedDate = new Date(dateStr);
      const now = new Date();
      const oneHourFromNow = addHours(now, 1);
      return isAfter(selectedDate, oneHourFromNow);
    }, "Please select a date and time at least 1 hour in the future"),
});

type RequestFormValues = z.infer<typeof requestFormSchema>;

export default function CreateRequest() {
  const navigate = useNavigate();
  const [createRequest, { isLoading }] = useCreateRequestMutation();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // zodResolver's type can be incompatible with project's generic Resolver type
  // so cast to the Resolver<RequestFormValues> to satisfy react-hook-form types.
  const resolver = zodResolver(
    requestFormSchema
  ) as unknown as Resolver<RequestFormValues>;

  const form = useForm<RequestFormValues>({
    resolver,
    defaultValues: {
      patientName: "",
      bloodGroup: "O+",
      unitsNeeded: 1,
      urgency: "NORMAL",
      reasonOfRequest: "",
      hospitalName: "",
      hospitalAddress: "",
      hospitalCity: "",
      hospitalDistrict: "",
      contactPhone: "",
      altContactPhone: "",
      neededBy: "",
    },
  });

  async function onSubmit(values: RequestFormValues) {
    const toastId = toast.loading("Creating request...");

    try {
      const payload: IRequestCreatePayload = {
        patientName: values.patientName,
        bloodGroup: values.bloodGroup,
        unitsNeeded: Number(values.unitsNeeded),
        urgency: values.urgency,
        reasonOfRequest: values.reasonOfRequest ?? undefined,

        hospitalName: values.hospitalName,
        hospitalAddress: values.hospitalAddress ?? undefined,
        hospitalCity: values.hospitalCity,
        hospitalDistrict: values.hospitalDistrict,

        contactPhone: values.contactPhone,
        altContactPhone: values.altContactPhone,

        neededBy: values.neededBy
          ? new Date(values.neededBy).toISOString()
          : undefined,
      };

      await createRequest(payload).unwrap();
      toast.success("Request created successfully", { id: toastId });
      navigate("/requests");
    } catch (err) {
      console.error("Error details:", err);

      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        const zodErrors = err.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("\n");
        toast.error(zodErrors, {
          id: toastId,
          duration: 5000,
        });
        return;
      }

      // Handle RTK Query errors
      const e = err as unknown as {
        data?: {
          message?: string;
          errors?: Record<string, string[]>;
          detail?: string;
        };
        error?: string;
        status?: number;
      };

      let errorMessage = "Failed to create request";

      // Check for validation errors from backend
      if (e?.data?.errors && typeof e.data.errors === "object") {
        const errorMessages = Object.entries(e.data.errors)
          .map(([field, messages]) => {
            if (Array.isArray(messages)) {
              return `${field}: ${messages.join(", ")}`;
            }
            return `${field}: ${messages}`;
          })
          .join("\n");
        errorMessage = errorMessages;
      } else if (e?.data?.message && e.data.message !== "Zod Error") {
        errorMessage = e.data.message;
      } else if (e?.data?.detail) {
        errorMessage = e.data.detail;
      } else if (e?.error && e.error !== "Zod Error") {
        errorMessage = e.error;
      } else {
        // If we still have a Zod error message, try to extract more info
        const errorStr = JSON.stringify(e);
        if (errorStr.includes("validation") || errorStr.includes("required")) {
          errorMessage = "Please fill in all required fields correctly";
        } else {
          errorMessage = "Please check your input and try again";
        }
      }

      toast.error(errorMessage, {
        id: toastId,
        duration: 5000,
      });
    }
  }

  return (
    <Card className="max-w-3xl mx-auto my-20">
      <CardHeader>
        <CardTitle>Create Blood Request</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitsNeeded"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Units Needed</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">LOW</SelectItem>
                          <SelectItem value="NORMAL">NORMAL</SelectItem>
                          <SelectItem value="HIGH">HIGH</SelectItem>
                          <SelectItem value="EMERGENCY">EMERGENCY</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reasonOfRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Input placeholder="Reason of request" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h4 className="font-semibold">Hospital Details</h4>
            <FormField
              control={form.control}
              name="hospitalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Name</FormLabel>
                  <FormControl>
                    <Input placeholder="City General Hospital" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hospitalAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Green Road" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hospitalCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hospitalDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="01712345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="altContactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="01898765432" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="neededBy"
              render={({ field }) => {
                const now = new Date();
                const tomorrowStart = new Date(now);
                tomorrowStart.setDate(tomorrowStart.getDate() + 1);
                tomorrowStart.setHours(0, 0, 0, 0);

                const isValidDateTime = (dateStr: string) => {
                  if (!dateStr) return false;
                  const selectedDate = new Date(dateStr);
                  const oneHourFromNow = addHours(now, 1);
                  return isAfter(selectedDate, oneHourFromNow);
                };

                return (
                  <FormItem>
                    <FormLabel>Needed By</FormLabel>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && isValidDateTime(field.value)
                              ? format(new Date(field.value), "PPP p")
                              : "Pick a date and time (min 1 hour from now)"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value && isValidDateTime(field.value)
                              ? new Date(field.value)
                              : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              const currentTime = field.value
                                ? new Date(field.value)
                                : new Date();
                              const newDate = new Date(date);
                              newDate.setHours(currentTime.getHours());
                              newDate.setMinutes(currentTime.getMinutes());
                              field.onChange(newDate.toISOString());
                            }
                          }}
                          disabled={(date) => {
                            // Disable all dates before tomorrow
                            return isBefore(date, tomorrowStart);
                          }}
                        />
                        <div className="p-3 border-t space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Time (at least 1 hour from now)
                            </label>
                            <Input
                              type="time"
                              value={
                                field.value
                                  ? format(new Date(field.value), "HH:mm")
                                  : ""
                              }
                              onChange={(e) => {
                                const timeValue = e.target.value;
                                if (timeValue) {
                                  const [hours, minutes] = timeValue.split(":");
                                  if (field.value) {
                                    // Update existing date with new time
                                    const newDate = new Date(field.value);
                                    newDate.setHours(
                                      parseInt(hours),
                                      parseInt(minutes)
                                    );
                                    field.onChange(newDate.toISOString());
                                  } else {
                                    // Create new date with tomorrow's date and selected time
                                    const newDate = new Date(tomorrowStart);
                                    newDate.setHours(
                                      parseInt(hours),
                                      parseInt(minutes)
                                    );
                                    field.onChange(newDate.toISOString());
                                  }
                                }
                              }}
                              placeholder="HH:mm"
                              className="mt-2"
                            />
                          </div>
                          {field.value && !isValidDateTime(field.value) && (
                            <p className="text-sm text-red-600">
                              Selected time must be at least 1 hour from now
                            </p>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading}>
                Create Request
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
