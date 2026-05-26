"use client";

import { useState } from "react";
import {
  Eye,
  Network,
  Globe,
  GraduationCap,
  Package,
  Share2,
  Lock,
  ChevronRight,
  ChevronDown,
  Gauge,
  Users,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Target,
  FileText,
  Download,
  BarChart3,
  Plus,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Stakeholder types and colors
const stakeholderTones = {
  anchor: { color: "#a3ff3c", soft: "rgba(163,255,60,0.10)", line: "rgba(163,255,60,0.30)", icon: Package, label: "Anchor Employer / Project Owner" },
  supply: { color: "#60a5fa", soft: "rgba(96,165,250,0.10)", line: "rgba(96,165,250,0.30)", icon: Share2, label: "Supply Chain Organisation" },
  gov: { color: "#c084fc", soft: "rgba(192,132,252,0.10)", line: "rgba(192,132,252,0.30)", icon: Globe, label: "Government / Funder" },
  provider: { color: "#f5b942", soft: "rgba(245,185,66,0.10)", line: "rgba(245,185,66,0.30)", icon: GraduationCap, label: "Education / Training Provider" },
};

type ViewType = "selector" | "anchor" | "supply" | "gov" | "provider";

function StatusChip({ status, children }: { status: string; children: React.ReactNode }) {
  const toneClasses = {
    ready: "bg-[#a3ff3c]/10 text-[#a3ff3c] border-[#a3ff3c]/20",
    risk: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blocked: "bg-red-500/10 text-red-400 border-red-500/20",
    evidence: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    training: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border", toneClasses[status as keyof typeof toneClasses] || toneClasses.info)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", 
        status === "ready" ? "bg-[#a3ff3c]" : 
        status === "risk" ? "bg-amber-400" : 
        status === "blocked" ? "bg-red-400" : 
        status === "training" ? "bg-violet-400" : "bg-blue-400"
      )} />
      {children}
    </span>
  );
}

