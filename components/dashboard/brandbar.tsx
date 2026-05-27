"use client";

import { useState } from "react";
import { Bell, Search, Settings, Leaf, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const sectors = [
  { id: "all", label: "All", active: true },
  { id: "hydrogen", label: "Hydrogen", color: "bg-[#a3e635]" },
  { id: "electrification", label: "Electrification", color: "bg-[#f59e0b]" },
  { id: "smr", label: "SMR · future", color: "bg-[#6e7a70]", disabled: true },
];

export function Brandbar() {
  const [activeSector, setActiveSector] = useState("all");

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

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#0f1311] border border-[#232a25] rounded-lg px-3 py-1.5 w-[280px] ml-4">
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Sectors Toggle */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-[#6e7a70] text-xs">
          <Filter className="h-3.5 w-3.5" />
          <span>Sectors</span>
        </div>
        <div className="flex items-center gap-1">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => !sector.disabled && setActiveSector(sector.id)}
              disabled={sector.disabled}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                activeSector === sector.id
                  ? "bg-[#a3e635]/20 text-[#a3e635] border border-[#a3e635]/30"
                  : sector.disabled
                  ? "text-[#4a524c] cursor-not-allowed"
                  : "text-[#6e7a70] hover:text-[#e8efe9] hover:bg-[#1a1f1c]"
              )}
            >
              {sector.color && (
                <span className={cn("w-2 h-2 rounded-full", sector.color)} />
              )}
              {sector.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-4">
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
        
        {/* New Action Button */}
        <Button className="ml-2 h-8 bg-[#0f1311] border border-[#232a25] text-[#e8efe9] hover:bg-[#1a1f1c] text-xs font-medium">
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          New Action
        </Button>
      </div>
    </header>
  );
}
