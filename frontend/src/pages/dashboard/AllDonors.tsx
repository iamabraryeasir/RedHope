import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useGetDonorsQuery } from "@/redux/features/donor/donor.api";
import type { IDonor } from "@/types/donors.types";
import QuickViewTable from "@/components/modules/dashboard/QuickViewTable";
import { Link } from "react-router";

export default function AllDonors() {
  // Filters + pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodGroup, setBloodGroup] = useState<string>("all");
  const [district, setDistrict] = useState<string>("all");
  const [sort, setSort] = useState<string>("");

  // Reset to page 1 whenever limit/filter changes
  useEffect(() => {
    setPage(1);
  }, [limit, bloodGroup, district, sort, searchTerm]);

  // Build query params for API
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
    <section className="px-5 space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <Input
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[200px]"
        />

        {/* Blood Group */}
        <Select onValueChange={(val) => setBloodGroup(val)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Blood Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
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

        {/* District */}
        <Select onValueChange={(val) => setDistrict(val)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem> {/* was "" before */}
            <SelectItem value="Dhaka">Dhaka</SelectItem>
            <SelectItem value="Chittagong">Chittagong</SelectItem>
            <SelectItem value="Khulna">Khulna</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select onValueChange={(val) => setSort(val)} defaultValue="default">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>{" "}
            {/* was "" before */}
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="-name">Name (Desc)</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="-email">Email (Desc)</SelectItem>
          </SelectContent>
        </Select>

        {/* Limit */}
        <Select
          onValueChange={(val) => setLimit(Number(val))}
          defaultValue={String(limit)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Results per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableCaption>List of all registered donors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donorsData?.data?.map((donor: IDonor) => (
              <TableRow key={donor._id}>
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.bloodGroup}</TableCell>
                <TableCell>{donor.gender}</TableCell>
                <TableCell>{donor.city}</TableCell>
                <TableCell>{donor.availabilityStatus}</TableCell>
                <TableCell>{donor.isVerified ? "Yes" : "No"}</TableCell>
                <TableCell align="right">
                  <QuickViewTable donor={donor} />
                  <Link to={`/admin/donors/${donor._id}`}>
                    <Button variant="default" size="sm" className="ml-2">
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-3">
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
    </section>
  );
}
