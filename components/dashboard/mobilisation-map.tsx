"use client";

import { useState } from "react";
import { 
  AlertTriangle, 
  ChevronDown, 
  Download, 
  X,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Users,
  UserCheck,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SkillsMap } from "./skills-map";

type MapOverlay = "projects" | "supplier" | "role-gaps" | "evidence";

const kpiData = [
  { 
    label: "Active Project Sites", 
    value: "7", 
    subtitle: "Portfolio view",
    icon: MapPin,
    color: "text-[#e8efe9]"
  },
  { 
    label: "Ready / Low Risk", 
    value: "2", 
    subtitle: "29% of sites",
    icon: CheckCircle2,
    color: "text-success"
  },
  { 
    label: "Conditional / Medium Risk", 
    value: "3", 
    subtitle: "43% of sites",
    icon: AlertCircle,
    color: "text-warning"
  },
  { 
    label: "High Risk", 
    value: "2", 
    subtitle: "28% of sites",
    icon: XCircle,
    color: "text-destructive"
  },
  { 
    label: "Workers Required", 
    value: "1,240", 
    subtitle: "Across active sites",
    icon: Users,
    color: "text-[#e8efe9]"
  },
  { 
    label: "Deployment-ready Workers", 
    value: "684", 
    subtitle: "55% coverage",
    icon: UserCheck,
    color: "text-success"
  },
  { 
    label: "Critical Blockers", 
    value: "18", 
    subtitle: "Affecting mobilisation",
    icon: ShieldAlert,
    color: "text-destructive"
  },
];

const filters = [
  { label: "Region", value: "All Regions" },
  { label: "Sector", value: "All Sectors" },
  { label: "Risk Level", value: "All" },
  { label: "Project Type", value: "All" },
  { label: "Mobilisation Window", value: "Next 90 Days" },
  { label: "Deployment Phase", value: "All" },
];

const overlayTabs: { id: MapOverlay; label: string }[] = [
  { id: "projects", label: "Projects Readiness" },
  { id: "supplier", label: "Supplier Readiness" },
  { id: "role-gaps", label: "Role Gaps" },
  { id: "evidence", label: "Evidence Risk" },
];

export function MobilisationMap() {
  const [activeOverlay, setActiveOverlay] = useState<MapOverlay>("projects");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8efe9] mb-1">Mobilisation Map</h1>
          <p className="text-sm text-[#6e7a70] mb-3">
            Portfolio-level view of workforce readiness, supplier assurance and deployment risk across project sites.
          </p>
          
          {/* Info Banner */}
          <div className="flex items-start gap-2 text-xs text-warning bg-warning/5 border border-warning/20 rounded-lg px-3 py-2 max-w-3xl">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              This map shows readiness risk by project site based on role coverage, verified evidence, expiry risk, supplier readiness and deployment timelines.
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            TRACE Workspace
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button className="h-8 px-3 text-sm bg-primary text-primary-foreground">
            <Download className="mr-2 h-4 w-4" />
            Export / Report
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-7 gap-3">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={i} 
              className="bg-card/30 border border-border/50 rounded-lg p-3"
            >
              <div className="flex items-center gap-2 text-xs text-[#6e7a70] mb-1">
                <Icon className={cn("h-3.5 w-3.5", kpi.color)} />
                <span>{kpi.label}</span>
              </div>
              <div className={cn("text-2xl font-semibold", kpi.color)}>{kpi.value}</div>
              <div className="text-xs text-[#6e7a70]">{kpi.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((filter, i) => (
          <Button 
            key={i}
            variant="outline" 
            className="h-8 px-3 text-sm border-border/50 bg-card/30 text-[#e8efe9]"
          >
            <span className="text-[#6e7a70] mr-1">{filter.label}:</span>
            {filter.value}
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        ))}
        <Button 
          variant="ghost" 
          className="h-8 px-3 text-sm text-[#6e7a70] hover:text-[#e8efe9]"
        >
          <X className="mr-1 h-3 w-3" />
          Clear Filters
        </Button>
      </div>

      {/* Map Overlay Tabs */}
      <div className="flex items-center gap-6 border-b border-border/30 pb-0">
        <span className="text-xs text-[#6e7a70] uppercase tracking-wide">Map Overlay</span>
        <div className="flex items-center gap-1">
          {overlayTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveOverlay(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors",
                activeOverlay === tab.id
                  ? "bg-card/50 text-[#e8efe9] border border-border/50 border-b-transparent"
                  : "text-[#6e7a70] hover:text-[#e8efe9]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Component */}
      <div className="bg-card/30 border border-border/50 rounded-lg p-4">
        <SkillsMap />
      </div>
    </div>
  );
}
