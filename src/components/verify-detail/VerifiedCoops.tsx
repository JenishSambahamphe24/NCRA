import React, { useState } from "react";
import { Eye, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { VerifiedCooperative } from "@/types/cooperative-list.type";
import { useVerifiedCooperativeList } from "@/hooks/useVerifiedCooperativeList";

export const VerifiedCoops: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useVerifiedCooperativeList(
    currentPage,
    pageSize,
  );

  const cooperatives = data?.data || [];
  const totalRecords = data?.totalRecords || 0;
  const totalPages = data?.totalPages || 0;

  const uniqueProvinces = [
    ...new Set(cooperatives.map((coop) => coop.province)),
  ];

  const filteredCooperatives = cooperatives.filter((coop) => {
    if (filter === "all") return true;
    return coop.province.toLowerCase() === filter.toLowerCase();
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (cooperative: VerifiedCooperative) => {
    const coopId = cooperative.coopsId;
    navigate({
      to: `/cooperative-verification/$id`,
      params: { id: coopId?.toString() },
      search: () => ({ verified: "true" }),
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading verified cooperatives...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-500 mb-4">
            Failed to fetch verified cooperatives: {error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const columns: ColumnDef<VerifiedCooperative>[] = [
    {
      header: "S.No.",
      cell: ({ row }) => (
        <Typography variant="body">
          {(currentPage - 1) * pageSize + row.index + 1}
        </Typography>
      ),
    },
    {
      accessorKey: "cooperativeName",
      header: "Cooperative Name",
      cell: ({ row }) => {
        const coopName: string = row.getValue("cooperativeName");
        const province: string = row?.original?.province || "";
        const district: string = row?.original?.district || "";
        const localLevel: string = row?.original?.localLevel || "";
        return (
          <div className="flex flex-col">
            <Typography variant="body">{coopName}</Typography>
            <Typography variant="detail">
              {`${localLevel}, ${district}, ${province}`}
            </Typography>
          </div>
        );
      },
    },
    {
      accessorKey: "registrationNo",
      header: "Registration No.",
    },
    {
      accessorKey: "province",
      header: "Province",
      cell: ({ row }) => (
        <Typography variant="body" className="capitalize">
          {row.getValue("province")}
        </Typography>
      ),
    },
    {
      accessorKey: "district",
      header: "District",
      cell: ({ row }) => (
        <Typography variant="body" className="capitalize">
          {row.getValue("district")}
        </Typography>
      ),
    },
    {
      accessorKey: "localLevel",
      header: "Local Level",
      cell: ({ row }) => (
        <Typography variant="body" className="capitalize">
          {row.getValue("localLevel")}
        </Typography>
      ),
    },
    {
      accessorKey: "maleMembers",
      header: "Male Members",
    },
    {
      accessorKey: "femaleMembers",
      header: "Female Members",
    },
    {
      accessorKey: "otherMembers",
      header: "Other Members",
    },
    {
      accessorKey: "totalMembers",
      header: "Total Members",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="link"
          onClick={() => handleViewDetails(row.original)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
      ),
    },
  ];

  const emptyComponent = (
    <div className="text-center py-12">
      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <Typography variant="h3" className="mb-2">
        No cooperatives found
      </Typography>
      <Typography variant="p" className="text-gray-500">
        No cooperatives match the selected filter criteria.
      </Typography>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <p className="text-lg p-2 rounded-md font-medium bg-primary text-white w-[700px] mx-auto text-center">
              Please find the verified financial cooperatives
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="bg-white rounded-lg shadow">
          {/* Filters and Page Size Controls */}
          <div className="p-4 border-b">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Province Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "all"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All ({totalRecords})
                </button>
                {uniqueProvinces.map((province) => (
                  <button
                    key={province}
                    onClick={() => setFilter(province)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      filter.toLowerCase() === province.toLowerCase()
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {province} (
                    {
                      cooperatives.filter(
                        (c) =>
                          c.province.toLowerCase() === province.toLowerCase(),
                      ).length
                    }
                    )
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredCooperatives}
            isLoading={isLoading}
            paginationType="paginated"
            pageSize={pageSize}
            pageNumber={currentPage}
            totalRecords={totalRecords}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            hideRowSelectionOnPagination
            emptyComponent={emptyComponent}
            classNames={{
              tableHead: "bg-primary",
              tableHeadCell: "text-white border",
              tableCell: "border",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifiedCoops;
