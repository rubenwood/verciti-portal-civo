"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, Download, Plus, Users, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const sectors = [
  { id: "all", label: "All", active: true },
  { id: "hydrogen", label: "Hydrogen", color: "bg-[#a3e635]" },
  { id: "electrification", label: "Electrification", color: "bg-[#f59e0b]" },
  { id: "smr", label: "SMR - future", disabled: true },
];

const kpis = [
  { label: "Suppliers", value: "24", subtitle: "Across 5 tiers", icon: Users, color: "text-[#e8efe9]" },
  { label: "Workers Mapped", value: "1,024", subtitle: "From all suppliers", icon: Users, color: "text-[#e8efe9]" },
  { label: "Suppliers Ready", value: "8", subtitle: "33% of total", icon: CheckCircle2, color: "text-[#a3e635]" },
  { label: "At Risk Suppliers", value: "12", subtitle: "50% of total", icon: AlertTriangle, color: "text-[#f59e0b]" },
  { label: "Blocked Suppliers", value: "4", subtitle: "Mobilisation risk", icon: XCircle, color: "text-[#ef4444]" },
  { label: "Avg Evidence Confidence", value: "L 3.4", subtitle: "+0.3 vs 30 days", icon: TrendingUp, color: "text-[#a3e635]" },
];

const suppliers = [
  { name: "GreenVolt Ltd", tier: 1, sector: "Hydrogen / Electrification", workers: 126, readiness: 71, status: "At Risk", evidence: "L 3.7", blockers: 4 },
  { name: "Northern Power Services", tier: 1, sector: "Electrification", workers: 88, readiness: 76, status: "At Risk", evidence: "L 3.0", blockers: 3 },
  { name: "HydraGen Solutions", tier: 1, sector: "Hydrogen", workers: 64, readiness: 84, status: "Ready", evidence: "L 4.0", blockers: 1 },
  { name: "ElecPro Systems", tier: 2, sector: "Electrification", workers: 52, readiness: 69, status: "At Risk", evidence: "L 3.0", blockers: 2 },
  { name: "FieldCore Engineering", tier: 2, sector: "Cross-sector", workers: 41, readiness: 59, status: "Blocked", evidence: "L 2.0", blockers: 5 },
  { name: "Peak Engineering", tier: 2, sector: "Electrification", workers: 36, readiness: 78, status: "Ready", evidence: "L 4.0", blockers: 1 },
  { name: "Summit Workforce", tier: 2, sector: "Cross-sector", workers: 28, readiness: 64, status: "At Risk", evidence: "L 2.0", blockers: 3 },
  { name: "SafeGrid Services", tier: 2, sector: "Safety / Electrification", workers: 22, readiness: 63, status: "Evidence Required", evidence: "L 3.0", blockers: 2 },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Ready":
      return <span className="px-2 py-1 rounded text-xs font-medium bg-[#a3e635]/20 text-[#a3e635]">Ready</span>;
    case "At Risk":
      return <span className="px-2 py-1 rounded text-xs font-medium bg-[#f59e0b]/20 text-[#f59e0b]">At Risk</span>;
    case "Blocked":
      return <span className="px-2 py-1 rounded text-xs font-medium bg-[#ef4444]/20 text-[#ef4444]">Blocked</span>;
    case "Evidence Required":
      return <span className="px-2 py-1 rounded text-xs font-medium bg-[#6e7a70]/20 text-[#6e7a70]">Evidence Required</span>;
    default:
      return null;
  }
};

const getReadinessColor = (status: string) => {
  switch (status) {
    case "Ready":
      return "bg-[#a3e635]";
    case "At Risk":
      return "bg-[#f59e0b]";
    case "Blocked":
      return "bg-[#ef4444]";
    case "Evidence Required":
      return "bg-[#6e7a70]";
    default:
      return "bg-[#6e7a70]";
  }
};

export function SupplierReadinessSimple() {
  const [activeSector, setActiveSector] = useState("all");

  return (
    <div className="space-y-4">
      {/* Breadcrumb and Sector Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[#6e7a70]">
          <span>Regional Net Zero Infrastructure Workforce Readiness Programme</span>
          <span>/</span>
          <span>Workspace</span>
          <span>/</span>
          <span className="text-[#e8efe9] font-medium">Supplier Readiness</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Filter className="h-4 w-4 text-[#6e7a70]" />
            <span className="text-[#6e7a70]">Sectors</span>
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => !sector.disabled && setActiveSector(sector.id)}
                disabled={sector.disabled}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-colors",
                  sector.disabled && "opacity-40 cursor-not-allowed",
                  activeSector === sector.id
                    ? "bg-primary/20 text-primary"
                    : "text-[#6e7a70] hover:text-[#e8efe9]"
                )}
              >
                {sector.color && <span className={cn("inline-block w-2 h-2 rounded-full mr-1", sector.color)} />}
                {sector.label}
              </button>
            ))}
          </div>
          <Button className="h-8 px-3 text-sm bg-primary text-primary-foreground">
            <Plus className="mr-1 h-4 w-4" />
            New Action
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#e8efe9] mb-2">Supplier Readiness</h1>
          <p className="text-sm text-[#6e7a70]">
            Verified workforce readiness across all suppliers in the ecosystem. Click a supplier to drill into role coverage, evidence and interventions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="h-8 px-3 text-sm bg-primary text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            Onboard Supplier
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-3">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-card/30 border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-xs text-[#6e7a70] mb-2">
                <Icon className={cn("h-4 w-4", kpi.color)} />
                <span>{kpi.label}</span>
              </div>
              <div className={cn("text-2xl font-semibold mb-1", kpi.color)}>{kpi.value}</div>
              <div className="text-xs text-[#6e7a70]">{kpi.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Supplier Table */}
      <div className="bg-card/30 border border-border/50 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left text-xs font-medium text-[#6e7a70] px-4 py-3">Supplier</th>
              <th className="text-left text-xs font-medium text-[#6e7a70] px-4 py-3">Tier</th>
              <th className="text-left text-xs font-medium text-[#6e7a70] px-4 py-3">Sector</th>
              <th className="text-right text-xs font-medium text-[#6e7a70] px-4 py-3">Workers</th>
              <th className="text-left text-xs font-medium text-[#6e7a70] px-4 py-3">Readiness</th>
              <th className="text-left text-xs font-medium text-[#6e7a70] px-4 py-3">Status</th>
              <th className="text-left text-xs font-medium text-[#6e7a70] px-4 py-3">Evidence</th>
              <th className="text-right text-xs font-medium text-[#6e7a70] px-4 py-3">Blockers</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, i) => (
              <tr 
                key={i} 
                className="border-b border-border/20 hover:bg-card/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-[#e8efe9]">{supplier.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded text-xs font-medium border border-border/50 text-[#6e7a70]">
                    Tier {supplier.tier}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#6e7a70]">{supplier.sector}</td>
                <td className="px-4 py-3 text-sm text-[#e8efe9] text-right">{supplier.workers}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-[#1a1f1c] rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", getReadinessColor(supplier.status))}
                        style={{ width: `${supplier.readiness}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#e8efe9]">{supplier.readiness}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(supplier.status)}</td>
                <td className="px-4 py-3 text-sm text-[#6e7a70]">{supplier.evidence}</td>
                <td className="px-4 py-3 text-sm text-[#e8efe9] text-right">{supplier.blockers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
