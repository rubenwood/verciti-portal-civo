"use client";

import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  Clock,
  Calendar,
  Download,
  ExternalLink,
  ChevronRight,
  Hash,
  CheckCircle2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Data
const SUBMISSION_TIMELINE = [
  { date: "May 10, 2026", title: "Q2 ONR EIMT submission - upcoming", status: "warn", artefacts: 2412 },
  { date: "Apr 02, 2026", title: "Q1 ONR EIMT submission", status: "ok", artefacts: 2104 },
  { date: "Mar 18, 2026", title: "RR-MAP-04 acceptance - MEP-2208 module", status: "ok", artefacts: 622 },
  { date: "Feb 28, 2026", title: "ASME XI quarterly attestation", status: "ok", artefacts: 980 },
  { date: "Feb 04, 2026", title: "IAEA SSG-74 desk review", status: "ok", artefacts: 1204 },
];

const COMPLIANCE_FRAMES = [
  { code: "ONR SAP / EIMT", coverage: 97.2, artefacts: 2412, status: "ok" },
  { code: "ASME XI", coverage: 94.8, artefacts: 1840, status: "ok" },
  { code: "IAEA SSG-74", coverage: 98.1, artefacts: 1204, status: "ok" },
  { code: "RR-MAP-04", coverage: 91.4, artefacts: 622, status: "warn" },
  { code: "ISO 9712", coverage: 96.3, artefacts: 980, status: "ok" },
  { code: "IEEE Class 1E", coverage: 88.2, artefacts: 342, status: "warn" },
];

const OPEN_ACTIONS = [
  { id: "RA-2026-118", desc: "ASME XI - IWA-2440 - augmented examination evidence missing for MM-3104 weld 09", due: "2 days", owner: "E. Okafor" },
  { id: "RA-2026-117", desc: "RR-MAP-04 - §6.3 - Module acceptance walkdown approval pending for MEP-2204", due: "5 days", owner: "M. Wojcik" },
  { id: "RA-2026-114", desc: "ONR LC-28 - Annual examination schedule attestation for fleet QPD-04 / 07", due: "11 days", owner: "J. Lindqvist (ONR)" },
];

const AUDIT_LOG = [
  { ts: "07:12:04", actor: "E. Okafor", evt: "Evidence approved", obj: "EV-04822/142", hash: "0x7a2f...c4d1" },
  { ts: "07:11:58", actor: "System", evt: "Hash chain sealed", obj: "TR-2026-04822", hash: "0xc40a...99fb" },
  { ts: "07:11:42", actor: "Trace Engine", evt: "Clause coverage recalculated", obj: "ONR SAP", hash: "0x3b1e...8f22" },
  { ts: "07:10:18", actor: "M. Wojcik", evt: "Run dispatched", obj: "TR-2026-04823", hash: "0x9c4d...2a17" },
  { ts: "07:09:55", actor: "System", evt: "Artefact ingested", obj: "EV-04822/141", hash: "0x5e8f...7b33" },
  { ts: "07:08:22", actor: "P. Anand", evt: "Finding reviewed", obj: "F-04821-02", hash: "0x1d4c...9e55" },
];

function StatusChip({ status, children }: { status: string; children: React.ReactNode }) {
  const toneClasses = {
    ok: "bg-[#a3ff3c]/10 text-[#a3ff3c] border-[#a3ff3c]/20",
    warn: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    bad: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border", toneClasses[status as keyof typeof toneClasses] || toneClasses.info)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", status === "ok" ? "bg-[#a3ff3c]" : status === "warn" ? "bg-amber-400" : status === "bad" ? "bg-red-400" : "bg-blue-400")} />
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
        style={{ width: `${value}%` }}
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

