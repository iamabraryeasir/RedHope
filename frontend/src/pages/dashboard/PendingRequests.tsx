import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { IRequest } from "@/redux/features/requests/requests.api";
import {
    useGetAdminRequestsQuery,
    useUpdateRequestStatusMutation,
} from "@/redux/features/requests/requests.api";
import { useDeleteRequestRespondMutation } from "@/redux/features/requests/requests.api";
import { Button } from "@/components/ui/button";

export default function PendingRequests() {
    const { data } = useGetAdminRequestsQuery();
    const [updateStatus, { isLoading: isUpdating }] =
        useUpdateRequestStatusMutation();
    const [deleteRespond, { isLoading: isDeleting }] =
        useDeleteRequestRespondMutation();

    // Normalize the response to an array to avoid runtime errors.
    // Backend responses may be shaped like:
    // { data: { data: [ ... ], meta: {...} } }
    // or { data: [ ... ] } or directly [ ... ] or { data: { items: [...] } }
    const raw: unknown = data;
    let requests: IRequest[] = [];

    const tryArray = (v: unknown): IRequest[] | null => {
        if (Array.isArray(v)) return v as IRequest[];
        return null;
    };

    if (!raw) {
        requests = [];
    } else {
        // try common shapes in order of likelihood
        const obj = raw as unknown as { [k: string]: unknown };

        if (tryArray(raw)) {
            requests = tryArray(raw) as IRequest[];
        } else if (tryArray(obj.data)) {
            requests = tryArray(obj.data) as IRequest[];
        } else if (obj.data && typeof obj.data === "object") {
            const inner = obj.data as { [k: string]: unknown };
            if (tryArray(inner.data))
                requests = tryArray(inner.data) as IRequest[];
            else if (tryArray(inner.items))
                requests = tryArray(inner.items) as IRequest[];
            else if (tryArray(inner.docs))
                requests = tryArray(inner.docs) as IRequest[];
        }

        // fallback: scan top-level properties for the first array
        if (requests.length === 0) {
            let found: IRequest[] | null = null;
            if (obj && typeof obj === "object") {
                for (const k of Object.keys(obj)) {
                    const v = obj[k];
                    if (Array.isArray(v)) {
                        found = v as IRequest[];
                        break;
                    }
                }
            }
            if (found) requests = found;
            else {
                console.warn(
                    "PendingRequests: unexpected response shape, could not extract array",
                    data
                );
                requests = [];
            }
        }
    }
    const approve = async (id: string) => {
        try {
            await updateStatus({
                requestId: id,
                status: "APPROVED",
            }).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    const remove = async (id: string) => {
        try {
            await deleteRespond({ requestId: id }).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Pending Requests</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Blood Group</TableHead>
                        <TableHead>Units</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((r: IRequest) => (
                        <TableRow key={r._id}>
                            <TableCell>{r.patientName}</TableCell>
                            <TableCell>{r.bloodGroup}</TableCell>
                            <TableCell>{r.unitsNeeded}</TableCell>
                            <TableCell>{r.hospitalCity}</TableCell>
                            <TableCell>{r.status ?? "PENDING"}</TableCell>
                            <TableCell align="right">
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        size="sm"
                                        onClick={() => approve(r._id)}
                                        disabled={isUpdating}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => remove(r._id)}
                                        disabled={isDeleting}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
