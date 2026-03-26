"use client";

import { Bell, Settings, Download, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LearningPathwayModal } from "./learning-pathway-modal";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeTab: "analytics" | "workforce";
  onTabChange: (tab: "analytics" | "workforce") => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="flex flex-col border-b border-border bg-background">
      {/* Top Row */}
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground">Workforce Readiness</h1>
            <p className="text-xs text-muted-foreground">Dashboard Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LearningPathwayModal />
          
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-4 text-sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a5d23] text-xs font-medium text-white">
            AD
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 px-6 pb-0">
        <button
          onClick={() => onTabChange("analytics")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors",
            activeTab === "analytics"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
          )}
        >
          App Analytics
        </button>
        <button
          onClick={() => onTabChange("workforce")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors",
            activeTab === "workforce"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
          )}
        >
          Workforce
        </button>
      </div>
    </header>
  );
}
