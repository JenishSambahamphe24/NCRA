import { type Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RowAction {
  label: string;
  onClick?: () => void;
  subActions?: RowAction[];
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  actions: RowAction[];
}

export default function DataTableRowActions<TData>({ actions }: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actions?.map(({ label, onClick, subActions }) => {
          if (subActions) {
            return (
              <DropdownMenuSub key={label}>
                <DropdownMenuSubTrigger>{label}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {subActions?.map(({ label, onClick }) => (
                    <DropdownMenuItem key={label} onClick={() => onClick?.()}>
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          }
          return (
            <DropdownMenuItem key={label} onClick={() => onClick?.()}>
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
