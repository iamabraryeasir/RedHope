import DonorCard from "@/components/modules/donors-page/DonorCard";
import { Button } from "@/components/ui/button";
import { useGetDonorsQuery } from "@/redux/features/donor/donor.api";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DonorsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodGroup, setBloodGroup] = useState<string>("all");
  const [district, setDistrict] = useState<string>("all");
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    setPage(1);
  }, [limit, searchTerm, bloodGroup, district, sort]);

  const queryParams = {
    page,
    limit,
    searchTerm: searchTerm || undefined,
    bloodGroup: bloodGroup !== "all" ? bloodGroup : undefined,
    district: district !== "all" ? district : undefined,
    sort: sort !== "default" ? sort : undefined,
    fields: "",
  };

  const { data: donorsData, isLoading } = useGetDonorsQuery(queryParams);

  return (
    <section className=" py-5  mx-5 sm:max-w-2xl lg:max-w-7xl sm:mx-auto lg:mx-auto ">
      <div className="w-full flex flex-col sm:flex-row gap-5 items-center justify-between">
        <div>
          <h1 className="font-semibold text-3xl">Find A Donor</h1>
          <p>Connect with available blood donors in your area</p>
        </div>

        <div>
          <Link to="/signup">
            <Button className="cursor-pointer  bg-gradient-to-br from-[#570C0C] via-[#932A2A] to-[#000000] rounded-3xl h-13 w-48 ">
              <Plus />
              Become a Donor
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <Input
          placeholder="Search donors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs w-full"
        />

        <Select value={bloodGroup} onValueChange={(val) => setBloodGroup(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Blood Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
          </SelectContent>
        </Select>

        <Select value={district} onValueChange={(val) => setDistrict(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            <SelectItem value="Dhaka">Dhaka</SelectItem>
            <SelectItem value="Chittagong">Chittagong</SelectItem>
            <SelectItem value="Rajshahi">Rajshahi</SelectItem>
            <SelectItem value="Khulna">Khulna</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(val) => setSort(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={String(limit)}
          onValueChange={(val) => setLimit(Number(val))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Results per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : (
        <>
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donorsData?.data?.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {page} of {donorsData?.meta?.totalPage || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === donorsData?.meta?.totalPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
