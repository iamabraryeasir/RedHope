import type { IRequest } from "@/redux/features/requests/requests.api";
import { CalendarHeart, Clock, MapPin } from "lucide-react";

export default function RequestCard({
  request,
}: {
  request: Partial<IRequest>;
}) {
  return (
    <div className="group card  bg-[#F7F6F4] rounded-2xl hover:bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000c4] hover:text-white transition-all duration-300">
      <div className="info mt-5 mx-5 flex gap-6 items-center">
        <div className="text">
          <h3 className="text-[18px] leading-[160%] tracking-[1px]">
            {request.patientName}
          </h3>
          <p className="leading-[180%] tracking-[-0.2px] mt-3">
            {request.reasonOfRequest?.slice(0, 60)}
          </p>
        </div>
      </div>

      <div className="text mt-5 mx-5">
        <h3 className="text-4xl leading-[130%] tracking-[3px] font-semibold">
          {request.bloodGroup}
        </h3>
        <p className="leading-[180%] tracking-[-0.2px] text-[14px]">
          Units: {request.unitsNeeded}
        </p>
      </div>

      <div className="button flex items-center justify-center mt-5 mx-8  text-white  rounded-4xl bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] transition-all duration-300">
        <button className="group-hover:bg-white group-hover:text-black rounded-4xl w-64 px-5 py-3 flex items-center justify-center gap-5   transition-all duration-300">
          <p className="text-base">Request Details</p>
        </button>
      </div>

      <p className="mt-2 mx-5 text-[16px] leading-[180%] tracking-[-0.2px]">
        Hospital: {request.hospitalName}
      </p>
      <div className="border-t border-dotted border-gray-400 mx-5 mt-2"></div>

      <div className="locations-info mx-5">
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
