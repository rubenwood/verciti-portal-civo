"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  AlertCircle,
  Users,
  Building2,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Plus,
  ChevronRight,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Zap,
  Activity,
} from "lucide-react";

// Programme data
const programmeData = {
  name: "Aberdeen Hydrogen Plant - Phase 1 Mobilisation",
  readiness: 67,
  target: 80,
  evidenceConfidence: "L3",
  blockers: 8,
  orgs: 14,
  workers: 847,
  safetyCriticalRoles: 24,
  mobilisationWindow: "Q3 2026",
};

const sectorReadiness = [
  { sector: "Hydrogen Systems", icon: "zap", readiness: 72, status: "risk", blocker: "Emergency response training gaps", tone: "warn" },
  { sector: "Electrical Installation", icon: "zap", readiness: 84, status: "ready", blocker: "Minor evidence gaps", tone: "ok" },
  { sector: "Mechanical Engineering", icon: "cog", readiness: 68, status: "risk", blocker: "HV authorisation pending", tone: "warn" },
  { sector: "Safety & Compliance", icon: "shield", readiness: 91, status: "ready", blocker: "All requirements met", tone: "ok" },
  { sector: "Civil Works", icon: "building", readiness: 45, status: "blocked", blocker: "Site induction backlog", tone: "bad" },
];

const assurance = {
  "Authorised": 312,
  "Conditional": 186,
  "Not authorised": 124,
  "Evidence required": 225,
};

const roleGaps = [
  { role: "HV Authorised Person", needed: 48, ready: 32, inTraining: 8, conditional: 4, blocked: 4, risk: "red" },
  { role: "Hydrogen Safety Specialist", needed: 24, ready: 14, inTraining: 4, conditional: 3, blocked: 3, risk: "red" },
  { role: "Electrical Supervisor", needed: 36, ready: 28, inTraining: 4, conditional: 2, blocked: 2, risk: "amber" },
  { role: "Mechanical Fitter", needed: 120, ready: 98, inTraining: 12, conditional: 6, blocked: 4, risk: "amber" },
  { role: "Safety Officer", needed: 12, ready: 11, inTraining: 1, conditional: 0, blocked: 0, risk: "green" },
];

const blockers = [
  { id: 1, title: "HV authorisation evidence missing for Supplier B workers", org: "GreenVolt Electrical Ltd", workers: 18, sector: "Electrical", role: "HV Authorised Person", rule: "Worker must hold valid HV authorisation certificate within 12 months", gap: "18 workers missing L4 evidence for HV authorisation", owner: "M. Patel, Lead Assessor", impact: "+4% readiness if resolved" },
  { id: 2, title: "Hydrogen emergency response training overdue", org: "H2 Systems Co", workers: 36, sector: "Hydrogen", role: "Hydrogen Safety Specialist", rule: "Emergency response training must be current within 24 months", gap: "36 workers overdue for hydrogen emergency refresher", owner: "S. Turner, Programme Manager", impact: "+6% readiness if resolved" },
  { id: 3, title: "Site induction capacity constraint", org: "Multiple", workers: 52, sector: "Civil", role: "All roles", rule: "Valid site induction required before site access", gap: "Site can only process 20 inductions per week", owner: "J. Roberts, Site Manager", impact: "+3% readiness if resolved" },
];

const nextActions = [
  { pri: "high", action: "Request HV authorisation evidence from Supplier B", owner: "M. Patel", impact: "+4% readiness" },
  { pri: "high", action: "Schedule hydrogen emergency response refresher", owner: "S. Turner", impact: "+6% readiness" },
  { pri: "medium", action: "Increase site induction capacity", owner: "J. Roberts", impact: "+3% readiness" },
  { pri: "medium", action: "Verify practical assessment records for Cohort 3", owner: "A. Singh", impact: "+2% readiness" },
  { pri: "low", action: "Escalate medical certificate expiry for 4 workers", owner: "S. Turner", impact: "+1% readiness" },
];

