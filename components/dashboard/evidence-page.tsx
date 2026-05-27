"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Filter,
  Upload,
  CheckCircle2,
  FileText,
  Users,
  Plus,
  RefreshCw,
} from "lucide-react";

const kpis = [
  { label: "EVIDENCE ITEMS", value: "8,421", subtitle: "Across 24 organisations", color: "text-[#e8efe9]" },
  { label: "VERIFIED · L4+", value: "39%", subtitle: "Independent assessor / site authority", color: "text-[#a3e635]" },
  { label: "PENDING VERIFICATION", value: "208", subtitle: "Awaiting reviewer", color: "text-[#f59e0b]" },
  { label: "MISSING ITEMS", value: "89", subtitle: "Block deployment", color: "text-[#ef4444]" },
  { label: "EXPIRING · 30D", value: "42", subtitle: "Revalidation needed", color: "text-[#ef4444]" },
];

const verificationQueue = [
  { item: "HV authorisation certificate", owner: "Supplier B", level: "L3", status: "Missing" },
  { item: "Practical assessment records", owner: "Assessor (College)", level: "L4", status: "Pending" },
  { item: "Emergency response refresher", owner: "Training provider", level: "L2", status: "Due" },
  { item: "Site induction records", owner: "Anchor organisation", level: "L5", status: "Pending" },
  { item: "Hydrogen safety module — Cohort 3", owner: "Training provider", level: "L2", status: "Complete" },
  { item: "Permit-to-Work attestation", owner: "Site authority", level: "L5", status: "Complete" },
  { item: "Fitness-to-work check", owner: "Employer", level: "L3", status: "Complete" },
  { item: "Electrical certification (Level 3)", owner: "Awarding body", level: "L4", status: "Verified" },
];

const workerEvidence = [
  { item: "Hydrogen safety module", status: "Complete" },
  { item: "Practical assessment", status: "Verified" },
  { item: "Employer sign-off", status: "Verified" },
  { item: "Emergency response refresher", status: "Due" },
  { item: "Site induction", status: "Pending" },
  { item: "Certification expiry", status: "42 days" },
];

const evidenceCoverage = [
  { type: "Training completion", percentage: 96 },
  { type: "Immersive module completion", percentage: 78 },
  { type: "Assessment result", percentage: 84 },
  { type: "Practical competency", percentage: 71 },
  { type: "Employer sign-off", percentage: 63 },
  { type: "Assessor verification", percentage: 58 },
  { type: "Certificate upload", percentage: 88 },
  { type: "Expiry date present", percentage: 92 },
  { type: "Site induction", percentage: 54 },
  { type: "Equipment authorisation", percentage: 47 },
  { type: "Permit-to-work status", percentage: 62 },
  { type: "Refresher requirement", percentage: 71 },
  { type: "Fitness-to-work check", percentage: 82 },
];

const getCoverageBarColor = (percentage: number) => {
  if (percentage >= 80) return "bg-[#a3e635]";
  if (percentage >= 60) return "bg-[#f59e0b]";
  return "bg-[#ef4444]";
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Missing":
      return "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30";
    case "Due":
      return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30";
    case "Pending":
      return "bg-[#6e7a70]/20 text-[#9ca3af] border-[#6e7a70]/30";
    case "Complete":
      return "bg-[#a3e635]/20 text-[#a3e635] border-[#a3e635]/30";
    case "Verified":
      return "bg-[#a3e635]/20 text-[#a3e635] border-[#a3e635]/30";
    case "42 days":
      return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30";
    default:
      return "bg-[#6e7a70]/20 text-[#9ca3af] border-[#6e7a70]/30";
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "L5":
      return "border-[#a3e635]/50 text-[#a3e635]";
    case "L4":
      return "border-[#a3e635]/50 text-[#a3e635]";
    case "L3":
      return "border-[#f59e0b]/50 text-[#f59e0b]";
    case "L2":
      return "border-[#6e7a70]/50 text-[#9ca3af]";
    default:
      return "border-[#6e7a70]/50 text-[#9ca3af]";
  }
};

