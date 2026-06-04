"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toggleProjectFeatured, deleteProject } from "@/actions/project.actions";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type ProjectColumn = {
  id: string;
  title: string;
  category: string;
  isFeatured: boolean;
  displayOrder: number;
  updatedAt: Date;
};

export const projectColumns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-slate-800 hover:text-white -ml-4"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="border-slate-700 bg-slate-800/50">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: function Cell({ row }) {
      const [isPending, setIsPending] = useState(false);
      const isFeatured = row.getValue("isFeatured") as boolean;
      const router = useRouter();

      const handleToggle = async (checked: boolean) => {
        setIsPending(true);
        const res = await toggleProjectFeatured(row.original.id, checked);
        if (res.success) {
          toast.success("Project status updated");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to update status");
        }
        setIsPending(false);
      };

      return (
        <Switch
          checked={isFeatured}
          onCheckedChange={handleToggle}
          disabled={isPending}
        />
      );
    },
  },
  {
    accessorKey: "displayOrder",
    header: "Order",
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const project = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        const res = await deleteProject(project.id);
        if (res.success) {
          toast.success("Project deleted successfully");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to delete project");
        }
      };

      return (
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => router.push(`/pranaypatel18/projects/${project.id}`)}
            title="Edit Project"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/50"
            onClick={handleDelete}
            title="Delete Project"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
