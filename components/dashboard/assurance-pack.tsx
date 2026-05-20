"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Download,
  Share2,
  Clock,
  Sparkles,
  Shield,
  Users,
  Target,
  TrendingUp,
  Package,
  CheckCircle,
  Info,
  ChevronRight,
  FileText,
  ArrowRight,
} from "lucide-react";

// Assurance Pack data
const READINESS_STATUS = [
  { status: "Authorised / Deployment-ready", workers: 412, pct: 48, tone: "ok" },
  { status: "Conditional", workers: 216, pct: 25, tone: "warn" },
  { status: "Not authorised", workers: 143, pct: 17, tone: "bad" },
  { status: "Evidence required", workers: 89, pct: 10, tone: "info" },
];

const EVIDENCE_CONFIDENCE = [
  { level: 1, meaning: "Self-declared", share: "8%", tone: "bad" },
  { level: 2, meaning: "Training provider verified", share: "22%", tone: "info" },
  { level: 3, meaning: "Employer verified", share: "31%", tone: "" },
  { level: 4, meaning: "Assessor verified", share: "28%", tone: "ok" },
  { level: 5, meaning: "Site authority / standard-aligned verification", share: "11%", tone: "ok" },
];

const TOP_RISKS = [
  { risk: "HV authorisation evidence missing", impact: "12 workers blocked", owner: "Supplier B", status: "Overdue", recommendation: "Escalate evidence request", tone: "bad" },
  { risk: "Hydrogen emergency response refresher overdue", impact: "18 workers not authorised", owner: "Training provider", status: "In progress", recommendation: "Prioritise refresher delivery", tone: "warn" },
  { risk: "Practical assessment records pending", impact: "23 workers conditional", owner: "Assessor", status: "Awaiting evidence", recommendation: "Confirm verification schedule", tone: "warn" },
  { risk: "Site induction schedule not confirmed", impact: "41 workers conditional", owner: "Anchor organisation", status: "Open", recommendation: "Confirm site availability", tone: "warn" },
  { risk: "Permit-to-work supervisor coverage insufficient", impact: "Mobilisation phase risk", owner: "Project owner", status: "Open", recommendation: "Reallocate supervisor capacity", tone: "bad" },
];

const ROLE_GAPS = [
  { role: "Electrical Installer", needed: 120, ready: 76, gap: 44, tone: "warn" },
  { role: "Hydrogen Technician", needed: 80, ready: 52, gap: 28, tone: "warn" },
  { role: "High-Voltage Engineer", needed: 35, ready: 19, gap: 16, tone: "bad" },
  { role: "Emergency Response Lead", needed: 12, ready: 7, gap: 5, tone: "bad" },
  { role: "Maintenance Technician", needed: 60, ready: 42, gap: 18, tone: "warn" },
];

const SUPPLIER_SUMMARY = [
  { supplier: "GreenVolt Ltd", tier: "Tier 1", readiness: "71%", confidence: "Level 3.7", status: "At Risk", issue: "HV evidence missing", tone: "warn" },
  { supplier: "Northern Power Services", tier: "Tier 1", readiness: "82%", confidence: "Level 4", status: "Ready", issue: "Low expiry risk", tone: "ok" },
  { supplier: "HydraGen Solutions", tier: "Tier 2", readiness: "68%", confidence: "Level 3", status: "Conditional", issue: "Refresher due", tone: "warn" },
  { supplier: "FieldCore Engineering", tier: "Tier 2", readiness: "59%", confidence: "Level 2", status: "Evidence Required", issue: "Missing certificates", tone: "info" },
];

const INTERVENTION_FORECAST = [
  { group: "Evidence requests", workers: 53, impact: "+6%" },
  { group: "Training refreshers", workers: 42, impact: "+5%" },
  { group: "Assessment verification", workers: 31, impact: "+4%" },
  { group: "Site induction completion", workers: 41, impact: "+3%" },
];

const RECOMMENDED_DECISIONS = [
  { decision: "Escalate Supplier B evidence request", reason: "HV authorisation evidence is blocking 12 workers." },
  { decision: "Prioritise hydrogen emergency response refresher", reason: "18 workers remain not authorised for safety-critical deployment." },
  { decision: "Confirm site induction availability", reason: "41 workers are conditional pending site-specific authorisation." },
  { decision: "Approve additional assessor capacity", reason: "Practical assessment records are delaying cohort readiness." },
];

