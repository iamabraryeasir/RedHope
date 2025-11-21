import { useState } from "react";
import { Phone, Copy, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetDonorContactQuery } from "@/redux/features/donor/donor.api";

interface ContactInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  donorId: string;
  donorName: string;
}

export default function ContactInfoDialog({
  isOpen,
  onOpenChange,
  donorId,
  donorName,
}: ContactInfoDialogProps) {
  const [copied, setCopied] = useState(false);
  const { data, isLoading, error } = useGetDonorContactQuery(donorId, {
    skip: !isOpen,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const phoneNumber = data?.data;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Donor Name */}
          <div>
            <p className="text-sm font-medium text-gray-600">Donor Name</p>
            <p className="text-base font-semibold text-gray-900 mt-1">
              {donorName}
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <p className="text-sm font-medium text-gray-600">Phone Number</p>
            {isLoading ? (
              <div className="mt-2 h-10 bg-gray-200 rounded-lg animate-pulse" />
            ) : error ? (
              <p className="text-red-500 mt-1 text-sm">
                Failed to load contact information
              </p>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex-1 px-4 py-2 bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  {phoneNumber}
                </a>
                <button
                  onClick={() => handleCopy(phoneNumber || "")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