export function MissionControl() {
  const [selectedBlocker, setSelectedBlocker] = useState(blockers[0]);

  // Calculate donut chart segments
  const aTotal = Object.values(assurance).reduce((a, b) => a + b, 0);
  const aColors: Record<string, string> = {
    "Authorised": "var(--success)",
    "Conditional": "var(--warning)",
    "Not authorised": "var(--destructive)",
    "Evidence required": "var(--muted-foreground)",
  };

  let acc = 0;
  const segments = Object.entries(assurance).map(([k, v]) => {
    const start = acc / aTotal;
    acc += v;
    return { key: k, value: v, start, end: acc / aTotal, color: aColors[k] };
  });

  // SVG arc path generator
  const arcPath = (startPct: number, endPct: number, color: string) => {
    const cx = 90, cy = 90, R = 80, r = 56;
    const a0 = startPct * 2 * Math.PI - Math.PI / 2;
    const a1 = endPct * 2 * Math.PI - Math.PI / 2;
    const largeArc = (endPct - startPct) > 0.5 ? 1 : 0;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
    const x3 = cx + r * Math.cos(a0), y3 = cy + r * Math.sin(a0);
    return (
      <path
        key={`${startPct}-${endPct}`}
        d={`M ${x0} ${y0} A ${R} ${R} 0 ${largeArc} 1 ${x1} ${y1} L ${x2} ${y2} A ${r} ${r} 0 ${largeArc} 0 ${x3} ${y3} Z`}
        fill={color}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              At Risk
            </Badge>
            <span className="text-xs text-muted-foreground">Programme status</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Mission Control</h1>
          <p className="text-sm text-muted-foreground">{programmeData.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar className="h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export readiness pack
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New action
          </Button>
        </div>
      </div>

      {/* Readiness Logic Formula Strip */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-primary/5 via-muted/30 to-primary/5 border border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Readiness logic</p>
            <p className="text-[10px] text-muted-foreground">How Trace determines deployment readiness</p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap text-xs ml-auto">
            <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium whitespace-nowrap">Role requirements</span>
            <span className="text-muted-foreground">+</span>
            <span className="px-2 py-1 rounded bg-success/10 text-success font-medium whitespace-nowrap">Verified evidence</span>
            <span className="text-muted-foreground">+</span>
            <span className="px-2 py-1 rounded bg-warning/10 text-warning font-medium whitespace-nowrap">Expiry status</span>
            <span className="text-muted-foreground">+</span>
            <span className="px-2 py-1 rounded bg-muted text-muted-foreground font-medium whitespace-nowrap">Authorisation</span>
            <span className="text-muted-foreground">=</span>
            <span className={cn(
              "px-3 py-1 rounded font-bold whitespace-nowrap",
              programmeData.readiness >= 80 ? "bg-success/20 text-success" :
              programmeData.readiness >= 60 ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive"
            )}>
              Deployment readiness
            </span>
          </div>
        </div>
      </div>

      {/* Hero Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: "Readiness score", value: `${programmeData.readiness}%`, sub: `Target ${programmeData.target}% · ${programmeData.target - programmeData.readiness} pts to recover`, tone: "warn", large: true },
          { label: "Evidence confidence", value: programmeData.evidenceConfidence, sub: "L4-L5 verified: 39%", tone: "neutral" },
          { label: "Deployment blockers", value: programmeData.blockers.toString(), sub: "2 high impact", tone: "bad" },
          { label: "Organisations mapped", value: programmeData.orgs.toString(), sub: "Anchor · Tier 1/2 · Education", tone: "neutral" },
          { label: "Workers tracked", value: programmeData.workers.toString(), sub: "Across 14 employers", tone: "neutral" },
          { label: "Safety-critical roles", value: programmeData.safetyCriticalRoles.toString(), sub: "Mapped · evidence-led", tone: "neutral" },
          { label: "Mobilisation window", value: programmeData.mobilisationWindow, sub: "Hydrogen Safety Deployment", tone: "neutral", large: true },
        ].map((metric, i) => (
          <div key={i} className="p-3 rounded-xl bg-muted/30 border border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{metric.label}</p>
            <p className={cn(
              "font-bold mb-1",
              metric.large ? "text-2xl" : "text-xl",
              metric.tone === "warn" ? "text-warning" : metric.tone === "bad" ? "text-destructive" : "text-foreground"
            )}>
              {metric.value}
            </p>
            <p className={cn(
              "text-[10px]",
              metric.tone === "warn" ? "text-warning" : metric.tone === "bad" ? "text-destructive" : "text-muted-foreground"
            )}>
              {metric.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Row 1: Sector Readiness + Safety-Critical Assurance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-sm">Sector Readiness</h3>
                <p className="text-xs text-muted-foreground">Active evidence base: Hydrogen and Electrification</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left pb-2 font-normal">Sector</th>
                    <th className="text-left pb-2 font-normal w-48">Readiness</th>
                    <th className="text-left pb-2 font-normal">Status</th>
                    <th className="text-left pb-2 font-normal">Main blocker</th>
                  </tr>
                </thead>
                <tbody>
                  {sectorReadiness.map((s, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "p-1.5 rounded",
                            s.tone === "ok" ? "bg-success/10" : s.tone === "warn" ? "bg-warning/10" : "bg-destructive/10"
                          )}>
                            <Zap className={cn(
                              "h-3.5 w-3.5",
                              s.tone === "ok" ? "text-success" : s.tone === "warn" ? "text-warning" : "text-destructive"
                            )} />
                          </div>
                          <span>{s.sector}</span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                s.readiness >= 80 ? "bg-success" : s.readiness >= 60 ? "bg-warning" : "bg-destructive"
                              )}
                              style={{ width: `${s.readiness}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono w-10">{s.readiness}%</span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <Badge variant="outline" className={cn(
                          "text-[10px]",
                          s.status === "ready" ? "bg-success/10 text-success border-success/20" :
                          s.status === "risk" ? "bg-warning/10 text-warning border-warning/20" :
                          "bg-destructive/10 text-destructive border-destructive/20"
                        )}>
                          <span className="h-1.5 w-1.5 rounded-full mr-1" style={{
                            backgroundColor: s.status === "ready" ? "var(--success)" : s.status === "risk" ? "var(--warning)" : "var(--destructive)"
                          }} />
                          {s.status === "ready" ? "Ready" : s.status === "risk" ? "At Risk" : "Blocked"}
                        </Badge>
                      </td>
                      <td className="py-2.5 text-xs text-muted-foreground">{s.blocker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="p-4 rounded-xl bg-muted/30 border border-border h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-sm">Safety-Critical Assurance</h3>
                <p className="text-xs text-muted-foreground">Workers by authorisation status</p>
              </div>
              <button className="text-xs text-primary hover:underline">Open assurance →</button>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-[180px] h-[180px] shrink-0">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  {segments.map((s) => arcPath(s.start, s.end, s.color))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{aTotal}</p>
                    <p className="text-[10px] text-muted-foreground">workers in scope</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {segments.map((s) => (
                  <div key={s.key} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="flex-1 text-xs">{s.key}</span>
                    <span className="text-xs font-mono w-8 text-right">{s.value}</span>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{Math.round(s.value / aTotal * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Role Gaps */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm">Top Role Gaps</h3>
            <p className="text-xs text-muted-foreground">Where deployable headcount falls short of programme requirement</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left pb-2 font-normal">Role</th>
                <th className="text-right pb-2 font-normal">Needed</th>
                <th className="text-right pb-2 font-normal">Ready</th>
                <th className="text-right pb-2 font-normal">Gap</th>
                <th className="text-left pb-2 font-normal w-64">Distribution</th>
                <th className="text-left pb-2 font-normal">Risk</th>
              </tr>
            </thead>
            <tbody>
              {roleGaps.map((r, i) => {
                const gap = r.needed - r.ready;
                return (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 font-medium">{r.role}</td>
                    <td className="py-2.5 text-right font-mono text-xs">{r.needed}</td>
                    <td className="py-2.5 text-right font-mono text-xs text-success">{r.ready}</td>
                    <td className={cn(
                      "py-2.5 text-right font-mono text-xs",
                      r.risk === "red" ? "text-destructive" : "text-warning"
                    )}>{gap}</td>
                    <td className="py-2.5">
                      <div className="flex h-2.5 rounded-full overflow-hidden">
                        <div className="bg-success" style={{ width: `${r.ready / r.needed * 100}%` }} title={`Ready: ${r.ready}`} />
                        <div className="bg-primary" style={{ width: `${r.inTraining / r.needed * 100}%` }} title={`In Training: ${r.inTraining}`} />
                        <div className="bg-warning" style={{ width: `${r.conditional / r.needed * 100}%` }} title={`Conditional: ${r.conditional}`} />
                        <div className="bg-destructive" style={{ width: `${r.blocked / r.needed * 100}%` }} title={`Blocked: ${r.blocked}`} />
                      </div>
                    </td>
                    <td className="py-2.5">
                      <Badge variant="outline" className={cn(
                        "text-[10px]",
                        r.risk === "red" ? "bg-destructive/10 text-destructive border-destructive/20" :
                        r.risk === "amber" ? "bg-warning/10 text-warning border-warning/20" :
                        "bg-success/10 text-success border-success/20"
                      )}>
                        <span className="h-1.5 w-1.5 rounded-full mr-1" style={{
                          backgroundColor: r.risk === "red" ? "var(--destructive)" : r.risk === "amber" ? "var(--warning)" : "var(--success)"
                        }} />
                        {r.risk === "red" ? "Red" : r.risk === "amber" ? "Amber" : "Green"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 pt-3 border-t border-border mt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-success" />Ready</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary" />In Training</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-warning" />Conditional</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-destructive" />Blocked</span>
        </div>
      </div>

      {/* Row 3: Deployment Blockers + Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-sm">Top Deployment Blockers</h3>
                <p className="text-xs text-muted-foreground">Click any blocker to inspect the failed readiness rule, owner and impact</p>
              </div>
            </div>
            <div className="space-y-2">
              {blockers.map((b, i) => (
                <div
                  key={b.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                    selectedBlocker?.id === b.id 
                      ? "bg-destructive/10 border border-destructive/20" 
                      : "bg-background border border-border hover:border-destructive/30"
                  )}
                  onClick={() => setSelectedBlocker(b)}
                >
                  <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{b.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.org} · {b.workers} workers affected · {b.sector}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="p-4 rounded-xl bg-muted/30 border border-border h-full">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-xs font-medium">Blocker detail</span>
              <Badge variant="outline" className="ml-auto text-[10px] bg-destructive/10 text-destructive border-destructive/20">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive mr-1" />
                Blocked
              </Badge>
            </div>
            {selectedBlocker && (
              <div className="space-y-4">
                <p className="font-semibold text-sm leading-snug">{selectedBlocker.title}</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Affected organisation</p>
                    <p>{selectedBlocker.org}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Affected role</p>
                    <p>{selectedBlocker.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Workers affected</p>
                    <p className="font-semibold text-destructive">{selectedBlocker.workers}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Action owner</p>
                    <p>{selectedBlocker.owner}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Failed readiness rule</p>
                  <p className="text-xs italic text-muted-foreground">"{selectedBlocker.rule}"</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Evidence gap</p>
                  <p className="text-xs">{selectedBlocker.gap}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Mobilisation impact if resolved</p>
                  <p className="text-xs text-success font-medium">{selectedBlocker.impact}</p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="text-xs gap-1.5 flex-1">
                    <Users className="h-3.5 w-3.5" />
                    View workers
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs gap-1.5 flex-1">
                    <FileText className="h-3.5 w-3.5" />
                    Open evidence
                  </Button>
                  <Button size="sm" className="text-xs gap-1.5 flex-1">
                    <Plus className="h-3.5 w-3.5" />
                    Create action
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 4: Next Best Actions */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm">Next Best Actions</h3>
            <p className="text-xs text-muted-foreground">Coordinated interventions to recover programme readiness</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left pb-2 font-normal">Priority</th>
                <th className="text-left pb-2 font-normal">Action</th>
                <th className="text-left pb-2 font-normal">Owner</th>
                <th className="text-left pb-2 font-normal">Mobilisation impact</th>
                <th className="text-left pb-2 font-normal w-20"></th>
              </tr>
            </thead>
            <tbody>
              {nextActions.map((a, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5">
                    <Badge variant="outline" className={cn(
                      "text-[10px]",
                      a.pri === "high" ? "bg-destructive/10 text-destructive border-destructive/20" :
                      a.pri === "medium" ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-muted text-muted-foreground border-border"
                    )}>
                      <span className="h-1.5 w-1.5 rounded-full mr-1" style={{
                        backgroundColor: a.pri === "high" ? "var(--destructive)" : a.pri === "medium" ? "var(--warning)" : "var(--muted-foreground)"
                      }} />
                      {a.pri.charAt(0).toUpperCase() + a.pri.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-2.5 font-medium">{a.action}</td>
                  <td className="py-2.5 text-muted-foreground">{a.owner}</td>
                  <td className="py-2.5 text-success font-medium">{a.impact}</td>
                  <td className="py-2.5">
                    <Button variant="ghost" size="sm" className="text-xs h-7 gap-1">
                      Open <ChevronRight className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground">
        <Badge variant="outline" className="text-[10px]">Prototype</Badge>
        <span>Prototype view using illustrative data. Not live customer data, not a confirmed deployment, and not a regulatory certification system.</span>
      </div>
    </div>
  );
}
