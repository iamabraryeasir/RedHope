import type { IDonor } from "@/types/donors.types";

export default function DonorCard({ donor }: { donor: Partial<IDonor> }) {
  return (
    <div className="border">
      <h1>{donor.name}</h1>
      <h2>{donor.bloodGroup}</h2>
    </div>
  );
}
