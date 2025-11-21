import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IRequest } from "@/redux/features/requests/requests.api";
import { Phone, Building2, AlertCircle, Droplet, User } from "lucide-react";

interface RequestDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  request: Partial<IRequest>;
}

export default function RequestDetailsDialog({
  isOpen,
  onOpenChange,
  request,
}: RequestDetailsDialogProps) {
  const getUrgencyColor = (urgency?: string) => {
    switch (urgency?.toUpperCase()) {
      case "EMERGENCY":
        return "text-red-600 bg-red-50";
      case "HIGH":
        return "text-orange-600 bg-orange-50";
      case "NORMAL":
        return "text-blue-600 bg-blue-50";
      case "LOW":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient & Blood Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" />
                <p className="text-sm font-medium">Patient Name</p>
              </div>
              <p className="text-lg font-semibold">{request.patientName}</p>
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Droplet className="h-4 w-4" />
                <p className="text-sm font-medium">Blood Group</p>
              </div>
              <p className="text-lg font-semibold text-red-600">
                {request.bloodGroup}
              </p>
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-gray-600">Units Needed</p>
              <p className="text-lg font-semibold">{request.unitsNeeded}</p>
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm font-medium">Urgency</p>
              </div>
              <p
                className={`text-lg font-semibold rounded px-2 py-1 w-fit ${getUrgencyColor(
                  request.urgency
                )}`}
              >
                {request.urgency}
              </p>
            </div>
          </div>

          {/* Reason */}
          <div className="border rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-gray-600">Reason</p>
            <p className="text-base">{request.reasonOfRequest}</p>
          </div>

          {/* Hospital Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Hospital Information
            </h3>
            <div className="border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Hospital Name
                  </p>
                  <p className="text-base font-semibold mt-1">
                    {request.hospitalName}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">District</p>
                  <p className="text-base font-semibold mt-1">
                    {request.hospitalDistrict}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">City</p>
                  <p className="text-base font-semibold mt-1">
                    {request.hospitalCity}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <p className="text-base font-semibold mt-1">
                    {request.hospitalAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Primary Phone
                  </p>
                  <a
                    href={`tel:${request.contactPhone}`}
                    className="text-base font-semibold text-blue-600 hover:underline mt-1"
                  >
                    {request.contactPhone}
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Alternate Phone
                  </p>
                  <a
                    href={`tel:${request.altContactPhone}`}
                    className="text-base font-semibold text-blue-600 hover:underline mt-1"
                  >
                    {request.altContactPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
