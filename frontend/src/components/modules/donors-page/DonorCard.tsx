import { useState } from "react";
import type { IDonor } from "@/types/donors.types";
import { CalendarHeart, MapPin, MessageCircleMore } from "lucide-react";
import ContactInfoDialog from "./ContactInfoDialog";

export default function DonorCard({ donor }: { donor: Partial<IDonor> }) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  console.log({ donor });

  return (
    <div className="group card  bg-[#F7F6F4] rounded-2xl hover:bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000c4] hover:text-white transition-all duration-300">
      {/* user name and pic */}
      <div className="info mt-5 mx-5 flex gap-6 items-center">
        <div className="text">
          <h3 className="text-[20px] leading-[160%] tracking-[1px]">
            {donor.name?.slice(0, 25)}
          </h3>
          <p className="leading-[180%] tracking-[-0.2px] mt-3">
            {donor.donationHistory}
          </p>
        </div>
      </div>

      {/* text of blood type */}
      <div className="text mt-5 mx-5">
        <h3 className="text-4xl leading-[130%] tracking-[3px] font-semibold">
          {donor.bloodGroup}
        </h3>
        <p className="leading-[180%] tracking-[-0.2px] text-[14px]">
          Blood Type
        </p>
      </div>

      {/* button */}
      <div className="button flex items-center justify-center mt-5 mx-8  text-white  rounded-4xl bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] transition-all duration-300">
        <button
          onClick={() => setIsContactDialogOpen(true)}
          className="group-hover:bg-white group-hover:text-black rounded-4xl w-64 px-5 py-3 flex items-center justify-center gap-5   transition-all duration-300"
        >
          <MessageCircleMore />
          <p className="text-base">Contact</p>
        </button>
      </div>

      <ContactInfoDialog
        isOpen={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        donorId={donor._id || ""}
        donorName={donor.name || ""}
      />

      <p className="mt-2 mx-5 text-[16px] leading-[180%] tracking-[-0.2px]">
        Person details
      </p>
      <div className="border-t border-dotted border-gray-400 mx-5 mt-2"></div>

      <div className="locations-info mx-5">
        <div className="location flex items-center gap-2 mt-2">
          <MapPin />
          <p className="text-[12px] leading-[170%] tracking-[-0.4px]">
            {donor.city}
          </p>
        </div>
        <div className="location flex items-center gap-2 mt-2">
          <CalendarHeart />
          <p className="text-[12px] leading-[170%] tracking-[-0.4px]">
            Last donated: {donor?.donationHistory?.[-1] || "Not Given Yet"}
          </p>
        </div>
        <div className="location flex items-center gap-2 my-2 mb-5"></div>
      </div>
    </div>
  );
}