export function EvidencePage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#6e7a70]">
        <span>Regional Net Zero Infrastructure Workforce Readiness Programme</span>
        <span>/</span>
        <span>Workspace</span>
        <span>/</span>
        <span className="text-[#e8efe9] font-medium">Evidence</span>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8efe9] mb-1">Evidence</h1>
          <p className="text-sm text-[#6e7a70]">
            Evidence backbone of Trace. Every status here directly drives deployment readiness, authorisation and programme risk.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
            <Upload className="mr-2 h-4 w-4" />
            Upload evidence
          </Button>
          <Button className="h-8 px-3 text-sm bg-primary text-primary-foreground">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Verification queue
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-5 gap-3">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-card/30 border border-border/50 rounded-lg p-4">
            <div className="text-xs text-[#6e7a70] uppercase tracking-wide mb-1">{kpi.label}</div>
            <div className={cn("text-3xl font-semibold mb-1", kpi.color)}>{kpi.value}</div>
            <div className="text-xs text-[#6e7a70]">{kpi.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4">
        {/* Verification Queue */}
        <div className="col-span-2 bg-card/30 border border-border/50 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-[#e8efe9]">Verification queue</h3>
            <p className="text-xs text-[#6e7a70]">Evidence routed for assessor or employer sign-off</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-xs font-medium text-[#6e7a70] pb-3">Evidence item</th>
                <th className="text-left text-xs font-medium text-[#6e7a70] pb-3">Owner</th>
                <th className="text-left text-xs font-medium text-[#6e7a70] pb-3">Verification level</th>
                <th className="text-left text-xs font-medium text-[#6e7a70] pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {verificationQueue.map((item, i) => (
                <tr key={i} className="border-b border-border/20 hover:bg-card/20">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#6e7a70]" />
                      <span className="text-sm text-[#e8efe9]">{item.item}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-[#6e7a70]">{item.owner}</td>
                  <td className="py-3">
                    <span className={cn(
                      "inline-flex items-center justify-center w-8 h-6 text-xs font-medium rounded border",
                      getLevelColor(item.level)
                    )}>
                      {item.level}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border",
                      getStatusBadge(item.status)
                    )}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Worker Record Example */}
        <div className="bg-card/30 border border-border/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#6e7a70]" />
              <span className="text-xs text-[#6e7a70] uppercase tracking-wide">Example Worker Record</span>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30">
              At Risk
            </span>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#e8efe9]">H2-TECH-847</h4>
            <p className="text-xs text-[#6e7a70]">Supplier A · Hydrogen Technician · Hydrogen</p>
          </div>

          <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg px-3 py-2 mb-4">
            <p className="text-xs text-[#f59e0b] italic">
              Practical assessment verified, but emergency response refresher due within 30 days.
            </p>
          </div>

          <div className="space-y-3 mb-4">
            {workerEvidence.map((evidence, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-[#e8efe9]">{evidence.item}</span>
                <span className={cn(
                  "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border",
                  getStatusBadge(evidence.status)
                )}>
                  {evidence.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-border/30">
            <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
              <Users className="mr-2 h-4 w-4" />
              Open profile
            </Button>
            <Button className="h-8 px-3 text-sm bg-primary text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Request evidence
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Evidence Type Coverage */}
        <div className="col-span-2 bg-card/30 border border-border/50 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-[#e8efe9]">Evidence type coverage</h3>
            <p className="text-xs text-[#6e7a70]">Coverage across all 13 evidence types Trace tracks</p>
          </div>
          <div className="space-y-3">
            {evidenceCoverage.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm text-[#e8efe9] w-52">{item.type}</span>
                <div className="flex-1 h-2 bg-[#1a1f1c] rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", getCoverageBarColor(item.percentage))}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-[#6e7a70] w-12 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence ↔ Readiness */}
        <div className="bg-card/30 border border-border/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw className="h-4 w-4 text-[#a3e635]" />
            <h3 className="text-sm font-medium text-[#e8efe9]">Evidence ↔ Readiness</h3>
          </div>
          <p className="text-xs text-[#6e7a70] leading-relaxed">
            Every evidence status directly affects deployment readiness, authorisation status and programme risk. Trace re-evaluates readiness rules on every evidence change.
          </p>
        </div>
      </div>
    </div>
  );
}
