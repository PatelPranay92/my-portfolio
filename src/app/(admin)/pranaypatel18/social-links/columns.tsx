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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toggleSocialLinkStatus, deleteSocialLink } from "@/actions/social.actions";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type SocialLinkColumn = {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
};

export const socialLinkColumns: ColumnDef<SocialLinkColumn>[] = [
  {
    accessorKey: "platform",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-slate-800 hover:text-white -ml-4"
        >
          Platform
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <a 
        href={row.getValue("url")} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline max-w-[250px] truncate block"
      >
        {row.getValue("url")}
      </a>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: function Cell({ row }) {
      const [isPending, setIsPending] = useState(false);
      const isActive = row.getValue("isActive") as boolean;
      const router = useRouter();

      const handleToggle = async (checked: boolean) => {
        setIsPending(true);
        const res = await toggleSocialLinkStatus(row.original.id, checked);
        if (res.success) {
          toast.success("Link status updated");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to update status");
        }
        setIsPending(false);
      };

      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={handleToggle}
            disabled={isPending}
          />
          <span className={`text-xs ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
            {isActive ? 'Active' : 'Disabled'}
          </span>
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
      const link = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${link.platform}?`)) return;
        const res = await deleteSocialLink(link.id);
        if (res.success) {
          toast.success("Link deleted successfully");
          router.refresh();
        } else {
          toast.error(res.error || "Failed to delete link");
        }
      };

      return (
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => router.push(`/pranaypatel18/social-links/${link.id}`)}
            title="Edit Social Link"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/50"
            onClick={handleDelete}
            title="Delete Social Link"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
