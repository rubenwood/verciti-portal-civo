"use client";

import {
  Clock,
  Gauge,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Users,
  Calendar,
  Download,
  Plus,
  Info,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Timeline Phases data
const PHASES = [
  { id: 1, name: "Supplier Onboarding", planned: "Complete", status: "complete", impact: "+8%", tone: "ok" },
  { id: 2, name: "Workforce Mapping", planned: "Complete", status: "complete", impact: "+12%", tone: "ok" },
  { id: 3, name: "Training Interventions", planned: "In progress", status: "at-risk", impact: "+5%", tone: "warn" },
  { id: 4, name: "Evidence Upload", planned: "In progress", status: "at-risk", impact: "+6%", tone: "warn" },
  { id: 5, name: "Assessment Verification", planned: "Pending", status: "conditional", impact: "+4%", tone: "info" },
  { id: 6, name: "Revalidation", planned: "Pending", status: "at-risk", impact: "+3%", tone: "warn" },
  { id: 7, name: "Site Induction", planned: "Pending", status: "at-risk", impact: "+3%", tone: "warn" },
  { id: 8, name: "Site Authorisation", planned: "Pending", status: "blocked", impact: "+5%", tone: "bad" },
  { id: 9, name: "Mobilisation", planned: "25 May 2025", status: "at-risk", impact: "85% required", tone: "warn" },
];

const MILESTONES = [
  { milestone: "Supplier onboarding complete", owner: "Project owner", due: "10 Apr 2025", status: "Complete", blocker: "None", action: "Monitor supplier readiness", tone: "ok" },
  { milestone: "Workforce mapping complete", owner: "Supplier leads", due: "18 Apr 2025", status: "Complete", blocker: "None", action: "Maintain worker updates", tone: "ok" },
  { milestone: "Hydrogen refresher delivery", owner: "Training provider", due: "12 May 2025", status: "At Risk", blocker: "18 workers overdue", action: "Prioritise refresher sessions", tone: "warn" },
  { milestone: "HV evidence upload", owner: "Supplier B", due: "14 May 2025", status: "Blocked", blocker: "Missing authorisation certificates", action: "Escalate evidence request", tone: "bad" },
  { milestone: "Practical assessment verification", owner: "Assessor", due: "16 May 2025", status: "Conditional", blocker: "Records pending", action: "Confirm verification schedule", tone: "warn" },
  { milestone: "Site induction scheduling", owner: "Site authority", due: "18 May 2025", status: "At Risk", blocker: "Dates not confirmed", action: "Confirm site slots", tone: "warn" },
  { milestone: "Site authorisation review", owner: "Anchor employer", due: "20 May 2025", status: "Pending", blocker: "Evidence incomplete", action: "Review conditional workers", tone: "info" },
  { milestone: "Final readiness sign-off", owner: "Programme owner", due: "23 May 2025", status: "Pending", blocker: "Open blockers", action: "Generate assurance pack", tone: "info" },
  { milestone: "Mobilisation", owner: "Project owner", due: "25 May 2025", status: "At Risk", blocker: "Readiness forecast below threshold", action: "Execute recovery plan", tone: "bad" },
];

const RECOVERY = [
  { action: "Assign emergency refresher sessions", owner: "Training provider", impact: "+18 workers", due: "5 days" },
  { action: "Escalate HV evidence request", owner: "Supplier B", impact: "+12 workers", due: "3 days" },
  { action: "Add assessor capacity", owner: "Assessor network", impact: "+23 records verified", due: "4 days" },
  { action: "Confirm site induction slots", owner: "Site authority", impact: "+41 conditional workers", due: "6 days" },
  { action: "Review supplier readiness blockers", owner: "Project owner", impact: "Reduce critical blockers", due: "7 days" },
];

const RISKS = [
  { risk: "Evidence response delay", level: "High", tone: "bad" },
  { risk: "Assessor capacity", level: "Medium", tone: "warn" },
  { risk: "Training refresher completion", level: "High", tone: "bad" },
  { risk: "Supplier readiness", level: "Medium", tone: "warn" },
  { risk: "Site induction availability", level: "High", tone: "bad" },
];

function StatusChip({ status, tone }: { status: string; tone: string }) {
  const toneClasses = {
    ok: "bg-[#a3ff3c]/10 text-[#a3ff3c] border-[#a3ff3c]/20",
    warn: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    bad: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border", toneClasses[tone as keyof typeof toneClasses] || toneClasses.info)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", tone === "ok" ? "bg-[#a3ff3c]" : tone === "warn" ? "bg-amber-400" : tone === "bad" ? "bg-red-400" : "bg-blue-400")} />
      {status}
    </span>
  );
}

