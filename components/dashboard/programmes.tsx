"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Filter, 
  Plus, 
  ChevronRight,
} from "lucide-react";

type ProgrammeStatus = "ready" | "at-risk" | "blocked" | "future-pathway";
type Sector = "hydrogen" | "electrification" | "advanced-nuclear" | "wind" | "solar";

interface Programme {
  id: string;
  name: string;
  subtitle?: string;
  sector: Sector;
  region: string;
  readiness: number | null;
  status: ProgrammeStatus;
  mobilisation: string;
}

const programmes: Programme[] = [
  {
    id: "p1",
    name: "Hydrogen Safety Deployment",
    sector: "hydrogen",
    region: "North West",
    readiness: 72,
    status: "at-risk",
    mobilisation: "Q3 2026",
  },
  {
    id: "p2",
    name: "EV Infrastructure Readiness",
    sector: "electrification",
    region: "Greater Manchester",
    readiness: 64,
    status: "at-risk",
    mobilisation: "Q4 2026",
  },
  {
    id: "p3",
    name: "High-Voltage Maintenance Pipeline",
    sector: "electrification",
    region: "UK Regional",
    readiness: 58,
    status: "blocked",
    mobilisation: "Q1 2027",
  },
  {
    id: "p4",
    name: "Hydrogen Distribution Pilot",
    sector: "hydrogen",
    region: "Merseyside",
    readiness: 81,
    status: "ready",
    mobilisation: "Q2 2026",
  },
  {
    id: "p5",
    name: "SMR Workforce Readiness",
    subtitle: "Illustrative future pathway",
    sector: "advanced-nuclear",
    region: "Illustrative",
    readiness: null,
    status: "future-pathway",
    mobilisation: "Future pathway",
  },
];

const sectorConfig: Record<Sector, { label: string; color: string }> = {
  hydrogen: { label: "Hydrogen", color: "bg-[#a3ff3c]" },
  electrification: { label: "Electrification", color: "bg-purple-500" },
  "advanced-nuclear": { label: "Advanced Nuclear / SMR", color: "bg-gray-500" },
  wind: { label: "Wind", color: "bg-cyan-500" },
  solar: { label: "Solar", color: "bg-yellow-500" },
};

const statusConfig: Record<ProgrammeStatus, { label: string; className: string }> = {
  ready: { 
    label: "Ready", 
    className: "bg-success/20 text-success border-success/30" 
  },
  "at-risk": { 
    label: "At Risk", 
    className: "bg-warning/20 text-warning border-warning/30" 
  },
  blocked: { 
    label: "Blocked", 
    className: "bg-destructive/20 text-destructive border-destructive/30" 
  },
  "future-pathway": { 
    label: "Future Pathway", 
    className: "bg-transparent text-pink-400 border-pink-400/50" 
  },
};

function getReadinessColor(readiness: number | null): string {
  if (readiness === null) return "bg-muted";
  if (readiness >= 75) return "bg-success";
  if (readiness >= 60) return "bg-warning";
  return "bg-destructive";
}

export function Programmes() {
  const [selectedProgramme, setSelectedProgramme] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Programmes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Deployment programmes across active sectors. Click any to inspect role gaps, evidence coverage and mobilisation risk.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-border">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="gap-2 bg-[#a3ff3c] text-[#0a0d0c] hover:bg-[#a3ff3c]/90">
            <Plus className="h-4 w-4" />
            New programme
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-xs font-normal text-muted-foreground">Programme</th>
              <th className="text-left py-3 px-4 text-xs font-normal text-muted-foreground">Sector</th>
              <th className="text-left py-3 px-4 text-xs font-normal text-muted-foreground">Region</th>
              <th className="text-left py-3 px-4 text-xs font-normal text-muted-foreground">Readiness</th>
              <th className="text-left py-3 px-4 text-xs font-normal text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-xs font-normal text-muted-foreground">Mobilisation</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {programmes.map((programme) => {
              const sector = sectorConfig[programme.sector];
              const status = statusConfig[programme.status];
              
              return (
                <tr 
                  key={programme.id}
                  onClick={() => setSelectedProgramme(programme.id)}
                  className={cn(
                    "border-b border-border/50 last:border-0 cursor-pointer transition-colors",
                    selectedProgramme === programme.id 
                      ? "bg-muted/50" 
                      : "hover:bg-muted/30"
                  )}
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-sm text-foreground">{programme.name}</p>
                      {programme.subtitle && (
                        <p className="text-xs text-[#a3ff3c] mt-0.5">{programme.subtitle}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2.5 w-2.5 rounded-full", sector.color)} />
                      <span className="text-sm text-foreground">{sector.label}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">{programme.region}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3 min-w-[140px]">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        {programme.readiness !== null && (
                          <div 
                            className={cn("h-full rounded-full", getReadinessColor(programme.readiness))}
                            style={{ width: `${programme.readiness}%` }}
                          />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground w-10 text-right">
                        {programme.readiness !== null ? `${programme.readiness}%` : "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                      status.className
                    )}>
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        programme.status === "ready" && "bg-success",
                        programme.status === "at-risk" && "bg-warning",
                        programme.status === "blocked" && "bg-destructive",
                        programme.status === "future-pathway" && "bg-pink-400"
                      )} />
                      {status.label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">{programme.mobilisation}</span>
                  </td>
                  <td className="py-4 px-4">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
