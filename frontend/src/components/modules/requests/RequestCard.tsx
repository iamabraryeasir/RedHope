import { useState } from "react";
import type { IRequest } from "@/redux/features/requests/requests.api";
import { CalendarHeart, Clock, MapPin } from "lucide-react";
import RequestDetailsDialog from "./RequestDetailsDialog";

export default function RequestCard({
  request,
}: {
  request: Partial<IRequest>;
}) {
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  return (
    <div className="p-5 group card bg-[#F7F6F4] rounded-2xl hover:bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000c4] hover:text-white transition-all duration-300">
      <div className="info flex gap-6 items-center">
        <div className="text">
          <h3 className="text-[18px] leading-[160%] tracking-[1px]">
            {request.patientName}
          </h3>
          <p className="leading-[180%] tracking-[-0.2px] mt-3">
            {request.reasonOfRequest?.slice(0, 60)}
          </p>
        </div>
      </div>

      <div className="text mt-5">
        <h3 className="text-4xl leading-[130%] tracking-[3px] font-semibold">
          {request.bloodGroup}
        </h3>
        <p className="leading-[180%] tracking-[-0.2px] text-[14px]">
          Units: {request.unitsNeeded}
        </p>
      </div>

      <button
        onClick={() => setIsDetailsDialogOpen(true)}
        className="w-full mt-5 px-6 py-3 bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] text-white rounded-4xl group-hover:from-white group-hover:via-white group-hover:to-white group-hover:text-black transition-all duration-300"
      >
        Request Details
      </button>

      <RequestDetailsDialog
        isOpen={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        request={request}
      />

      <p className="mt-2 text-[16px] leading-[180%] tracking-[-0.2px]">
        Hospital: {request.hospitalName}
      </p>
      <div className="border-t border-dotted border-gray-400 mt-2"></div>

      <div className="locations-info">
        <div className="location flex items-center gap-2 mt-2">
          <MapPin />
          <p className="text-[12px] leading-[170%] tracking-[-0.4px]">
            {request.hospitalCity}
          </p>
        </div>
        <div className="location flex items-center gap-2 mt-2">
          <CalendarHeart />
          <p className="text-[12px] leading-[170%] tracking-[-0.4px]">
            Needed by:{" "}
            {request.neededBy
              ? new Date(request.neededBy).toLocaleString()
              : "-"}
          </p>
        </div>
        <div className="location flex items-center gap-2 my-2 mb-5">
          <Clock />
          <p className="text-[12px] leading-[170%] tracking-[-0.4px]">
            Urgency: {request.urgency}
          </p>
        </div>
      </div>
    </div>
  );
}