function Section({ title, icon: Icon, sub, children, right, pad = true }: { title: string; icon?: React.ElementType; sub?: string; children: React.ReactNode; right?: React.ReactNode; pad?: boolean }) {
  return (
    <div className="bg-[#0d1110] border border-[#1c211e] rounded-xl overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1c211e]">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[#a3ff3c]" />}
          <div>
            <h3 className="text-sm font-semibold text-[#e8efe9]">{title}</h3>
            {sub && <p className="text-xs text-[#6e7a70] mt-0.5">{sub}</p>}
          </div>
        </div>
        {right}
      </div>
      <div className={pad ? "p-4" : ""}>{children}</div>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#e8efe9]">Mobilisation Timeline</h1>
          <p className="text-sm text-[#6e7a70] mt-1">Track workforce readiness, evidence completion, supplier actions and authorisation milestones against mobilisation dates.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-3">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131815] border border-[#232a25] text-xs text-[#a8b3aa]">
              Project: Aberdeen Hydrogen Plant <ChevronDown className="w-3 h-3" />
            </button>
            <span className="text-xs text-[#6e7a70]">Mobilisation target:</span>
            <span className="text-xs font-semibold text-[#e8efe9]">25 May 2025</span>
            <StatusChip status="At Risk" tone="warn" />
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium hover:bg-[#1c211e] transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Create Milestone
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium hover:bg-[#1c211e] transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export Timeline
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium hover:bg-[#b4ff5c] transition-colors">
            <TrendingUp className="w-3.5 h-3.5" />
            Forecast Readiness
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { icon: Clock, label: "Days to Mobilisation", value: "34", sub: "Target: 25 May 2025", tone: "warn" },
          { icon: Gauge, label: "Current Readiness", value: "62%", sub: "Required threshold: 85%", tone: "warn" },
          { icon: TrendingUp, label: "Forecast Readiness", value: "74%", sub: "11% shortfall", tone: "warn" },
          { icon: CheckCircle2, label: "Milestones Complete", value: "4 / 9", sub: "5 remaining", tone: "" },
          { icon: AlertTriangle, label: "Critical Blockers", value: "5", sub: "Affecting target", tone: "bad" },
          { icon: Users, label: "Workers Still Needed", value: "76", sub: "Across 5 critical roles", tone: "" },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#0d1110] border border-[#1c211e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#131815] flex items-center justify-center">
                <kpi.icon className="w-3.5 h-3.5 text-[#6e7a70]" />
              </div>
              <span className="text-xs text-[#6e7a70]">{kpi.label}</span>
            </div>
            <div className={cn("text-2xl font-semibold", kpi.tone === "warn" ? "text-amber-400" : kpi.tone === "bad" ? "text-red-400" : "text-[#e8efe9]")}>{kpi.value}</div>
            <div className={cn("text-xs mt-1", kpi.tone === "warn" ? "text-amber-400/70" : kpi.tone === "bad" ? "text-red-400/70" : "text-[#6e7a70]")}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Timeline Phases */}
      <Section title="Timeline Phases" icon={Calendar}>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {PHASES.map((p) => (
            <div
              key={p.id}
              className={cn(
                "flex-shrink-0 w-36 p-3 rounded-lg border",
                p.status === "complete" ? "bg-[#a3ff3c]/5 border-[#a3ff3c]/20" :
                p.status === "at-risk" ? "bg-amber-500/5 border-amber-500/20" :
                p.status === "blocked" ? "bg-red-500/5 border-red-500/20" :
                "bg-blue-500/5 border-blue-500/20"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-2",
                p.status === "complete" ? "bg-[#a3ff3c]/20 text-[#a3ff3c]" :
                p.status === "at-risk" ? "bg-amber-500/20 text-amber-400" :
                p.status === "blocked" ? "bg-red-500/20 text-red-400" :
                "bg-blue-500/20 text-blue-400"
              )}>
                {p.id}
              </div>
              <div className="text-xs font-semibold text-[#e8efe9] mb-1">{p.name}</div>
              <div className="text-[10px] text-[#6e7a70] mb-0.5">Planned: {p.planned}</div>
              <div className="text-[10px] text-[#6e7a70] mb-2">Impact: {p.impact}</div>
              <StatusChip 
                status={p.status === "complete" ? "Complete" : p.status === "at-risk" ? "At Risk" : p.status === "blocked" ? "Blocked" : p.status === "conditional" ? "Conditional" : "Pending"} 
                tone={p.tone} 
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Readiness Forecast Chart */}
        <Section title="Readiness Forecast" icon={TrendingUp} sub="Based on current intervention completion rate">
          <div className="relative h-52 bg-[#131815] rounded-lg p-4">
            <svg width="100%" height="100%" viewBox="0 0 500 180" className="overflow-visible">
              {/* Grid lines */}
              {[0, 20, 40, 60, 80, 100].map((y) => (
                <g key={y}>
                  <line x1="40" y1={160 - y * 1.4} x2="480" y2={160 - y * 1.4} stroke="#1c211e" strokeWidth="1" />
                  <text x="30" y={164 - y * 1.4} fill="#6e7a70" fontSize="9" textAnchor="end">{y}%</text>
                </g>
              ))}
              {/* Target threshold line */}
              <line x1="40" y1="41" x2="480" y2="41" stroke="#a3ff3c" strokeWidth="2" strokeDasharray="4 2" />
              <text x="485" y="44" fill="#a3ff3c" fontSize="10" fontWeight="600">Target 85%</text>
              {/* Current trend */}
              <polyline points="40,130 120,116 200,103 280,95 360,88 440,87" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
              {/* Forecast */}
              <polyline points="280,95 360,85 440,76 480,74" fill="none" stroke="#f5b942" strokeWidth="2.5" strokeDasharray="4 2" />
              {/* Scenario with actions */}
              <polyline points="280,95 360,68 440,48 480,41" fill="none" stroke="#a3ff3c" strokeWidth="2.5" strokeDasharray="6 3" />
              {/* Labels */}
              <text x="40" y="145" fill="#60a5fa" fontSize="11" fontWeight="600">Current: 62%</text>
              <text x="440" y="90" fill="#f5b942" fontSize="11" fontWeight="600">Forecast: 74%</text>
              <text x="400" y="30" fill="#a3ff3c" fontSize="11" fontWeight="600">With actions: 85%</text>
            </svg>
          </div>
          <div className="mt-3 p-2.5 bg-[#131815] rounded-md text-[11px] text-[#6e7a70] flex items-center gap-2">
            <Info className="w-3 h-3" />
            Forecast is based on current intervention completion rate, evidence response times and assessor capacity.
          </div>
        </Section>

        {/* Timeline Risk */}
        <Section title="Timeline Risk" icon={AlertTriangle}>
          <div className="space-y-2.5">
            {RISKS.map((r, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-[#e8efe9]">{r.risk}</span>
                <StatusChip status={r.level} tone={r.tone} />
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-red-500/5 border border-red-500/20 rounded-lg text-xs text-[#a8b3aa]">
            <AlertTriangle className="w-3 h-3 inline mr-1.5 text-red-400" />
            Mobilisation remains <strong className="text-red-400">at risk</strong> unless high-priority recovery actions are completed within <strong>7 days</strong>.
          </div>
        </Section>
      </div>

      {/* Milestone Detail Table */}
      <Section title="Milestone Detail" icon={Calendar} pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1c211e]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Milestone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Owner</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Due date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Blocker</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Next action</th>
              </tr>
            </thead>
            <tbody>
              {MILESTONES.map((m, i) => (
                <tr key={i} className="border-b border-[#1c211e] hover:bg-[#131815]/50">
                  <td className="px-4 py-3 text-xs font-medium text-[#e8efe9]">{m.milestone}</td>
                  <td className="px-4 py-3 text-[11px] text-[#6e7a70]">{m.owner}</td>
                  <td className="px-4 py-3 text-[11px] font-mono text-[#6e7a70]">{m.due}</td>
                  <td className="px-4 py-3"><StatusChip status={m.status} tone={m.tone} /></td>
                  <td className="px-4 py-3 text-[11px] text-[#6e7a70]">{m.blocker}</td>
                  <td className="px-4 py-3 text-[11px] text-[#a8b3aa]">{m.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Recovery Plan */}
      <Section title="Recovery Plan" icon={CheckCircle2} sub="Objective: Reach 85% readiness by mobilisation">
        <p className="text-xs font-semibold text-[#a8b3aa] mb-3">Recommended recovery actions:</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1c211e]">
                <th className="px-4 py-2 text-left text-xs font-medium text-[#6e7a70]">Action</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[#6e7a70]">Owner</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[#6e7a70]">Impact</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[#6e7a70]">Due</th>
              </tr>
            </thead>
            <tbody>
              {RECOVERY.map((r, i) => (
                <tr key={i} className="border-b border-[#1c211e]">
                  <td className="px-4 py-2.5 text-xs text-[#e8efe9]">{r.action}</td>
                  <td className="px-4 py-2.5 text-[11px] text-[#6e7a70]">{r.owner}</td>
                  <td className="px-4 py-2.5 text-xs font-semibold text-[#a3ff3c]">{r.impact}</td>
                  <td className="px-4 py-2.5 text-[11px] text-[#6e7a70]">{r.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium hover:bg-[#b4ff5c] transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Create Recovery Actions
        </button>
      </Section>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-[#6e7a70] py-4 border-t border-[#1c211e]">
        <span className="px-2 py-1 bg-[#131815] rounded border border-[#232a25] text-[10px]">Prototype</span>
        <span>Prototype view using illustrative data. Forecasts are indicative and based on configured assumptions.</span>
        <span className="ml-auto">Secured by verciti TRACE</span>
      </div>
    </div>
  );
}