export function AssurancePack() {
  const [programmeStatus] = useState<"ok" | "warn" | "bad">("warn");

  const getStatusColor = (tone: string) => {
    switch (tone) {
      case "ok": return "bg-success/10 text-success border-success/20";
      case "warn": return "bg-warning/10 text-warning border-warning/20";
      case "bad": return "bg-destructive/10 text-destructive border-destructive/20";
      case "info": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workforce Readiness Assurance Pack</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Evidence-based readiness summary for project governance, supplier assurance and mobilisation decisions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
            <span className="text-xs text-muted-foreground">Programme Status:</span>
            <Badge variant="outline" className={cn("text-xs", getStatusColor(programmeStatus))}>
              {programmeStatus === "ok" ? "On Track" : programmeStatus === "warn" ? "At Risk" : "Blocked"}
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            Share Pack
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Clock className="h-4 w-4" />
            Schedule Update
          </Button>
          <Button size="sm" className="gap-1.5">
            <Sparkles className="h-4 w-4" />
            Generate Summary
          </Button>
        </div>
      </div>

      {/* Report Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 p-4 rounded-xl bg-muted/30 border border-border">
        {[
          ["Programme", "Regional Net Zero Infrastructure Programme"],
          ["Report type", "Project readiness assurance pack"],
          ["Reporting period", "Last 30 days"],
          ["Generated by", "E. Okafor"],
          ["Generated on", new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })],
          ["Data confidence", "Medium"],
          ["Evidence basis", "71% verified evidence"],
        ].map(([label, value], i) => (
          <div key={i}>
            <p className="text-[10px] text-muted-foreground">{label}</p>
            <p className="text-xs font-medium truncate">{value}</p>
          </div>
        ))}
      </div>

      {/* Executive Summary */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-warning" />
          <h2 className="font-semibold">Executive Summary</h2>
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed mb-4">
            Programme readiness remains <strong className="text-warning">At Risk</strong> due to high-voltage authorisation gaps, 
            hydrogen emergency response refresher delays and incomplete site induction evidence. 
            Completing the current high-priority interventions could move <strong>184 workers</strong> closer to deployment 
            readiness and improve overall readiness by an estimated <strong className="text-success">18%</strong>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: "Overall readiness", value: "67%", tone: "warn" },
              { label: "Required threshold", value: "80%", tone: "" },
              { label: "Evidence confidence", value: "Medium", tone: "" },
              { label: "Deployment blockers", value: "5", tone: "bad" },
              { label: "Workers in scope", value: "860", tone: "" },
              { label: "Organisations mapped", value: "24", tone: "" },
              { label: "Safety-critical roles", value: "14", tone: "warn" },
              { label: "Forecast readiness", value: "85%", tone: "ok" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-[10px] text-muted-foreground mb-1">{stat.label}</p>
                <p className={cn(
                  "text-lg font-bold",
                  stat.tone === "ok" ? "text-success" : stat.tone === "warn" ? "text-warning" : stat.tone === "bad" ? "text-destructive" : "text-foreground"
                )}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column: Readiness Status + Evidence Confidence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readiness Status */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Readiness Status</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Workers</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {READINESS_STATUS.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-3">
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(row.tone))}>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right text-lg font-bold">{row.workers}</td>
                    <td className="p-3 text-right text-sm text-muted-foreground">{row.pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-muted/20 border-t border-border">
            <p className="text-xs text-muted-foreground flex items-start gap-1.5">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              A worker may have completed training but still be conditional if evidence, site sign-off, or employer verification is missing.
            </p>
          </div>
        </div>

        {/* Evidence Confidence */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Evidence Confidence</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Level</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Meaning</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Current share</th>
                </tr>
              </thead>
              <tbody>
                {EVIDENCE_CONFIDENCE.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-3 font-mono text-sm font-semibold">Level {row.level}</td>
                    <td className="p-3 text-sm">{row.meaning}</td>
                    <td className={cn(
                      "p-3 text-right text-sm font-semibold",
                      row.tone === "ok" ? "text-success" : row.tone === "bad" ? "text-destructive" : row.tone === "info" ? "text-primary" : "text-foreground"
                    )}>
                      {row.share}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-muted/20 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Higher evidence confidence improves assurance quality and reduces mobilisation uncertainty.
            </p>
          </div>
        </div>
      </div>

      {/* Top Readiness Risks */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <h3 className="font-semibold">Top Readiness Risks</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Risk</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Impact</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Owner</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Recommended decision</th>
              </tr>
            </thead>
            <tbody>
              {TOP_RISKS.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10">
                  <td className="p-3 text-sm font-medium">{row.risk}</td>
                  <td className="p-3 text-sm text-muted-foreground">{row.impact}</td>
                  <td className="p-3 text-xs text-muted-foreground">{row.owner}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(row.tone))}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm">{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Readiness Gaps */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
          <Target className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Role Readiness Gaps</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Role</th>
                <th className="text-right p-3 text-xs font-medium text-muted-foreground">Needed</th>
                <th className="text-right p-3 text-xs font-medium text-muted-foreground">Ready</th>
                <th className="text-right p-3 text-xs font-medium text-muted-foreground">Gap</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Risk</th>
              </tr>
            </thead>
            <tbody>
              {ROLE_GAPS.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10">
                  <td className="p-3 text-sm">{row.role}</td>
                  <td className="p-3 text-right text-sm font-medium">{row.needed}</td>
                  <td className="p-3 text-right text-sm font-semibold text-success">{row.ready}</td>
                  <td className={cn(
                    "p-3 text-right text-sm font-semibold",
                    row.tone === "bad" ? "text-destructive" : "text-warning"
                  )}>
                    {row.gap}
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(row.tone))}>
                      {row.tone === "bad" ? "Red" : "Amber"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Readiness Summary */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Supplier Readiness Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Supplier</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Tier</th>
                <th className="text-right p-3 text-xs font-medium text-muted-foreground">Readiness</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Evidence confidence</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Key issue</th>
              </tr>
            </thead>
            <tbody>
              {SUPPLIER_SUMMARY.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10">
                  <td className="p-3 text-sm font-medium">{row.supplier}</td>
                  <td className="p-3 text-xs text-muted-foreground">{row.tier}</td>
                  <td className="p-3 text-right text-sm font-semibold">{row.readiness}</td>
                  <td className="p-3 text-xs font-mono text-muted-foreground">{row.confidence}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(row.tone))}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{row.issue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <ArrowRight className="h-3.5 w-3.5" />
            Open Supplier Readiness Profiles
          </Button>
        </div>
      </div>

      {/* Intervention Impact Forecast */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Intervention Impact Forecast</h3>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Intervention group</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Workers affected</th>
                  <th className="text-right p-3 text-xs font-medium text-muted-foreground">Expected readiness impact</th>
                </tr>
              </thead>
              <tbody>
                {INTERVENTION_FORECAST.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-3 text-sm">{row.group}</td>
                    <td className="p-3 text-right text-sm font-medium">{row.workers}</td>
                    <td className="p-3 text-right text-sm font-semibold text-success">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Forecast Summary */}
          <div className="p-4 rounded-lg bg-success/5 border border-success/20">
            <p className="text-xs font-semibold text-success mb-2">Total forecast impact</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-warning">67%</span>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold text-success">85%</span>
              <span className="text-sm text-success ml-2">Expected readiness uplift: +18%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Decisions */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-success" />
          <h3 className="font-semibold">Recommended Decisions</h3>
          <span className="text-xs text-muted-foreground ml-2">Board-level actions requiring approval</span>
        </div>
        <div className="p-4 space-y-3">
          {RECOMMENDED_DECISIONS.map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
                <span className="text-sm font-semibold">{item.decision}</span>
              </div>
              <p className="text-xs text-muted-foreground ml-6">Reason: {item.reason}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border flex flex-wrap items-center gap-2">
          <Button size="sm" className="gap-1.5">
            <CheckCircle className="h-4 w-4" />
            Approve recommended actions
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Users className="h-4 w-4" />
            Assign owners
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export decision log
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 rounded-xl bg-muted/20 border border-border flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <Badge variant="outline" className="text-[10px]">Prototype</Badge>
        <span>Prototype view using illustrative data. This assurance pack is an evidence-based readiness view, not a regulatory certification.</span>
        <span className="ml-auto">Secured by verciti TRACE</span>
      </div>
    </div>
  );
}