function ProgressBar({ value, tone = "" }: { value: number; tone?: string }) {
  return (
    <div className="h-1.5 bg-[#131815] rounded-full overflow-hidden">
      <div 
        className={cn("h-full rounded-full transition-all", 
          tone === "warn" ? "bg-amber-400" : tone === "bad" ? "bg-red-400" : "bg-[#a3ff3c]"
        )} 
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

function Section({ title, sub, children, right, pad = true }: { title: string; sub?: string; children: React.ReactNode; right?: React.ReactNode; pad?: boolean }) {
  return (
    <div className="bg-[#0d1110] border border-[#1c211e] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1c211e]">
        <div>
          <h3 className="text-sm font-semibold text-[#e8efe9]">{title}</h3>
          {sub && <p className="text-xs text-[#6e7a70] mt-0.5">{sub}</p>}
        </div>
        {right}
      </div>
      <div className={pad ? "p-4" : ""}>{children}</div>
    </div>
  );
}

// View As Dropdown
function ViewAsDropdown({ value, onChange }: { value: ViewType; onChange: (v: ViewType) => void }) {
  const [open, setOpen] = useState(false);
  const opts: ViewType[] = ["selector", "anchor", "supply", "gov", "provider"];
  const labels: Record<ViewType, string> = { 
    selector: "Stakeholder Access (selector)", 
    anchor: stakeholderTones.anchor.label,
    supply: stakeholderTones.supply.label,
    gov: stakeholderTones.gov.label,
    provider: stakeholderTones.provider.label,
  };
  
  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-xs"
      >
        <span className="text-[#6e7a70]">View as</span>
        <span className="text-[#e8efe9] font-medium">{labels[value]}</span>
        <ChevronDown className="w-3 h-3 text-[#6e7a70]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-80 bg-[#0d1110] border border-[#1c211e] rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="px-3 py-2 border-b border-[#1c211e]">
              <span className="text-xs font-medium text-[#6e7a70]">Switch ecosystem view</span>
            </div>
            {opts.map(o => {
              const tone = o !== "selector" ? stakeholderTones[o as keyof typeof stakeholderTones] : null;
              return (
                <button
                  key={o}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#131815] transition-colors",
                    value === o && "bg-[#131815]"
                  )}
                  onClick={() => { onChange(o); setOpen(false); }}
                >
                  {tone ? <tone.icon className="w-4 h-4" style={{ color: tone.color }} /> : <Network className="w-4 h-4 text-[#6e7a70]" />}
                  <span className="flex-1 text-xs text-[#e8efe9]">{labels[o]}</span>
                  {value === o && <CheckCircle2 className="w-3.5 h-3.5 text-[#a3ff3c]" />}
                </button>
              );
            })}
            <div className="px-3 py-2 border-t border-[#1c211e]">
              <p className="text-[10px] text-[#6e7a70]">Role-based views shown for prototype purposes. Access would be governed by customer permissions.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Stakeholder Selector View
function StakeholderSelector({ onChoose }: { onChoose: (v: ViewType) => void }) {
  const cards = [
    {
      k: "anchor" as const,
      q: "Can our project ecosystem mobilise safely and on time?",
      sees: ["programme readiness", "supplier readiness", "role gaps", "safety-critical assurance", "evidence confidence", "mobilisation blockers", "intervention progress", "supplier discovery", "assurance reports"],
      actions: ["View supplier readiness", "Request evidence", "Invite supplier to requirement", "Assign interventions", "Generate assurance report", "Escalate mobilisation risk"],
      cta: "Enter Project Readiness View",
      visibility: "Full project ecosystem view",
    },
    {
      k: "supply" as const,
      q: "What do we need to provide or complete to become deployment-ready?",
      sees: ["own readiness score", "own workers and cohorts", "missing evidence", "assigned interventions", "expiry and revalidation risk", "site authorisation status", "project invitations", "readiness pack requests"],
      actions: ["Upload evidence", "Respond to readiness pack request", "Complete interventions", "Confirm worker availability", "Request assessor review", "View project requirements"],
      cta: "Enter Supplier Workspace",
      visibility: "Restricted to own organisation data",
    },
    {
      k: "gov" as const,
      q: "Are skills investments reducing infrastructure delivery risk?",
      sees: ["aggregated regional readiness", "project pipeline readiness", "priority roles", "skills gaps", "funded cohort outcomes", "training interventions", "provider capacity", "risk by sector and region"],
      actions: ["Export regional readiness report", "View sector gaps", "Monitor funded cohort outcomes", "Identify high-risk roles", "Compare regions or sectors"],
      cta: "Enter Regional Readiness View",
      visibility: "Aggregated and anonymised view",
    },
    {
      k: "provider" as const,
      q: "Which learners or cohorts need training, assessment or evidence to become employer-ready?",
      sees: ["assigned cohorts", "role pathways", "training modules", "assessment tasks", "evidence generated", "employer demand signals", "cohort readiness", "outstanding assessor sign-offs"],
      actions: ["Assign modules", "Schedule assessments", "Upload completion evidence", "Verify learner records", "Respond to employer demand", "Generate cohort readiness report"],
      cta: "Enter Provider Dashboard",
      visibility: "Cohort and provider-level view",
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-[#e8efe9]">Stakeholder Access</h1>
        <p className="text-sm text-[#6e7a70] mt-1">Access the workforce readiness ecosystem through the view relevant to your role.</p>
        <p className="text-xs text-[#6e7a70] mt-1.5 italic">Trace maintains a shared source of truth while tailoring dashboards, actions and data visibility for each stakeholder.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map(c => {
          const t = stakeholderTones[c.k];
          return (
            <div 
              key={c.k} 
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: t.line, background: `linear-gradient(180deg, ${t.soft}, transparent 70%)` }}
            >
              <div className="p-4">
                <div className="flex gap-3.5 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ background: t.soft, color: t.color, borderColor: t.line }}
                  >
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-wider uppercase mb-1" style={{ color: t.color }}>{t.label}</div>
                    <div className="text-base font-semibold text-[#e8efe9] leading-tight">{c.q}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-[10px] text-[#6e7a70] mb-1.5">Can see</div>
                  <div className="flex flex-wrap gap-1">
                    {c.sees.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#131815] border border-[#232a25] text-[10px] text-[#a8b3aa]">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-[10px] text-[#6e7a70] mb-1.5">Primary actions</div>
                  <div className="space-y-1">
                    {c.actions.map((a, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#a8b3aa]">
                        <ChevronRight className="w-3 h-3" style={{ color: t.color }} />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: t.line }}>
                <span 
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] border"
                  style={{ color: t.color, borderColor: t.line, background: t.soft }}
                >
                  <Lock className="w-3 h-3" />
                  {c.visibility}
                </span>
                <button 
                  onClick={() => onChoose(c.k)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                  style={{ background: t.color, color: "#0a0d0c" }}
                >
                  {c.cta}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-xs text-[#6e7a70] py-4 mt-4 border-t border-[#1c211e]">
        <span className="px-2 py-1 bg-[#131815] rounded border border-[#232a25] text-[10px]">Prototype</span>
        <span>Role-based access shown for prototype purposes. Actual access, data-sharing and evidence visibility would be governed by customer permissions, legal requirements and data-sharing agreements.</span>
      </div>
    </>
  );
}

// Shared Components for Views
function QuestionCard({ tone, q, statusLabel, statusTone, reason }: { tone: keyof typeof stakeholderTones; q: string; statusLabel: string; statusTone: string; reason: string }) {
  const t = stakeholderTones[tone];
  return (
    <div className="p-4 rounded-xl border mb-4" style={{ background: `linear-gradient(180deg, ${t.soft}, transparent 70%)`, borderColor: t.line }}>
      <div className="flex items-center gap-2.5 mb-2">
        <AlertTriangle className="w-3.5 h-3.5" style={{ color: t.color }} />
        <span className="text-[10px] tracking-wider uppercase" style={{ color: t.color }}>The question this view answers</span>
        <StatusChip status={statusTone}>{statusLabel}</StatusChip>
      </div>
      <div className="text-lg font-semibold text-[#e8efe9] mb-2">{q}</div>
      <div className="text-xs text-[#6e7a70]">{reason}</div>
    </div>
  );
}

function ViewHeader({ tone, title, subtitle, view, setView, actions }: { tone: keyof typeof stakeholderTones; title: string; subtitle: string; view: ViewType; setView: (v: ViewType) => void; actions?: React.ReactNode }) {
  const t = stakeholderTones[tone];
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] border" style={{ color: t.color, borderColor: t.line, background: t.soft }}>
            <t.icon className="w-3 h-3" />
            {t.label}
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-[#e8efe9]">{title}</h1>
        <p className="text-sm text-[#6e7a70] mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <ViewAsDropdown value={view} onChange={setView} />
        {actions}
      </div>
    </div>
  );
}

function VisibilityBadge({ tone, label, sub }: { tone: keyof typeof stakeholderTones; label: string; sub: string }) {
  const t = stakeholderTones[tone];
  return (
    <div className="p-3 bg-[#131815] rounded-lg flex items-start gap-2.5">
      <Eye className="w-3.5 h-3.5 mt-0.5" style={{ color: t.color }} />
      <div>
        <div className="text-xs font-semibold text-[#e8efe9]">Visibility: {label}</div>
        <div className="text-[11px] text-[#6e7a70] mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

// Anchor Employer View
function AnchorEmployerView({ view, setView }: { view: ViewType; setView: (v: ViewType) => void }) {
  return (
    <>
      <ViewHeader
        tone="anchor"
        title="Project Readiness Command Centre"
        subtitle="Programme-level workforce readiness, supplier assurance and mobilisation risk."
        view={view} setView={setView}
        actions={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium">
              <Share2 className="w-3.5 h-3.5" />Invite supplier
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium">
              <Download className="w-3.5 h-3.5" />Export board summary
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />Escalate risk
            </button>
          </div>
        }
      />

      <QuestionCard 
        tone="anchor" 
        q="Can our project ecosystem mobilise safely and on time?"
        statusLabel="At Risk" 
        statusTone="risk"
        reason="High-voltage authorisation gaps and hydrogen emergency response refreshers are delaying readiness."
      />

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {[
          { icon: Gauge, label: "Programme Readiness", value: "67%", sub: "At Risk", tone: "warn" },
          { icon: Share2, label: "Suppliers Mapped", value: "24", sub: "6 Tier 1 - 11 Tier 2", tone: "" },
          { icon: Users, label: "Workers Tracked", value: "860", sub: "Across project ecosystem", tone: "" },
          { icon: CheckCircle2, label: "Deployment-ready", value: "412", sub: "Verified", tone: "ok" },
          { icon: AlertTriangle, label: "Critical Blockers", value: "5", sub: "Affecting mobilisation", tone: "bad" },
          { icon: ShieldCheck, label: "Evidence Confidence", value: "Medium", sub: "71% verified", tone: "warn" },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#0d1110] border border-[#1c211e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#131815] flex items-center justify-center">
                <kpi.icon className="w-3.5 h-3.5 text-[#6e7a70]" />
              </div>
              <span className="text-xs text-[#6e7a70]">{kpi.label}</span>
            </div>
            <div className={cn("text-xl font-semibold", kpi.tone === "ok" ? "text-[#a3ff3c]" : kpi.tone === "warn" ? "text-amber-400" : kpi.tone === "bad" ? "text-red-400" : "text-[#e8efe9]")}>{kpi.value}</div>
            <div className={cn("text-[11px] mt-0.5", kpi.tone === "ok" ? "text-[#a3ff3c]/70" : kpi.tone === "warn" ? "text-amber-400/70" : kpi.tone === "bad" ? "text-red-400/70" : "text-[#6e7a70]")}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 space-y-4">
          {/* Supplier Readiness Table */}
          <Section title="Supplier Readiness Overview" sub="Tier 1 and Tier 2 suppliers mapped to active project clusters" pad={false}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1c211e]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Supplier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Tier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] w-32">Readiness</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Evidence</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Key Risk</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["GreenVolt Ltd", "Tier 1", 71, "Level 3.7", "risk", "At Risk", "HV evidence missing"],
                  ["Northern Power Services", "Tier 1", 82, "Level 4", "ready", "Ready", "Low expiry risk"],
                  ["HydraGen Solutions", "Tier 2", 68, "Level 3", "risk", "Conditional", "Refresher due"],
                  ["FieldCore Engineering", "Tier 2", 59, "Level 2", "evidence", "Evidence Required", "Missing certificates"],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-[#1c211e] hover:bg-[#131815]/50">
                    <td className="px-4 py-3 text-sm font-medium text-[#e8efe9]">{r[0]}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-[#131815] border border-[#232a25] text-[10px] text-[#a8b3aa]">{r[1]}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1"><ProgressBar value={r[2] as number} tone={(r[2] as number) < 65 ? "bad" : (r[2] as number) < 75 ? "warn" : ""} /></div>
                        <span className="text-[11px] font-mono text-[#a8b3aa]">{r[2]}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[11px] font-mono text-[#a8b3aa]">{r[3]}</td>
                    <td className="px-4 py-3"><StatusChip status={r[4] as string}>{r[5]}</StatusChip></td>
                    <td className="px-4 py-3 text-xs text-[#6e7a70]">{r[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Role Gaps Table */}
          <Section title="Role Gaps" sub="Where deployable headcount falls short of programme requirement" pad={false}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1c211e]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Role</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Needed</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Ready</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Gap</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Risk</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Electrical Installer", 120, 76, 44, "risk", "Amber"],
                  ["Hydrogen Technician", 80, 52, 28, "risk", "Amber"],
                  ["High-Voltage Engineer", 35, 19, 16, "blocked", "Red"],
                  ["Emergency Response Lead", 12, 7, 5, "blocked", "Red"],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-[#1c211e]">
                    <td className="px-4 py-3 text-xs font-medium text-[#e8efe9]">{r[0]}</td>
                    <td className="px-4 py-3 text-right text-[11px] font-mono text-[#6e7a70]">{r[1]}</td>
                    <td className="px-4 py-3 text-right text-[11px] font-mono text-[#a3ff3c]">{r[2]}</td>
                    <td className={cn("px-4 py-3 text-right text-[11px] font-mono", r[4] === "blocked" ? "text-red-400" : "text-amber-400")}>{r[3]}</td>
                    <td className="px-4 py-3"><StatusChip status={r[4] as string}>{r[5]}</StatusChip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>

        <div className="col-span-5 space-y-4">
          {/* Top Blockers */}
          <Section title="Top Mobilisation Blockers" sub="Cross-supplier issues delaying deployment">
            <div className="space-y-2">
              {[
                ["HV authorisation evidence missing for Supplier B", "bad"],
                ["Hydrogen emergency response refresher overdue for night-shift cohort", "bad"],
                ["Practical assessment records pending for Cohort 3", "warn"],
                ["Permit-to-work supervisor coverage insufficient", "warn"],
                ["Site induction schedule not confirmed", "warn"],
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2.5 bg-[#131815] rounded-lg">
                  <AlertTriangle className={cn("w-3 h-3", b[1] === "bad" ? "text-red-400" : "text-amber-400")} />
                  <span className="flex-1 text-xs text-[#e8efe9]">{b[0]}</span>
                  <StatusChip status={b[1] === "bad" ? "blocked" : "risk"}>{b[1] === "bad" ? "High" : "Medium"}</StatusChip>
                </div>
              ))}
            </div>
          </Section>

          {/* Actions */}
          <Section title="Anchor Employer Actions" sub="Cross-ecosystem coordination">
            <div className="space-y-2">
              {[
                { icon: FileText, label: "Request supplier evidence", primary: true },
                { icon: Plus, label: "Invite supplier to requirement", primary: false },
                { icon: Target, label: "Assign intervention", primary: false },
                { icon: BarChart3, label: "Generate assurance report", primary: false },
                { icon: AlertTriangle, label: "Escalate mobilisation risk", primary: false },
                { icon: Download, label: "Export board summary", primary: false },
              ].map((action, i) => (
                <button key={i} className={cn(
                  "w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors",
                  action.primary ? "bg-[#a3ff3c] text-[#0a0d0c]" : "bg-[#131815] border border-[#232a25] text-[#e8efe9] hover:bg-[#1c211e]"
                )}>
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </Section>

          <VisibilityBadge 
            tone="anchor"
            label="Full project ecosystem view"
            sub="Can view supplier readiness, role gaps and evidence confidence across connected project organisations."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-[#6e7a70] py-4 mt-4 border-t border-[#1c211e]">
        <span className="px-2 py-1 bg-[#131815] rounded border border-[#232a25] text-[10px]">Prototype</span>
        <span>Prototype view using illustrative data. Not live customer data. Role-based views shown for prototype purposes.</span>
      </div>
    </>
  );
}

// Supply Chain View
function SupplyChainView({ view, setView }: { view: ViewType; setView: (v: ViewType) => void }) {
  return (
    <>
      <ViewHeader
        tone="supply"
        title="Supplier Readiness Workspace"
        subtitle="Your organisation's readiness status, evidence gaps, project invitations and required actions."
        view={view} setView={setView}
        actions={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium">
              <FileText className="w-3.5 h-3.5" />Upload evidence
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium">
              <Plus className="w-3.5 h-3.5" />Respond to request
            </button>
          </div>
        }
      />

      <QuestionCard 
        tone="supply" 
        q="What do we need to provide or complete to become deployment-ready?"
        statusLabel="Conditional" 
        statusTone="risk"
        reason="Evidence and refresher actions are required before full deployment authorisation."
      />

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {[
          { icon: Gauge, label: "Organisation Readiness", value: "71%", sub: "Conditional", tone: "warn" },
          { icon: Users, label: "Workers Mapped", value: "126", sub: "Across 5 roles", tone: "" },
          { icon: CheckCircle2, label: "Deployment-ready", value: "68", sub: "Verified", tone: "ok" },
          { icon: FileText, label: "Evidence Required", value: "19", sub: "Missing or incomplete", tone: "warn" },
          { icon: Clock, label: "Expiring Soon", value: "14", sub: "Within 60 days", tone: "warn" },
          { icon: Target, label: "Open Actions", value: "17", sub: "5 high priority", tone: "bad" },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#0d1110] border border-[#1c211e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#131815] flex items-center justify-center">
                <kpi.icon className="w-3.5 h-3.5 text-[#6e7a70]" />
              </div>
              <span className="text-xs text-[#6e7a70]">{kpi.label}</span>
            </div>
            <div className={cn("text-xl font-semibold", kpi.tone === "ok" ? "text-[#a3ff3c]" : kpi.tone === "warn" ? "text-amber-400" : kpi.tone === "bad" ? "text-red-400" : "text-[#e8efe9]")}>{kpi.value}</div>
            <div className={cn("text-[11px] mt-0.5", kpi.tone === "ok" ? "text-[#a3ff3c]/70" : kpi.tone === "warn" ? "text-amber-400/70" : kpi.tone === "bad" ? "text-red-400/70" : "text-[#6e7a70]")}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 space-y-4">
          <Section title="My Readiness Gaps" sub="Items blocking full deployment authorisation">
            <div className="space-y-2.5">
              {[
                ["HV authorisation evidence missing", "8 workers affected", "bad"],
                ["Emergency response refresher overdue", "12 workers affected", "bad"],
                ["Site induction records missing", "Cohort GV-12", "warn"],
                ["Employer sign-off pending", "9 electrical installers", "warn"],
              ].map((g, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-[#131815] rounded-lg">
                  <AlertTriangle className={cn("w-3.5 h-3.5 mt-0.5", g[2] === "bad" ? "text-red-400" : "text-amber-400")} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-[#e8efe9]">{g[0]}</div>
                    <div className="text-[11px] text-[#6e7a70] mt-0.5">{g[1]}</div>
                  </div>
                  <button className="px-2.5 py-1 rounded bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 text-[#a3ff3c] text-[10px] font-medium">Resolve</button>
                </div>
              ))}
            </div>
          </Section>

          <Section title="My Workers / Cohorts" pad={false}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1c211e]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Worker / Cohort</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Key Issue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["GV-H2-047", "Hydrogen Technician", "risk", "Conditional", "Refresher Due"],
                  ["GV-ELEC-118", "Electrical Installer", "evidence", "Evidence Required", "Missing sign-off"],
                  ["GV-HV-033", "High-Voltage Engineer", "blocked", "Blocked", "Missing HV authorisation"],
                  ["Cohort GV-12", "Mixed Site Team", "evidence", "Evidence Required", "Induction missing"],
                  ["GV-MAINT-021", "Maintenance Technician", "ready", "Deployment-ready", "Verified"],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-[#1c211e]">
                    <td className="px-4 py-3"><span className="text-xs font-mono text-[#a3ff3c]">{r[0]}</span></td>
                    <td className="px-4 py-3 text-xs text-[#a8b3aa]">{r[1]}</td>
                    <td className="px-4 py-3"><StatusChip status={r[2]}>{r[3]}</StatusChip></td>
                    <td className="px-4 py-3 text-xs text-[#6e7a70]">{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>

        <div className="col-span-5 space-y-4">
          <Section title="My Required Actions" sub="Steps to move toward Deployment-ready">
            <div className="space-y-2">
              {[
                { icon: FileText, label: "Upload HV authorisation evidence", primary: true },
                { icon: GraduationCap, label: "Schedule H2 refresher", primary: false },
                { icon: FileText, label: "Submit site induction records", primary: false },
                { icon: CheckCircle2, label: "Confirm worker availability", primary: false },
                { icon: Users, label: "Request assessor review", primary: false },
                { icon: Share2, label: "Respond to project requirement", primary: false },
              ].map((action, i) => (
                <button key={i} className={cn(
                  "w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors",
                  action.primary ? "bg-[#a3ff3c] text-[#0a0d0c]" : "bg-[#131815] border border-[#232a25] text-[#e8efe9] hover:bg-[#1c211e]"
                )}>
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </Section>

          <VisibilityBadge 
            tone="supply"
            label="Own organisation view"
            sub="Can view own workers, evidence gaps, assigned actions and project requests. Cannot view other suppliers' workforce records."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-[#6e7a70] py-4 mt-4 border-t border-[#1c211e]">
        <span className="px-2 py-1 bg-[#131815] rounded border border-[#232a25] text-[10px]">Prototype</span>
        <span>Prototype view using illustrative data. Not live customer data.</span>
      </div>
    </>
  );
}

// Government View (simplified)
function GovernmentView({ view, setView }: { view: ViewType; setView: (v: ViewType) => void }) {
  return (
    <>
      <ViewHeader
        tone="gov"
        title="Regional Workforce Readiness View"
        subtitle="Aggregated readiness intelligence linking skills investment to infrastructure delivery risk."
        view={view} setView={setView}
        actions={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium">
              <Download className="w-3.5 h-3.5" />Export report
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium">
              <BarChart3 className="w-3.5 h-3.5" />Policy briefing
            </button>
          </div>
        }
      />

      <QuestionCard 
        tone="gov" 
        q="Are skills investments reducing infrastructure delivery risk?"
        statusLabel="Partially" 
        statusTone="risk"
        reason="Funded cohorts are progressing, but high-voltage and hydrogen emergency response roles remain at risk."
      />

      {/* Visibility banner */}
      <div className="p-3 bg-[#131815] border border-violet-500/20 rounded-lg mb-4 flex items-start gap-2.5">
        <Eye className="w-3.5 h-3.5 text-violet-400 mt-0.5" />
        <div>
          <div className="text-xs font-semibold text-violet-400">Aggregated and anonymised view</div>
          <div className="text-xs text-[#6e7a70] mt-0.5">This view does not show individual worker records or supplier-sensitive evidence.</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {[
          { icon: Package, label: "Regional Programmes Mapped", value: "8", sub: "Across priority sectors", tone: "" },
          { icon: Share2, label: "Employers / Suppliers", value: "64", sub: "Project ecosystem participants", tone: "" },
          { icon: Users, label: "Learners / Workers Tracked", value: "3,420", sub: "Aggregated view", tone: "" },
          { icon: Target, label: "Priority Roles", value: "18", sub: "Linked to infrastructure demand", tone: "" },
          { icon: AlertTriangle, label: "Readiness Gap", value: "712", sub: "Workers needed for priority roles", tone: "warn" },
          { icon: GraduationCap, label: "Funded Cohorts Linked", value: "23", sub: "Skills funding connected to projects", tone: "" },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#0d1110] border border-[#1c211e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#131815] flex items-center justify-center">
                <kpi.icon className="w-3.5 h-3.5 text-[#6e7a70]" />
              </div>
              <span className="text-xs text-[#6e7a70]">{kpi.label}</span>
            </div>
            <div className={cn("text-xl font-semibold", kpi.tone === "warn" ? "text-amber-400" : "text-[#e8efe9]")}>{kpi.value}</div>
            <div className={cn("text-[11px] mt-0.5", kpi.tone === "warn" ? "text-amber-400/70" : "text-[#6e7a70]")}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <Section title="Readiness by Sector" sub="Aggregated readiness across regional priority sectors" pad={false}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1c211e]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Sector</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] w-36">Readiness</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Gap</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Risk</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hydrogen", 72, "248", "risk", "Amber"],
                  ["Electrification", 64, "312", "risk", "Amber"],
                  ["Advanced Nuclear / SMR", null, "N/A", "training", "Future pathway"],
                  ["Offshore Wind", 69, "152", "risk", "Amber"],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-[#1c211e]">
                    <td className="px-4 py-3 text-xs font-medium text-[#e8efe9]">{r[0]}</td>
                    <td className="px-4 py-3">
                      {r[1] ? (
                        <div className="flex items-center gap-2">
                          <div className="flex-1"><ProgressBar value={r[1] as number} tone="warn" /></div>
                          <span className="text-[11px] font-mono text-[#a8b3aa]">{r[1]}%</span>
                        </div>
                      ) : <span className="text-[11px] text-[#6e7a70]">Illustrative</span>}
                    </td>
                    <td className="px-4 py-3 text-right text-[11px] font-mono text-[#a8b3aa]">{r[2]}</td>
                    <td className="px-4 py-3"><StatusChip status={r[3] as string}>{r[4]}</StatusChip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>

        <div className="col-span-6">
          <Section title="Policy Actions">
            <div className="space-y-2">
              {[
                { icon: Download, label: "Export regional readiness report", primary: true },
                { icon: BarChart3, label: "View sector gaps", primary: false },
                { icon: TrendingUp, label: "Monitor funded cohort outcomes", primary: false },
                { icon: Target, label: "Identify high-risk roles", primary: false },
                { icon: Globe, label: "Compare regions or sectors", primary: false },
              ].map((action, i) => (
                <button key={i} className={cn(
                  "w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors",
                  action.primary ? "bg-[#a3ff3c] text-[#0a0d0c]" : "bg-[#131815] border border-[#232a25] text-[#e8efe9] hover:bg-[#1c211e]"
                )}>
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-[#6e7a70] py-4 mt-4 border-t border-[#1c211e]">
        <span className="px-2 py-1 bg-[#131815] rounded border border-[#232a25] text-[10px]">Prototype</span>
        <span>Prototype view using illustrative data.</span>
      </div>
    </>
  );
}

// Provider View (simplified)
function ProviderView({ view, setView }: { view: ViewType; setView: (v: ViewType) => void }) {
  return (
    <>
      <ViewHeader
        tone="provider"
        title="Provider Dashboard"
        subtitle="Cohort training, assessments and employer readiness signals."
        view={view} setView={setView}
        actions={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium">
              <Download className="w-3.5 h-3.5" />Export cohort report
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium">
              <GraduationCap className="w-3.5 h-3.5" />Assign modules
            </button>
          </div>
        }
      />

      <QuestionCard 
        tone="provider" 
        q="Which learners or cohorts need training, assessment or evidence to become employer-ready?"
        statusLabel="In Progress" 
        statusTone="risk"
        reason="Active cohorts are progressing toward readiness. 23 practical assessments pending sign-off."
      />

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {[
          { icon: Users, label: "Active Learners", value: "312", sub: "Across 8 cohorts", tone: "" },
          { icon: GraduationCap, label: "Modules Assigned", value: "48", sub: "This quarter", tone: "" },
          { icon: CheckCircle2, label: "Assessments Complete", value: "186", sub: "This quarter", tone: "ok" },
          { icon: Clock, label: "Assessments Pending", value: "23", sub: "Awaiting sign-off", tone: "warn" },
          { icon: FileText, label: "Evidence Generated", value: "2,140", sub: "Linked to readiness rules", tone: "" },
          { icon: Target, label: "Employer Demand Signals", value: "12", sub: "Active requirements", tone: "" },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#0d1110] border border-[#1c211e] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#131815] flex items-center justify-center">
                <kpi.icon className="w-3.5 h-3.5 text-[#6e7a70]" />
              </div>
              <span className="text-xs text-[#6e7a70]">{kpi.label}</span>
            </div>
            <div className={cn("text-xl font-semibold", kpi.tone === "ok" ? "text-[#a3ff3c]" : kpi.tone === "warn" ? "text-amber-400" : "text-[#e8efe9]")}>{kpi.value}</div>
            <div className={cn("text-[11px] mt-0.5", kpi.tone === "ok" ? "text-[#a3ff3c]/70" : kpi.tone === "warn" ? "text-amber-400/70" : "text-[#6e7a70]")}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <Section title="My Cohorts" pad={false}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1c211e]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Cohort</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Learners</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Pathway</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] w-28">Progress</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hydrogen Cohort 3", 45, "Hydrogen Technician", 78, "training", "In Training"],
                  ["HV Engineering Pathway", 18, "HV Engineer", 62, "risk", "At Risk"],
                  ["Electrical Installer Bootcamp", 32, "Electrical Installer", 91, "ready", "Near Complete"],
                  ["Safety-Critical Refresher", 24, "Multi-role", 45, "evidence", "Evidence Pending"],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-[#1c211e]">
                    <td className="px-4 py-3 text-xs font-medium text-[#e8efe9]">{r[0]}</td>
                    <td className="px-4 py-3 text-right text-[11px] font-mono text-[#a8b3aa]">{r[1]}</td>
                    <td className="px-4 py-3 text-xs text-[#6e7a70]">{r[2]}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1"><ProgressBar value={r[3] as number} /></div>
                        <span className="text-[11px] font-mono text-[#a8b3aa]">{r[3]}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusChip status={r[4] as string}>{r[5]}</StatusChip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>

        <div className="col-span-5 space-y-4">
          <Section title="Provider Actions">
            <div className="space-y-2">
              {[
                { icon: GraduationCap, label: "Assign modules", primary: true },
                { icon: Clock, label: "Schedule assessments", primary: false },
                { icon: FileText, label: "Upload completion evidence", primary: false },
                { icon: CheckCircle2, label: "Verify learner records", primary: false },
                { icon: Target, label: "Respond to employer demand", primary: false },
                { icon: Download, label: "Generate cohort readiness report", primary: false },
              ].map((action, i) => (
                <button key={i} className={cn(
                  "w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors",
                  action.primary ? "bg-[#a3ff3c] text-[#0a0d0c]" : "bg-[#131815] border border-[#232a25] text-[#e8efe9] hover:bg-[#1c211e]"
                )}>
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </Section>

          <VisibilityBadge 
            tone="provider"
            label="Cohort and provider-level view"
            sub="Can view assigned cohorts, training modules and generated evidence. Cannot view employer-level workforce records."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs text-[#6e7a70] py-4 mt-4 border-t border-[#1c211e]">
        <span className="px-2 py-1 bg-[#131815] rounded border border-[#232a25] text-[10px]">Prototype</span>
        <span>Prototype view using illustrative data.</span>
      </div>
    </>
  );
}

// Main Component
export function StakeholderAccess() {
  const [view, setView] = useState<ViewType>("selector");

  return (
    <div>
      {view === "selector" && <StakeholderSelector onChoose={setView} />}
      {view === "anchor" && <AnchorEmployerView view={view} setView={setView} />}
      {view === "supply" && <SupplyChainView view={view} setView={setView} />}
      {view === "gov" && <GovernmentView view={view} setView={setView} />}
      {view === "provider" && <ProviderView view={view} setView={setView} />}
    </div>
  );
}
