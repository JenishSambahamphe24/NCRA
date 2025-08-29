import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { TCooperative } from "../../types/cooperative-list.type";
import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { capitalizeFirstLetter } from "@/utils/string.util";

interface CooperativeTableProps {
  data: TCooperative[];
  isLoading?: boolean;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const getStatusColor = (status: TCooperative["status"]) => {
  switch (status) {
    case "verified":
      return "bg-green-100 text-green-800";
    case "registration":
      return "bg-yellow-100 text-yellow-800";
    case "unverified":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: TCooperative["status"]) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="w-4 h-4" />;
    case "registration":
      return <Clock className="w-4 h-4" />;
    case "unverified":
      return <XCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

export const CooperativeTable: React.FC<CooperativeTableProps> = ({
  data,
  isLoading,
  pageNumber,
  pageSize,
  totalRecords,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = (cooperative: TCooperative) => {
    const coopId = cooperative.coopId;
    navigate({
      to: `/cooperative-verification/$id`,
      params: { id: coopId?.toString() },
    });
  };

  const columns: ColumnDef<TCooperative>[] = [
    {
      header: "S.No.",
      cell: ({ row }) => (
        <Typography variant="body">
          {(pageNumber - 1) * pageSize + row.index + 1}
        </Typography>
      ),
    },
    {
      accessorKey: "coopName",
      header: "Cooperative Name",
      cell: ({ row }) => {
        const coopName: string = row.getValue("coopName");
        const address: string = row?.original?.address || "";
        const district: string = row?.original?.district || "";
        const province: string = row?.original?.province || "";
        return (
          <div className="flex flex-col">
            <Typography variant="body">{coopName}</Typography>
            <Typography variant="detail">
              {`${address}, ${district}, ${province}`}
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
      accessorKey: "type",
      header: "Cooperative Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: TCooperative["status"] = row.getValue("status");
        return (
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${getStatusColor(status)}`}
          >
            {getStatusIcon(status)}
            <Typography variant="detailMedium">
              {status === "registration"
                ? "Pending"
                : capitalizeFirstLetter(status)}
            </Typography>
          </div>
        );
      },
    },
    {
      accessorKey: "submittedDate",
      header: "Submitted Date",
    },
    {
      header: "Members",
      cell: ({ row }) => {
        const maleMembers = row.original?.male;
        const femaleMembers = row.original?.female;
        const otherMembers = row.original?.others;
        const totalMembers = row.original?.total;
        return (
          <div className="flex flex-col gap-1">
            <Typography variant="body">{`Total: ${totalMembers}`}</Typography>
            <Typography variant="detailMedium">
              {`M: ${maleMembers} | F: ${femaleMembers} | O: ${otherMembers}`}
            </Typography>
          </div>
        );
      },
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
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      paginationType="paginated"
      pageSize={pageSize}
      pageNumber={pageNumber}
      totalRecords={totalRecords}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      hideRowSelectionOnPagination
      emptyComponent={emptyComponent}
      classNames={{
        tableHead: "bg-primary",
        tableHeadCell: "text-white border",
        tableCell: "border",
      }}
    />
  );
};