function SubTabs({ items, value, onChange }: { items: { id: string; label: string; count?: number }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 border-b border-[#1c211e] mb-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
            value === item.id
              ? "text-[#a3ff3c] border-[#a3ff3c]"
              : "text-[#6e7a70] border-transparent hover:text-[#a8b3aa]"
          )}
        >
          {item.label}
          {item.count !== undefined && <span className="text-[#6e7a70] ml-1">- {item.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function Reports() {
  const [tab, setTab] = useState("submissions");

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8efe9]">Reports</h1>
          <p className="text-sm text-[#6e7a70] mt-1">Auto-bundled assurance reports - regulator-ready - cryptographically chained back to source evidence</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium">
            <Calendar className="w-3.5 h-3.5" />
            Submission window: 6d
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium">
            <Download className="w-3.5 h-3.5" />
            Generate ONR pack (.pdf + .assp)
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium">
            <ExternalLink className="w-3.5 h-3.5" />
            Open ONR portal
          </button>
        </div>
      </div>

      <SubTabs
        items={[
          { id: "submissions", label: "Regulatory Submissions" },
          { id: "frameworks", label: "Compliance Frameworks", count: 6 },
          { id: "actions", label: "Open Actions", count: 3 },
          { id: "audit", label: "Audit Trail" },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === "submissions" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: ShieldCheck, value: "96.6%", label: "Mean clause coverage", color: "text-[#a3ff3c]" },
              { icon: FileText, value: "6,400", label: "Mapped artefacts", color: "text-[#a3ff3c]" },
              { icon: AlertTriangle, value: "2", label: "Frameworks needing action", color: "text-amber-400" },
              { icon: Clock, value: "6d", label: "Until next ONR window", color: "text-blue-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0d1110] border border-[#1c211e] rounded-xl p-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", 
                  stat.color === "text-[#a3ff3c]" ? "bg-[#a3ff3c]/10" : 
                  stat.color === "text-amber-400" ? "bg-amber-500/10" : "bg-blue-500/10"
                )}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className={cn("text-2xl font-semibold", stat.color)}>{stat.value}</div>
                <div className="text-xs text-[#6e7a70] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Submission Timeline */}
          <Section title="Submission timeline" sub="Auto-bundled by Trace from sealed evidence" pad>
            <div className="space-y-3.5">
              {SUBMISSION_TIMELINE.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-[#6e7a70] w-24">{s.date}</span>
                  <span className={cn("w-2 h-2 rounded-full", s.status === "ok" ? "bg-[#a3ff3c] shadow-[0_0_8px_rgba(163,255,60,0.3)]" : "bg-amber-400 shadow-[0_0_8px_rgba(245,185,66,0.3)]")} />
                  <span className="flex-1 text-xs text-[#e8efe9]">{s.title}</span>
                  <span className="text-[11px] font-mono text-[#6e7a70] mr-3">{s.artefacts.toLocaleString()} artefacts</span>
                  <StatusChip status={s.status}>{s.status === "ok" ? "Submitted" : "Upcoming"}</StatusChip>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {tab === "frameworks" && (
        <Section title="Frameworks evidenced by Trace" sub="Each clause auto-mapped to sealed evidence" pad={false}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1c211e]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Framework</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Coverage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Artefacts</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Last refresh</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {COMPLIANCE_FRAMES.map((c, i) => (
                <tr key={i} className="border-b border-[#1c211e] hover:bg-[#131815]/50">
                  <td className="px-4 py-3 text-xs font-medium text-[#e8efe9]">{c.code}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 w-44">
                      <div className="flex-1"><ProgressBar value={c.coverage} tone={c.status === "warn" ? "warn" : ""} /></div>
                      <span className="text-[11px] font-mono text-[#6e7a70]">{c.coverage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[11px] font-mono text-[#6e7a70]">{c.artefacts.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[11px] text-[#6e7a70]">{["3 min ago", "5 min ago", "12 min ago", "1 h ago", "42 min ago", "2 min ago"][i]}</td>
                  <td className="px-4 py-3"><StatusChip status={c.status}>{c.status === "ok" ? "Current" : "Action needed"}</StatusChip></td>
                  <td className="px-4 py-3"><ChevronRight className="w-4 h-4 text-[#6e7a70]" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {tab === "actions" && (
        <Section title="Open regulatory actions" sub="Items blocking next submission window">
          <div className="space-y-3">
            {OPEN_ACTIONS.map((r) => (
              <div key={r.id} className="p-3 bg-[#131815] rounded-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-[#a3ff3c]">{r.id}</span>
                  <StatusChip status="warn">Due {r.due}</StatusChip>
                </div>
                <p className="text-xs text-[#e8efe9] mb-2">{r.desc}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#6e7a70]">
                  <User className="w-3 h-3" />
                  {r.owner}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {tab === "audit" && (
        <Section title="Live event stream" sub="Append-only - cryptographically chained - 8.4M events" right={<span className="flex items-center gap-1.5 text-xs text-[#a3ff3c]"><span className="w-1.5 h-1.5 rounded-full bg-[#a3ff3c] animate-pulse" />Streaming</span>} pad={false}>
          <div>
            {AUDIT_LOG.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-[#1c211e] hover:bg-[#131815]/50">
                <Hash className="w-3.5 h-3.5 text-[#a3ff3c]" />
                <span className="text-[11px] font-mono text-[#6e7a70] w-16">{a.ts}</span>
                <span className="px-2 py-0.5 rounded bg-[#131815] border border-[#232a25] text-[10px] text-[#a8b3aa]">{a.actor}</span>
                <span className="flex-1 text-xs text-[#e8efe9]">{a.evt}</span>
                <span className="text-xs font-mono text-[#6e7a70]">{a.obj}</span>
                <span className="text-[10px] font-mono text-[#6e7a70]">{a.hash}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a3ff3c]" />
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
