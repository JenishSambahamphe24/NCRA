import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import { useFinancialCooperativeList } from "@/hooks/useCooperativeProfile";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/reports/detail")({
  component: ReportsDetailPage,
});

function ReportsDetailPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  // Pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, error, refetch } =
    useFinancialCooperativeList({
      pageNumber,
      pageSize,
      ...(selectedDistrict && selectedDistrict !== "all"
        ? { district: selectedDistrict }
        : {}),
    });

  const totalRecords = data?.totalRecords || 0;
  const totalPages = data?.totalPages || 0;

  const cooperativesData = data?.data?.map((item, index) => ({
    id: item.id || (pageNumber - 1) * pageSize + index + 1,
    name: item.coopName || "N/A",
    code: item.cooperativeCode || "N/A",
    phone: item.phone || "N/A",
    email: item.email || "N/A",
    registrationNo: item.registrationNo || "N/A",
    status: item.status || "N/A",
    registeredDate: item.registeredDate || "N/A",
    classification: item.classification || "N/A",
    district: item.districtName || "N/A",
    province: item.provinceName || "N/A",
    localLevel: item.localLevelName || "N/A",
    address: item.addressName || "N/A",
    members: {
      male: item.maleMembers || 0,
      female: item.femaleMembers || 0,
      others: item.otherMembers || 0,
      total: item.maleMembers + item.femaleMembers + item.otherMembers || 0,
    },
    totalShare: item.totalShares || 0,
    totalShareAmount: item.totalShareAmount || 0,
    loan: item?.loan || 0,
  }));

  const handleRetry = () => {
    refetch();
  };

  const handleRowClick = (coopId) => {
    console.log(`Navigate to cooperative ${coopId}`);
    // Uncomment this line if using React Router
    // navigate(`/cooperatives/${coopId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPageNumber(1); // Reset to first page when changing page size
  };

  // Get unique districts for filter (from current page data)
  const districts = useMemo(() => {
    return [
      ...new Set(
        cooperativesData
          ?.map((coop) => coop.district)
          ?.filter((d) => d !== "N/A"),
      ),
    ].sort();
  }, [cooperativesData]);

  // Filter logic (only for current page data)
  const filteredData = useMemo(() => {
    return cooperativesData?.filter((coop) => {
      const matchesSearch =
        searchTerm === "" ||
        Object.values(coop).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          if (typeof value === "number") {
            return value.toString().includes(searchTerm);
          }
          if (typeof value === "object" && value !== null) {
            return Object.values(value).some((v) =>
              v.toString().toLowerCase().includes(searchTerm.toLowerCase()),
            );
          }
          return false;
        });

      const matchesDistrict =
        selectedDistrict === "" || coop.district === selectedDistrict;

      return matchesSearch && matchesDistrict;
    });
  }, [cooperativesData, searchTerm, selectedDistrict]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageNumber <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (pageNumber >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <Users className="h-8 w-8 text-primary mr-3" />
          <Typography variant="h2" className="text-primary">
            Financial Cooperative List
          </Typography>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
            <span className="text-gray-600">Loading data...</span>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <Typography className="text-red-600 mb-4 text-center">
              Failed to load data: {error?.message}
            </Typography>
            <Button onClick={handleRetry}>
              <RefreshCw className="h-2 w-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : (
          <div>
            {/* Search and Filter Controls */}
            <div className=" flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="w-84 pl-10"
                    // className="w-84 pl-10 pr-4 py-2 border border-gray-300 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={selectedDistrict}
                onValueChange={setSelectedDistrict}
              >
                <SelectTrigger>
                  <Filter />
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts?.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Select
                  value={pageSize?.toString()}
                  onValueChange={(value) => handlePageSizeChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="10 per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={(10)?.toString()}>
                      10 per page
                    </SelectItem>
                    <SelectItem value={(25)?.toString()}>
                      25 per page
                    </SelectItem>
                    <SelectItem value={(50)?.toString()}>
                      50 per page
                    </SelectItem>
                    <SelectItem value={(100)?.toString()}>
                      100 per page
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="secondary" onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredData?.length} of {cooperativesData?.length}{" "}
              cooperatives on this page (Total: {totalRecords})
            </div>

            {/* Table */}
            <Table className="min-w-full bg-white">
              <TableHeader>
                <TableRow className="bg-primary text-white">
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    S.No.
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-left font-semibold"
                  >
                    <div className="flex items-center">Coop. Name</div>
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    <div className="flex items-center justify-center">Code</div>
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    <div className="flex items-center justify-center">
                      Phone
                    </div>
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    <div className="flex items-center justify-center">
                      Email
                    </div>
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    Province
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    District
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    Local Level
                  </TableHead>
                  <TableHead
                    colSpan={4}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    No. of Members
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    Loan %
                  </TableHead>
                  <TableHead
                    rowSpan={2}
                    className="border text-white border-[#c2c2c2] p-3 text-center font-semibold"
                  >
                    Saving %
                  </TableHead>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableHead className="border border-[#c2c2c2] p-3 text-center font-semibold">
                    Male
                  </TableHead>
                  <TableHead className="border border-[#c2c2c2] p-3 text-center font-semibold">
                    Female
                  </TableHead>
                  <TableHead className="border border-[#c2c2c2] p-3 text-center font-semibold">
                    Others{" "}
                  </TableHead>
                  <TableHead className="border border-[#c2c2c2] p-3 text-center font-semibold">
                    Total{" "}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {filteredData?.map((coop, index) => (
                  <TableRow
                    key={coop.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100"
                    onClick={() => handleRowClick(coop.id)}
                  >
                    <TableCell className="border border-gray-200 p-3 text-center font-medium text-gray-700">
                      {(pageNumber - 1) * pageSize + index + 1}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 font-semibold text-gray-800">
                      {coop.name}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-blue-600 font-mono">
                      {coop.code}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop.phone}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-blue-600 truncate max-w-48">
                      {coop.email}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop.province}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop.district}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop.localLevel}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop?.members?.male}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center">
                      {coop?.members?.female}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop?.members?.others}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop?.members?.total}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop.loan}
                    </TableCell>
                    <TableCell className="border border-gray-200 p-3 text-center text-gray-700">
                      {coop.totalShare}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>

            {filteredData?.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Typography className="text-gray-500 text-lg">
                  No cooperatives found matching your search criteria.
                </Typography>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Page {pageNumber} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pageNumber - 1)}
                    disabled={pageNumber === 1}
                    className="flex items-center px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof page === "number"
                            ? handlePageChange(page)
                            : null
                        }
                        disabled={typeof page !== "number"}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          page === pageNumber
                            ? "bg-primary text-white"
                            : typeof page === "number"
                              ? "bg-white border border-gray-300 hover:bg-gray-50"
                              : "bg-transparent cursor-default"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
                    className="flex items-center px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
