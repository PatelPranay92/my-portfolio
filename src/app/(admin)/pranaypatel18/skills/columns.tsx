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
import { deleteSkill } from "@/actions/skill.actions";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type SkillColumn = {
  id: string;
  name: string;
  category: string;
  level: number;
  displayOrder: number;
};

export const skillColumns: ColumnDef<SkillColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-slate-800 hover:text-white -ml-4"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary" className="bg-slate-800 text-slate-300">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.getValue("level") as number;
      return (
        <div className="flex items-center gap-2 max-w-[120px]">
          <span className="text-xs w-6">{level}%</span>
          <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full" 
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
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
      const skill = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${skill.name}?`)) return;
        const res = await deleteSkill(skill.id);
        if (res.success) {
          toast.success("Skill deleted successfully");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to delete skill");
        }
      };

      return (
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => router.push(`/pranaypatel18/skills/${skill.id}`)}
            title="Edit Skill"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/50"
            onClick={handleDelete}
            title="Delete Skill"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
