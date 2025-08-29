import { useNavigate } from "@tanstack/react-router";

import { useCooperativeProfileList } from "@/hooks/useCooperativeProfileList";
import { TCooperative } from "@/types/cooperative-profile.type";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import {
  ArrowUpDown,
  Loader2,
  AlertCircle,
  ChevronDown,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableFacetedFilter from "@/components/ui/data-table/DataTableFacetedFilter";
import { useState } from "react";
import { Typography } from "../ui/typography";
import { Label } from "../ui/label";

const CoopProfile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useCooperativeProfileList({
    pageNumber: currentPage,
    pageSize: pageSize,
  });

  const cooperatives = data?.data || [];
  const totalRecords = data?.totalRecords || 0;
  const totalPages = data?.totalPages || 1;

  const handleViewDetails = (cooperative: TCooperative) => {
    const coopId = cooperative.coopsId;
    navigate({ to: `/cooperative-details/$id`, params: { id: coopId } });
  };

  const columns: ColumnDef<TCooperative>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      header: "S.No.",
      cell: ({ row }) => {
        return (
          <Typography variant="body">
            {(currentPage - 1) * pageSize + row.index + 1}
          </Typography>
        );
      },
    },
    {
      accessorKey: "cooperativeName",
      header: "Cooperative Name",
    },
    {
      accessorKey: "registrationNo",
      header: "Registration No",
    },
    {
      accessorKey: "province",
      header: "Province",
      // header: ({ column }) => (
      //   <DataTableFacetedFilter
      //     column={column}
      //     title="Province"
      //     options={Array.from(
      //       new Set(cooperatives.map((coop) => coop.province).filter(Boolean)),
      //     ).map((p) => ({ label: p as string, value: p as string }))}
      //   />
      // ),
      // filterFn: (row, id, value) => {
      //   return value.includes(row.getValue(id));
      // },
    },
    {
      accessorKey: "district",
      header: "District",
      // header: ({ column }) => (
      //   <DataTableFacetedFilter
      //     column={column}
      //     title="District"
      //     options={Array.from(
      //       new Set(cooperatives.map((coop) => coop.district).filter(Boolean)),
      //     ).map((d) => ({ label: d as string, value: d as string }))}
      //   />
      // ),
      // filterFn: (row, id, value) => {
      //   return value.includes(row.getValue(id));
      // },
    },
    {
      accessorKey: "localLevel",
      header: "Local Level",
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading cooperatives...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-500 mb-4">{error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
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
            <p className="text-lg p-2 rounded-md font-medium bg-[#022b69] text-white w-[700px] mx-auto text-center">
              Please find fact-sheet of verified financial cooperatives
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="bg-white rounded-lg shadow">
          {/* Table */}
          <div className="p-4">
            <DataTable
              columns={columns}
              data={cooperatives}
              getfilterComponent={(table) => (
                <div className="flex flex-wrap gap-4">
                  {table.getColumn("province") && (
                    <div className="flex flex-col gap-1">
                      <Label>Filter by Province</Label>

                      <DataTableFacetedFilter
                        column={table.getColumn("province")}
                        title="Province"
                        options={Array.from(
                          new Set(
                            cooperatives
                              .map((coop) => coop.province)
                              .filter(Boolean),
                          ),
                        ).map((p) => ({
                          label: p as string,
                          value: p as string,
                        }))}
                      />
                    </div>
                  )}
                  {table.getColumn("district") && (
                    <div className="flex flex-col gap-1">
                      <Label>Filter by District</Label>

                      <DataTableFacetedFilter
                        column={table.getColumn("district")}
                        title="District"
                        options={Array.from(
                          new Set(
                            cooperatives
                              .map((coop) => coop.district)
                              .filter(Boolean),
                          ),
                        ).map((d) => ({
                          label: d as string,
                          value: d as string,
                        }))}
                      />
                    </div>
                  )}
                </div>
              )}
              paginationType="paginated"
              pageSize={pageSize}
              pageNumber={currentPage}
              totalRecords={totalRecords}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
              onPageSizeChange={(size: number) => setPageSize(size)}
              hideRowSelectionOnPagination
              classNames={{
                tableHead: "bg-primary",
                tableHeadCell: "text-white border",
                tableCell: "border",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoopProfile;
