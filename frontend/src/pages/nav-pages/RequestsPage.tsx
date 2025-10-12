import RequestCard from "@/components/modules/requests/RequestCard";
import { useGetRequestsQuery } from "@/redux/features/requests/requests.api";
import type { IRequest } from "@/redux/features/requests/requests.api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";

export default function RequestsPage() {
    const { data } = useGetRequestsQuery();
    // normalize different possible response shapes so we always have an array
    const raw: unknown = data;
    let requests: IRequest[] = [];

    console.log({ raw });

    const tryArray = (v: unknown): IRequest[] | null => {
        if (Array.isArray(v)) return v as IRequest[];
        return null;
    };

    if (!raw) {
        requests = [];
    } else {
        const obj = raw as unknown as { [k: string]: unknown };
        if (tryArray(raw)) requests = tryArray(raw) as IRequest[];
        else if (tryArray(obj.data))
            requests = tryArray(obj.data) as IRequest[];
        else if (obj.data && typeof obj.data === "object") {
            const inner = obj.data as { [k: string]: unknown };
            if (tryArray(inner.data))
                requests = tryArray(inner.data) as IRequest[];
            else if (tryArray(inner.items))
                requests = tryArray(inner.items) as IRequest[];
            else if (tryArray(inner.docs))
                requests = tryArray(inner.docs) as IRequest[];
        }

        // fallback: try to find first array in top-level properties
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
            else requests = [];
        }
    }
    const navigate = useNavigate();

    return (
        <div className="py-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Blood Requests</h1>
                <Button
                    onClick={() => navigate("/requests/create-new-request")}
                >
                    <Plus />
                    Request For Blood
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {requests.map((r) => (
                    <RequestCard key={r._id} request={r} />
                ))}
            </div>
        </div>
    );
}
