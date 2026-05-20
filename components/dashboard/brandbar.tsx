"use client";

import { Bell, Search, Settings, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Brandbar() {
  return (
    <header className="h-14 bg-[#0a0d0c] border-b border-[#1c211e] flex items-center px-7 gap-5">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#a3ff3c] grid place-items-center">
          <Leaf className="h-4 w-4 text-[#0a0d0c]" />
        </div>
        <div>
          <div className="text-[15px] font-semibold text-[#e8efe9] tracking-tight">Verciti Trace</div>
          <div className="text-[11px] text-[#6e7a70]">Workforce Readiness Platform</div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#0f1311] border border-[#232a25] rounded-lg px-3 py-1.5 w-[280px]">
        <Search className="h-4 w-4 text-[#6e7a70]" />
        <input
          type="text"
          placeholder="Search workers, suppliers, roles..."
          className="bg-transparent border-0 outline-none text-[12px] text-[#e8efe9] placeholder:text-[#6e7a70] flex-1 font-sans"
        />
        <span className="text-[10px] text-[#6e7a70] border border-[#232a25] rounded px-1.5 py-0.5 font-mono">
          ⌘K
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#6e7a70] hover:text-[#e8efe9] hover:bg-[#131815]"
        >
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#6e7a70] hover:text-[#e8efe9] hover:bg-[#131815]"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Avatar className="h-8 w-8 border border-[#232a25]">
          <AvatarFallback className="bg-[#131815] text-[#a8b3aa] text-xs">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
