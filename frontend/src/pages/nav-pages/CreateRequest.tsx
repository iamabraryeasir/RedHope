import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
    unitsNeeded: z.coerce.number().min(1, "Units must be at least 1"),
    urgency: z.enum(["LOW", "NORMAL", "HIGH", "EMERGENCY"]).default("NORMAL"),
    reasonOfRequest: z.string().optional(),

    hospitalName: z.string().min(1, "Hospital name is required"),
    hospitalAddress: z.string().optional(),
    hospitalCity: z.string().min(1, "City is required"),
    hospitalDistrict: z.string().min(1, "District is required"),

    contactPhone: z.string().min(8, "Phone is required"),
    altContactPhone: z.string().optional(),

    neededBy: z.string().optional(),
});

type RequestFormValues = z.infer<typeof requestFormSchema>;

export default function CreateRequest() {
    const navigate = useNavigate();
    const [createRequest, { isLoading }] = useCreateRequestMutation();

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
            toast.success("Request created", { id: toastId });
            navigate("/requests");
        } catch (err) {
            // try to read message safely from common RTK Query error shapes
            const e = err as unknown as {
                data?: { message?: string };
                error?: string;
            };
            const message =
                e?.data?.message ?? e?.error ?? "Failed to create request";
            toast.error(message, { id: toastId });
        }
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Create Blood Request</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="patientName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Patient Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
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
                                                    <SelectItem value="A+">
                                                        A+
                                                    </SelectItem>
                                                    <SelectItem value="A-">
                                                        A-
                                                    </SelectItem>
                                                    <SelectItem value="B+">
                                                        B+
                                                    </SelectItem>
                                                    <SelectItem value="B-">
                                                        B-
                                                    </SelectItem>
                                                    <SelectItem value="O+">
                                                        O+
                                                    </SelectItem>
                                                    <SelectItem value="O-">
                                                        O-
                                                    </SelectItem>
                                                    <SelectItem value="AB+">
                                                        AB+
                                                    </SelectItem>
                                                    <SelectItem value="AB-">
                                                        AB-
                                                    </SelectItem>
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
                                            <Input
                                                type="number"
                                                min={1}
                                                {...field}
                                            />
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
                                                    <SelectItem value="LOW">
                                                        LOW
                                                    </SelectItem>
                                                    <SelectItem value="NORMAL">
                                                        NORMAL
                                                    </SelectItem>
                                                    <SelectItem value="HIGH">
                                                        HIGH
                                                    </SelectItem>
                                                    <SelectItem value="EMERGENCY">
                                                        EMERGENCY
                                                    </SelectItem>
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
                                        <Input
                                            placeholder="Reason of request"
                                            {...field}
                                        />
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
                                        <Input
                                            placeholder="City General Hospital"
                                            {...field}
                                        />
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
                                        <Input
                                            placeholder="123 Green Road"
                                            {...field}
                                        />
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
                                            <Input
                                                placeholder="Dhaka"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="Dhaka"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="01712345678"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="01898765432"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="neededBy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Needed By</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3">
                            <Button type="submit" disabled={isLoading}>
                                Create Request
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
