"use client";

import { Button } from "@/components/ui/button";
import { 
  Filter, 
  Download, 
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type WorkerStatus = "ready" | "conditional" | "blocked" | "evidence-required" | "in-training" | "at-risk";
type ExpiryRisk = "low" | "medium" | "high" | "expired" | string;

interface Worker {
  id: string;
  employer: string;
  role: string;
  sector: string;
  status: WorkerStatus;
  evidence: string;
  expiryRisk: ExpiryRisk;
}

// Data
const kpiData = [
  { label: "READY", value: "412", subtitle: "48% of workforce", color: "text-[#a3ff3c]" },
  { label: "CONDITIONAL", value: "216", subtitle: "Pending verification", color: "text-[#f59e0b]" },
  { label: "BLOCKED", value: "89", subtitle: "Action required", color: "text-[#ef4444]" },
  { label: "EVIDENCE REQUIRED", value: "89", subtitle: "Missing items", color: "text-[#e8efe9]" },
  { label: "IN TRAINING", value: "54", subtitle: "Across 3 cohorts", color: "text-[#3b82f6]" },
  { label: "EXPIRING < 30D", value: "42", subtitle: "Revalidation needed", color: "text-[#ef4444]" },
];

const filters = [
  "Sector", "Employer", "Role", "Location", "Evidence status", 
  "Authorisation status", "Expiry risk", "Training provider"
];

const workers: Worker[] = [
  { id: "H2-TECH-047", employer: "Supplier A", role: "Hydrogen Technician", sector: "Hydrogen", status: "at-risk", evidence: "Assessor verified · refresher due", expiryRisk: "42 days" },
  { id: "ELEC-118", employer: "Supplier B", role: "Electrical Installer", sector: "Electrification", status: "evidence-required", evidence: "Missing HV authorisation", expiryRisk: "High" },
  { id: "H2-RESP-012", employer: "Supplier C", role: "Emergency Response Lead", sector: "Hydrogen", status: "blocked", evidence: "Refresher overdue", expiryRisk: "Expired" },
  { id: "HV-ENG-033", employer: "Supplier B", role: "High-Voltage Engineer", sector: "Electrification", status: "blocked", evidence: "Employer sign-off pending", expiryRisk: "Medium" },
  { id: "COHORT-H2-03", employer: "College Partner", role: "Hydrogen Technician Cohort", sector: "Hydrogen", status: "in-training", evidence: "Practical assessment pending", expiryRisk: "Low" },
  { id: "MAINT-204", employer: "Supplier A", role: "Maintenance Technician", sector: "Cross-sector", status: "ready", evidence: "All verified", expiryRisk: "180 days" },
  { id: "EV-INST-077", employer: "Supplier B", role: "EV Installation Lead", sector: "Electrification", status: "ready", evidence: "Verified", expiryRisk: "112 days" },
  { id: "PTW-SUP-005", employer: "Anchor org", role: "Permit-to-Work Supervisor", sector: "Cross-sector", status: "at-risk", evidence: "Site authority renewal due", expiryRisk: "21 days" },
];

function StatusBadge({ status }: { status: WorkerStatus }) {
  const config: Record<WorkerStatus, { label: string; className: string }> = {
    "ready": { label: "Ready", className: "bg-[#a3ff3c]/20 text-[#a3ff3c] border-[#a3ff3c]/30" },
    "conditional": { label: "Conditional", className: "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30" },
    "blocked": { label: "Blocked", className: "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30" },
    "evidence-required": { label: "Evidence Required", className: "bg-[#6e7a70]/20 text-[#6e7a70] border-[#6e7a70]/30" },
    "in-training": { label: "In Training", className: "bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]/30" },
    "at-risk": { label: "At Risk", className: "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30" },
  };
  
  const { label, className } = config[status];
  
  return (
    <span className={cn("px-2 py-1 text-xs font-medium rounded border", className)}>
      {label}
    </span>
  );
}

function SectorBadge({ sector }: { sector: string }) {
  const isHydrogen = sector === "Hydrogen";
  const isElectrification = sector === "Electrification";
  
  return (
    <span className={cn(
      "px-2 py-1 text-xs font-medium rounded border",
      isHydrogen && "bg-[#a3ff3c]/10 text-[#a3ff3c] border-[#a3ff3c]/20",
      isElectrification && "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20",
      !isHydrogen && !isElectrification && "bg-[#6e7a70]/10 text-[#6e7a70] border-[#6e7a70]/20"
    )}>
      {sector}
    </span>
  );
}

function ExpiryRiskText({ risk }: { risk: ExpiryRisk }) {
  const isExpired = risk === "Expired";
  const isHigh = risk === "High";
  const isMedium = risk === "Medium";
  const isLow = risk === "Low";
  const isDays = risk.includes("days");
  
  return (
    <span className={cn(
      "text-sm",
      isExpired && "text-[#ef4444] font-medium",
      isHigh && "text-[#ef4444] font-medium",
      isMedium && "text-[#f59e0b] font-medium",
      isLow && "text-[#6e7a70]",
      isDays && "text-[#e8efe9]"
    )}>
      {risk}
    </span>
  );
}

export function WorkforceReadinessSimple() {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6e7a70]">
        <span>Regional Net Zero Infrastructure Workforce Readiness Programme</span>
        <span>/</span>
        <span>Workspace</span>
        <span>/</span>
        <span className="text-[#e8efe9] font-medium">Workforce Readiness</span>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8efe9] mb-1">Workforce Readiness</h1>
          <p className="text-sm text-[#6e7a70]">
            Readiness reflects more than training completion. Trace combines role requirements, verified evidence, expiry status, authorisation status and safety-critical rules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filters
          </Button>
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            <Download className="mr-2 h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-3">
        {kpiData.map((kpi, i) => (
          <div key={i} className="bg-card/30 border border-border/50 rounded-lg p-4">
            <div className="text-xs text-[#6e7a70] uppercase tracking-wide mb-1">{kpi.label}</div>
            <div className={cn("text-3xl font-semibold", kpi.color)}>{kpi.value}</div>
            <div className="text-xs text-[#6e7a70]">{kpi.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((filter, i) => (
          <Button key={i} variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30 text-[#e8efe9]">
            {filter}
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        ))}
      </div>

      {/* Workers Table */}
      <div className="bg-card/30 border border-border/50 rounded-lg">
        <div className="px-4 py-3 border-b border-border/30">
          <h3 className="text-sm font-medium text-[#e8efe9]">Workers & cohorts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] uppercase tracking-wide">Worker / Cohort</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] uppercase tracking-wide">Employer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] uppercase tracking-wide">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] uppercase tracking-wide">Sector</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] uppercase tracking-wide">Evidence</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] uppercase tracking-wide">Expiry risk</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id} className="border-b border-border/20 hover:bg-card/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-[#6e7a70]">{worker.id}</td>
                  <td className="px-4 py-3 text-sm text-[#e8efe9] font-medium">{worker.employer}</td>
                  <td className="px-4 py-3 text-sm text-[#e8efe9]">{worker.role}</td>
                  <td className="px-4 py-3"><SectorBadge sector={worker.sector} /></td>
                  <td className="px-4 py-3"><StatusBadge status={worker.status} /></td>
                  <td className="px-4 py-3 text-sm text-[#6e7a70]">{worker.evidence}</td>
                  <td className="px-4 py-3"><ExpiryRiskText risk={worker.expiryRisk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="flex items-center gap-3 pt-4">
        <span className="px-2 py-1 text-xs font-medium bg-[#6e7a70]/20 text-[#6e7a70] rounded border border-[#6e7a70]/30">
          PROTOTYPE
        </span>
        <span className="text-xs text-[#6e7a70]">
          Prototype view using illustrative data. Not live customer data, not a confirmed deployment, and not a regulatory certification system.
        </span>
      </div>
      <div className="text-center text-xs text-[#6e7a70] italic pb-4">
        Advanced Nuclear / SMR is shown as an illustrative future safety-critical pathway. Hydrogen and electrification represent the current active evidence base for this prototype.
      </div>
    </div>
  );
}
