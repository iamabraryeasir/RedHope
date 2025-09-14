import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import type { IDonor } from "@/types/donors.types";

export default function QuickViewTable({ donor }: { donor: IDonor }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Quick View
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All details about {donor.name}</DialogTitle>
          <DialogDescription asChild>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableCell>{donor.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableCell>{donor.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold">Blood Group</TableHead>
                  <TableCell>{donor.bloodGroup}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold">Gender</TableHead>
                  <TableCell>{donor.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold">Date of Birth</TableHead>
                  <TableCell>
                    {new Date(donor.dateOfBirth).toLocaleDateString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableCell>0181111112255</TableCell>
                </TableRow>

                <TableRow>
                  <TableHead className="font-semibold">District</TableHead>
                  <TableCell>{donor.district}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold">City</TableHead>
                  <TableCell>{donor.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold">Thana</TableHead>
                  <TableCell>{donor.thana}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold">
                    Available Status
                  </TableHead>
                  <TableCell>{donor.availabilityStatus}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
