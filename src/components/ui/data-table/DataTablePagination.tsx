import { type Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  type?: "simple" | "paginated";
  hideRowSelection?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export default function DataTablePagination<TData>({
  table,
  type = "simple",
  hideRowSelection = false,
  pageNumber,
  pageSize,
  totalRecords,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  if (type === "simple") {
    return (
      <div className="flex items-center justify-center space-x-10 py-4">
        <Button
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft /> Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <ChevronRight />
        </Button>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {!hideRowSelection &&
          `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              onPageSizeChange?.(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50, 100].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageNumber} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => onPageChange?.(1)}
            disabled={!(pageNumber && pageNumber > 1)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange?.((pageNumber || 1) - 1)}
            disabled={!(pageNumber && pageNumber > 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => onPageChange?.((pageNumber || 1) + 1)}
            disabled={!(pageNumber && totalPages && pageNumber < totalPages)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => onPageChange?.(totalPages || 1)}
            disabled={!(pageNumber && totalPages && pageNumber < totalPages)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
