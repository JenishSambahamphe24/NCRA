"use client";
import { type ComponentProps, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type Table as RTable,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/typography";

import DataTableColumnHeader from "./DataTableColumnHeader";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import DataTablePagination from "./DataTablePagination";
import DataTableRowActions from "./DataTableRowActions";
import DataTableViewOptions from "./DataTableViewOptions";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getfilterComponent?: (table: RTable<TData>) => React.ReactElement;
  showColumnSelection?: boolean;
  paginationType?: ComponentProps<typeof DataTablePagination>["type"] | false;
  onRowClick?: (rowdata: TData) => void;
  pageSize?: number;
  hideRowSelectionOnPagination?: boolean;
  isLoading?: boolean;
  pageNumber?: number;
  totalRecords?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  emptyComponent?: React.ReactElement;
  classNames?: {
    table?: string;
    tableHead?: string;
    tableBody?: string;
    tableRow?: string;
    tableCell?: string;
    tableHeadCell?: string;
  };
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  getfilterComponent,
  showColumnSelection = false,
  paginationType = "simple",
  onRowClick,
  pageSize = 5,
  hideRowSelectionOnPagination,
  isLoading = false,
  pageNumber,
  totalRecords,
  totalPages,
  onPageChange,
  onPageSizeChange,
  emptyComponent = <Typography variant="pSemibold">No results.</Typography>,
  classNames,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: pageSize,
        pageIndex: pageNumber ? pageNumber - 1 : 0,
      },
    },
    state: {
      sorting,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    manualPagination: true,
    pageCount: totalPages,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater(table.getState().pagination);
        onPageChange?.(newPagination.pageIndex + 1);
        onPageSizeChange?.(newPagination.pageSize);
      } else {
        onPageChange?.(updater.pageIndex + 1);
        onPageSizeChange?.(updater.pageSize);
      }
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div>
      {(getfilterComponent || showColumnSelection) && (
        <div className="flex items-center py-4">
          {getfilterComponent?.(table)}
          {showColumnSelection && <DataTableViewOptions table={table} />}
        </div>
      )}
      <div className="rounded-md border">
        <Table className={cn(classNames?.table)}>
          <TableHeader className={cn(classNames?.tableHead)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn(classNames?.tableRow)}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-16 w-[172px] p-4 text-sm text-[#374151]",
                        classNames?.tableHeadCell,
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={cn(classNames?.tableBody)}>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    classNames?.tableRow,
                    onRowClick && "hover:cursor-pointer",
                  )}
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(classNames?.tableCell, "whitespace-nowrap")}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                {!isLoading ? (
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {emptyComponent}
                  </TableCell>
                ) : (
                  <TableCell
                    colSpan={columns.length}
                    className="h-28 text-center"
                  >
                    <div className="mx-auto flex items-center justify-center gap-1">
                      <Loader className="size-12 animate-spin" />
                      <Typography className="text-xs text-neutral-400">
                        Loading...
                      </Typography>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginationType && (
        <DataTablePagination
          table={table}
          type={paginationType}
          hideRowSelection={hideRowSelectionOnPagination}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalRecords={totalRecords}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}

export {
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableRowActions,
  DataTableViewOptions,
};
