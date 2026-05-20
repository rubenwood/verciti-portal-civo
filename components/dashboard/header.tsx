"use client";

import { Bell, Settings, Download, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LearningPathwayModal } from "./learning-pathway-modal";
import { IntegrationsModal } from "./integrations-modal";
import { cn } from "@/lib/utils";

export type TabId = 
  | "mission-control" 
  | "supply-chain" 
  | "action-queue" 
  | "workforce" 
  | "skills-map"
  | "readiness-rules"
  | "assurance"
  | "verification";

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string }[] = [
  { id: "mission-control", label: "Mission Control" },
  { id: "supply-chain", label: "Supply Chain" },
  { id: "action-queue", label: "Action Queue" },
  { id: "workforce", label: "Workforce" },
  { id: "readiness-rules", label: "Readiness Rules" },
  { id: "verification", label: "Verification" },
  { id: "assurance", label: "Assurance Pack" },
  { id: "skills-map", label: "Skills Map" },
];

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
            <h1 className="text-base font-semibold text-foreground">TRACE</h1>
            <p className="text-xs text-muted-foreground">Workforce Readiness Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <IntegrationsModal />
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
      <div className="flex items-center gap-1 px-6 pb-0 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
