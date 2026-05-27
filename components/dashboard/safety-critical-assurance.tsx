"use client";

import { Button } from "@/components/ui/button";
import { FileText, Lightbulb, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const kpiData = [
  { label: "AUTHORISED", value: "412", subtitle: "48% of workforce", color: "text-[#a3e635]" },
  { label: "CONDITIONAL", value: "216", subtitle: "Pending verification", color: "text-[#f59e0b]" },
  { label: "NOT AUTHORISED", value: "143", subtitle: "Rule failure", color: "text-[#ef4444]" },
  { label: "EVIDENCE REQUIRED", value: "89", subtitle: "Items outstanding", color: "text-[#e8efe9]" },
];

const evidenceLevels = [
  { level: "L1", label: "Self-declared", description: "Self-attested by the individual", percent: 8, color: "bg-[#a3e635]" },
  { level: "L2", label: "Training provider verified", description: "Confirmed by training provider", percent: 22, color: "bg-[#a3e635]" },
  { level: "L3", label: "Employer verified", description: "Confirmed by employer", percent: 31, color: "bg-[#a3e635]" },
  { level: "L4", label: "Assessor verified", description: "Externally assessed", percent: 28, color: "bg-[#a3e635]" },
  { level: "L5", label: "Site authority / standard-aligned", description: "Standard-aligned, site-authority signed", percent: 11, color: "bg-[#a3e635]" },
];

const expiryRisks = [
  { label: "Certifications expired", value: 18, color: "text-[#ef4444]" },
  { label: "Expiring within 30 days", value: 42, color: "text-[#f59e0b]" },
  { label: "Expiring within 60 days", value: 77, color: "text-[#f59e0b]" },
  { label: "Refresher training due", value: 63, color: "text-[#e8efe9]" },
  { label: "Site induction renewal required", value: 31, color: "text-[#e8efe9]" },
];

const deploymentBlockers = [
  {
    id: 1,
    title: "High-voltage authorisation evidence missing for Supplier B",
    rule: "Valid high-voltage authorisation must be employer verified and current",
    workers: 12,
    owner: "Supplier B employer admin",
  },
  {
    id: 2,
    title: "Hydrogen emergency response refresher overdue for night-shift cohort",
    rule: "Emergency response refresher must be current for hydrogen safety-critical roles",
    workers: 18,
    owner: "Training provider",
  },
];

export function SafetyCriticalAssurance() {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#6e7a70]">
        <span>Regional Net Zero Infrastructure Workforce Readiness Programme</span>
        <span>/</span>
        <span>Workspace</span>
        <span>/</span>
        <span className="text-[#e8efe9] font-medium">Safety-Critical Assurance</span>
      </div>

      {/* Page Title */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8efe9] mb-1">Safety-Critical Assurance</h1>
          <p className="text-sm text-[#a3e635] italic">Safe, competent, current, authorised and deployable.</p>
        </div>
        <Button variant="outline" className="h-8 px-4 text-sm border-border/50 bg-card/30">
          <FileText className="mr-2 h-4 w-4" />
          Assurance report
        </Button>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg px-4 py-3">
        <Lightbulb className="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[#e8efe9]">Training completion is not deployment assurance</p>
          <p className="text-xs text-[#6e7a70]">
            A worker may have completed training but still be conditional or not authorised if evidence, site sign-off, revalidation or employer verification is missing.
          </p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <div key={i} className="bg-card/30 border border-border/50 rounded-lg p-4">
            <div className="text-xs text-[#6e7a70] uppercase tracking-wide mb-1">{kpi.label}</div>
            <div className={cn("text-3xl font-semibold", kpi.color)}>{kpi.value}</div>
            <div className="text-xs text-[#6e7a70]">{kpi.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Evidence Confidence */}
        <div className="bg-card/30 border border-border/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#e8efe9] mb-1">Evidence confidence</h3>
          <p className="text-xs text-[#6e7a70] mb-6">
            Five-level confidence model — Level 1 self-declared to Level 5 site-authority verified
          </p>
          
          <div className="space-y-4">
            {evidenceLevels.map((level) => (
              <div key={level.level} className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-7 rounded border text-xs font-medium flex items-center justify-center",
                  level.level === "L1" ? "border-[#6e7a70]/50 text-[#6e7a70]" : "border-[#a3e635]/50 bg-[#a3e635]/10 text-[#a3e635]"
                )}>
                  {level.level}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#e8efe9]">{level.label}</div>
                  <div className="text-xs text-[#6e7a70]">{level.description}</div>
                </div>
                <div className="flex items-center gap-2 w-32">
                  <div className="flex-1 h-2 bg-[#1a1f1c] rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", level.color)}
                      style={{ width: `${level.percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#6e7a70] w-8 text-right">{level.percent}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t border-border/30 text-xs text-[#6e7a70]">
            <span>L1-L2: 30%</span>
            <span>L3 (employer-verified): 31%</span>
            <span className="text-[#a3e635]">L4-L5 (independent / site authority): 39%</span>
          </div>
        </div>

        {/* Expiry & Revalidation Risk */}
        <div className="bg-card/30 border border-border/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#e8efe9] mb-1">Expiry & revalidation risk</h3>
          <p className="text-xs text-[#6e7a70] mb-6">
            Active revalidation cliff over next 60 days
          </p>
          
          <div className="space-y-4">
            {expiryRisks.map((risk, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[#6e7a70]" />
                  <span className="text-sm text-[#e8efe9]">{risk.label}</span>
                </div>
                <span className={cn("text-sm font-medium", risk.color)}>{risk.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deployment Blockers */}
      <div className="bg-card/30 border border-border/50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-[#e8efe9] mb-1">Deployment blockers</h3>
        <p className="text-xs text-[#6e7a70] mb-4">
          Each blocker corresponds to a failed readiness rule — click to inspect
        </p>
        
        <div className="space-y-2">
          {deploymentBlockers.map((blocker) => (
            <div 
              key={blocker.id}
              className="flex items-center gap-4 p-3 bg-[#0a0d0c] rounded-lg border border-border/30 hover:border-border/50 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#ef4444]/20 text-[#ef4444] flex items-center justify-center text-sm font-medium">
                {blocker.id}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#e8efe9]">{blocker.title}</div>
                <div className="text-xs text-[#6e7a70]">
                  <span className="text-[#6e7a70]">Rule: </span>
                  <span className="italic">{blocker.rule}</span>
                  <span className="mx-2">·</span>
                  <span>{blocker.workers} workers</span>
                  <span className="mx-2">·</span>
                  <span>Owner: {blocker.owner}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#6e7a70]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
