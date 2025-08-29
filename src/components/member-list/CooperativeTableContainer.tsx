import React, { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

import { CooperativeTable } from "./CooperativeTable";
import { useManageFinancialCooperativeList } from "../../hooks/useCooperativeList";
import { TCooperative } from "../../types/cooperative-list.type";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CooperativeTableContainer: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, error } = useManageFinancialCooperativeList(
    pageNumber,
    pageSize,
  );

  const cooperatives: TCooperative[] = data?.data || [];
  const filteredCooperatives = cooperatives.filter((coop) => {
    if (filter === "all") return true;
    return coop.status === filter;
  });

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPageNumber(1);
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <Typography variant="h3" className="mb-2">
            Loading cooperatives...
          </Typography>
          <Typography variant="p" className="text-gray-500">
            Please wait while we fetch the data
          </Typography>
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
          <Typography variant="h3" className="mb-2">
            Error loading data
          </Typography>
          <Typography variant="p" className="mb-4 text-gray-500">
            {error?.message}
          </Typography>
          <Button
            onClick={() => setPageNumber(1)} // Simple retry by re-fetching first page
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Typography
              variant="p"
              className="p-2 rounded-md bg-[#022b69] text-white w-[700px] mx-auto text-center"
            >
              List of financial cooperatives registered in the system
            </Typography>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="bg-white rounded-lg shadow">
          {/* Filters and Controls */}
          <div className="p-4 border-b">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === "all" ? "default" : "secondary"}
                  onClick={() => setFilter("all")}
                  className={cn(
                    filter === "all" && "bg-blue-100 !text-blue-700",
                  )}
                >
                  All ({data?.totalRecords || 0})
                </Button>
                <Button
                  variant={filter === "registration" ? "default" : "secondary"}
                  onClick={() => setFilter("registration")}
                  className={cn(
                    filter === "registration" &&
                    "bg-yellow-100 !text-yellow-700",
                  )}
                >
                  Pending (
                  {
                    cooperatives.filter((c) => c.status === "registration")
                      .length
                  }
                  )
                </Button>
                <Button
                  variant={filter === "verified" ? "default" : "secondary"}
                  onClick={() => setFilter("verified")}
                  className={cn(
                    filter === "verified" && "bg-green-100 !text-green-700",
                  )}
                >
                  Verified (
                  {cooperatives.filter((c) => c.status === "verified").length})
                </Button>
                <Button
                  variant={filter === "unverified" ? "default" : "secondary"}
                  onClick={() => setFilter("unverified")}
                  className={cn(
                    filter === "unverified" && "bg-red-100 !text-red-700",
                  )}
                >
                  Unverified (
                  {cooperatives.filter((c) => c.status === "unverified").length}
                  )
                </Button>
              </div>
            </div>
          </div>

          <CooperativeTable
            data={filteredCooperatives}
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalRecords={data?.totalRecords || 0}
            totalPages={data?.totalPages || 0}
            onPageChange={setPageNumber}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CooperativeTableContainer;
