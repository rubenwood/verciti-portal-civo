"use client";

import { useState } from "react";
import {
  Search,
  Download,
  Plus,
  Share2,
  Target,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileText,
  TrendingUp,
  Package,
  ChevronRight,
  ChevronDown,
  X,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Supplier {
  name: string;
  match: number;
  readiness: number;
  evidence: string;
  workers: number;
  roles: string;
  expiry: string;
  status: string;
  statusLabel: string;
}

// Data
const suppliers: Supplier[] = [
  { name: "GreenVolt Ltd", match: 92, readiness: 81, evidence: "Level 4", workers: 42, roles: "5 / 5", expiry: "Low", status: "ready", statusLabel: "Suitable" },
  { name: "Northern Power Services", match: 87, readiness: 76, evidence: "Level 3", workers: 35, roles: "4 / 5", expiry: "Medium", status: "risk", statusLabel: "Conditional" },
  { name: "HydraGen Solutions", match: 79, readiness: 72, evidence: "Level 4", workers: 28, roles: "4 / 5", expiry: "Low", status: "ready", statusLabel: "Suitable" },
  { name: "FieldCore Engineering", match: 64, readiness: 59, evidence: "Level 2", workers: 18, roles: "3 / 5", expiry: "High", status: "evidence", statusLabel: "Evidence Required" },
  { name: "ElecPro Systems", match: 74, readiness: 69, evidence: "Level 3", workers: 22, roles: "4 / 5", expiry: "Medium", status: "risk", statusLabel: "Conditional" },
  { name: "SafeGrid Services", match: 68, readiness: 63, evidence: "Level 3", workers: 15, roles: "3 / 5", expiry: "Medium", status: "evidence", statusLabel: "Evidence Required" },
];

const ROLE_REQUIREMENTS = [
  { role: "Electrical Installer", needed: 60, matched: 78, gap: "+18", status: "ready", risk: "Green" },
  { role: "High-Voltage Engineer", needed: 24, matched: 21, gap: "-3", status: "risk", risk: "Amber" },
  { role: "Hydrogen Technician", needed: 40, matched: 46, gap: "+6", status: "ready", risk: "Green" },
  { role: "Emergency Response Lead", needed: 10, matched: 8, gap: "-2", status: "risk", risk: "Amber" },
  { role: "Maintenance Technician", needed: 30, matched: 33, gap: "+3", status: "ready", risk: "Green" },
];

const ENGAGEMENT_QUEUE = [
  { supplier: "GreenVolt Ltd", action: "Readiness pack review", owner: "M. Patel", due: "7 days", status: "risk" },
  { supplier: "Northern Power", action: "Evidence upload request", owner: "S. Turner", due: "12 days", status: "evidence" },
  { supplier: "HydraGen Solutions", action: "Invite confirmation", owner: "A. Singh", due: "5 days", status: "training" },
  { supplier: "FieldCore Engineering", action: "Readiness review scheduled", owner: "J. Roberts", due: "14 days", status: "evidence" },
];

function StatusChip({ status, children }: { status: string; children: React.ReactNode }) {
  const toneClasses = {
    ready: "bg-[#a3ff3c]/10 text-[#a3ff3c] border-[#a3ff3c]/20",
    risk: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blocked: "bg-red-500/10 text-red-400 border-red-500/20",
    evidence: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    training: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border", toneClasses[status as keyof typeof toneClasses] || toneClasses.evidence)}>
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

function EvidenceLevel({ level }: { level: string }) {
  const num = parseInt(level.split(" ")[1]);
  return (
    <span className={cn(
      "px-2 py-0.5 rounded text-[10px] font-semibold",
      num >= 4 ? "bg-[#a3ff3c]/10 text-[#a3ff3c]" :
      num >= 3 ? "bg-blue-500/10 text-blue-400" :
      "bg-amber-500/10 text-amber-400"
    )}>
      {level}
    </span>
  );
}

interface SupplierDiscoveryProps {
  onViewSupplier?: () => void;
}

export function SupplierDiscovery({ onViewSupplier }: SupplierDiscoveryProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6e7a70]">
        <span className="cursor-pointer hover:text-[#a8b3aa]">Ecosystem</span>
        <ChevronRight className="w-3 h-3" />
        <span className="cursor-pointer hover:text-[#a8b3aa]">Supplier Discovery</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#e8efe9]">Hydrogen Storage Expansion</span>
      </div>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#e8efe9]">Supplier Discovery</h1>
          <p className="text-sm text-[#6e7a70] mt-1">Find suppliers matched to project requirements, capability evidence and workforce readiness.</p>
          <p className="text-xs text-[#6e7a70] mt-1.5 italic max-w-3xl">
            Trace helps project owners identify suppliers based on verified workforce readiness, evidence confidence, role coverage, authorisation status and mobilisation risk.
          </p>
          <div className="mt-2">
            <span className="px-2 py-1 rounded border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[10px]">
              Prototype view - illustrative data - not a procurement marketplace
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium hover:bg-[#1c211e]">
            <Share2 className="w-3.5 h-3.5" />
            Share Readiness Pack
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#131815] border border-[#232a25] text-[#e8efe9] text-xs font-medium hover:bg-[#1c211e]">
            <Download className="w-3.5 h-3.5" />
            Export Shortlist
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium hover:bg-[#b4ff5c]">
            <Plus className="w-3.5 h-3.5" />
            Create Project Requirement
          </button>
        </div>
      </div>

      {/* Project Requirement Card */}
      <div className="p-4 bg-gradient-to-b from-[#a3ff3c]/5 to-transparent border border-[#a3ff3c]/20 rounded-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <Target className="w-3.5 h-3.5 text-[#a3ff3c]" />
          <span className="text-[10px] text-[#a3ff3c] tracking-wider uppercase">Project requirement</span>
          <span className="ml-auto px-2 py-0.5 rounded bg-[#131815] border border-[#232a25] text-[10px] text-[#a8b3aa]">Mobilisation Q3 2026</span>
        </div>
        <h2 className="text-lg font-semibold text-[#e8efe9] mb-3">Hydrogen Storage Expansion - Electrical &amp; Safety-Critical Works</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Project owner", "Storengy-style demo organisation"],
            ["Sector", "Hydrogen Storage / Energy Infrastructure"],
            ["Location", "North West / Cheshire"],
            ["Work package", "Electrical install, HV support, hydrogen safety"],
            ["Min. readiness", "70%"],
            ["Evidence confidence", "Level 3+"],
            ["Supplier type", "Tier 1 / Tier 2"],
            ["Region filter", "Within 100 miles"],
            ["Required status", "Deployment-ready or Conditional"],
          ].map(([label, value], i) => (
            <div key={i} className="border-l-2 border-[#a3ff3c]/30 pl-2.5">
              <div className="text-[10px] text-[#6e7a70] mb-0.5">{label}</div>
              <div className="text-xs text-[#e8efe9]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { icon: Share2, label: "Suppliers matched", value: "18", sub: "From 64 ecosystem suppliers", tone: "" },
          { icon: CheckCircle2, label: "Strong matches", value: "6", sub: "85%+ match score", tone: "ok" },
          { icon: AlertTriangle, label: "Conditional matches", value: "9", sub: "Require readiness actions", tone: "warn" },
          { icon: FileText, label: "Evidence gaps found", value: "27", sub: "Across matched suppliers", tone: "warn" },
          { icon: Users, label: "Workers available", value: "286", sub: "Mapped to required roles", tone: "" },
          { icon: TrendingUp, label: "Mobilisation risk", value: "Medium", sub: "Based on current evidence", tone: "warn" },
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

      {/* Match Filters */}
      <Section title="Match Filters" sub="Tune the discovery criteria across capability, evidence, region and availability" right={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#131815] border border-[#232a25] text-[11px] text-[#a8b3aa] hover:bg-[#1c211e]">
            <X className="w-3 h-3" />Reset
          </button>
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#131815] border border-[#232a25] text-[11px] text-[#a8b3aa] hover:bg-[#1c211e]">
            <Download className="w-3 h-3" />Save Requirement Template
          </button>
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#a3ff3c] text-[11px] text-[#0a0d0c] font-medium">
            <CheckCircle2 className="w-3 h-3" />Apply Filters
          </button>
        </div>
      }>
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "Sector", chips: [["Hydrogen", true], ["Electrification", true], ["Storage", true], ["Safety-Critical", true]] },
            { label: "Required roles", chips: [["Electrical Installer", true], ["HV Engineer", true], ["Hydrogen Technician", true], ["Emergency Response Lead", true]] },
            { label: "Min. readiness", chips: [["50%", false], ["60%", false], ["70%+", true], ["80%+", false]] },
            { label: "Evidence confidence", chips: [["L 2+", false], ["L 3+", true], ["L 4+", false]] },
            { label: "Region", chips: [["Within 50 mi", false], ["Within 100 mi", true], ["UK-wide", false]] },
            { label: "Availability", chips: [["Q3 2026", true], ["Q4 2026", false], ["2027", false]] },
            { label: "Authorisation status", chips: [["Deployment-ready", true], ["Conditional", true], ["Evidence required", false]] },
            { label: "Supplier tier", chips: [["Tier 1", true], ["Tier 2", true], ["Tier 3", false]] },
            { label: "Expiry risk", chips: [["No critical - 30d", true]] },
            { label: "Safety-critical req.", chips: [["Yes", true], ["No", false]] },
          ].map((group, i) => (
            <div key={i}>
              <div className="text-[10px] text-[#6e7a70] mb-1.5">{group.label}</div>
              <div className="flex flex-wrap gap-1">
                {group.chips.map(([label, active], j) => (
                  <span key={j} className={cn(
                    "px-2 py-1 rounded text-[10px] cursor-pointer transition-colors",
                    active ? "bg-[#a3ff3c]/10 text-[#a3ff3c] border border-[#a3ff3c]/20" : "bg-[#131815] text-[#6e7a70] border border-[#232a25]"
                  )}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-12 gap-4">
        {/* Main Content */}
        <div className="col-span-8 space-y-4">
          {/* Supplier Match Results */}
          <Section title="Supplier Match Results" sub="Ranked by match score - click a row for full readiness pack" pad={false}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1c211e]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Supplier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] w-28">Match</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70] w-28">Readiness</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Evidence</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Workers</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Role Coverage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Expiry Risk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Status</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s, i) => (
                  <tr key={i} className="border-b border-[#1c211e] hover:bg-[#131815]/50 cursor-pointer" onClick={onViewSupplier}>
                    <td className="px-4 py-3 text-sm font-medium text-[#e8efe9]">{s.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1"><ProgressBar value={s.match} tone={s.match < 70 ? "bad" : s.match < 85 ? "warn" : ""} /></div>
                        <span className={cn("text-[11px] font-mono", s.match >= 85 ? "text-[#a3ff3c]" : "text-[#a8b3aa]")}>{s.match}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1"><ProgressBar value={s.readiness} tone={s.readiness < 65 ? "bad" : s.readiness < 75 ? "warn" : ""} /></div>
                        <span className="text-[11px] font-mono text-[#a8b3aa]">{s.readiness}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><EvidenceLevel level={s.evidence} /></td>
                    <td className="px-4 py-3 text-right text-[11px] font-mono text-[#a8b3aa]">{s.workers}</td>
                    <td className="px-4 py-3 text-[11px] font-mono text-[#a8b3aa]">{s.roles}</td>
                    <td className="px-4 py-3">
                      <StatusChip status={s.expiry === "Low" ? "ready" : s.expiry === "Medium" ? "risk" : "blocked"}>{s.expiry}</StatusChip>
                    </td>
                    <td className="px-4 py-3">
                      <StatusChip status={s.status}>{s.statusLabel}</StatusChip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Highlighted Supplier Cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "GreenVolt Ltd", match: 92, readiness: 81, evidence: "Level 4", workers: 42, roles: "5 / 5", status: "ready", statusLabel: "Suitable", blockers: "2 minor gaps", cta: "Request Readiness Pack", primary: true },
              { name: "Northern Power Services", match: 87, readiness: 76, evidence: "Level 3", workers: 35, roles: "4 / 5", status: "risk", statusLabel: "Conditional", blockers: "HV evidence pending", cta: "Invite to Requirement", primary: false },
              { name: "FieldCore Engineering", match: 64, readiness: 59, evidence: "Level 2", workers: 18, roles: "3 / 5", status: "evidence", statusLabel: "Evidence Required", blockers: "Expired certificates & missing authorisation", cta: "Start Readiness Review", primary: false },
            ].map((s, i) => (
              <div key={i} className="bg-[#0d1110] border border-[#1c211e] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#e8efe9]">{s.name}</span>
                  <StatusChip status={s.status}>{s.statusLabel}</StatusChip>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-[10px] text-[#6e7a70]">Match score</div>
                    <div className={cn("text-xl font-semibold", s.match >= 85 ? "text-[#a3ff3c]" : s.match >= 70 ? "text-amber-400" : "text-red-400")}>{s.match}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6e7a70]">Readiness</div>
                    <div className="text-xl font-semibold text-[#e8efe9]">{s.readiness}%</div>
                  </div>
                </div>
                <div className="space-y-1.5 py-2 border-t border-[#1c211e]">
                  <div className="flex justify-between text-[11px]"><span className="text-[#6e7a70]">Evidence confidence</span><EvidenceLevel level={s.evidence} /></div>
                  <div className="flex justify-between text-[11px]"><span className="text-[#6e7a70]">Workers available</span><span className="font-mono text-[#a8b3aa]">{s.workers}</span></div>
                  <div className="flex justify-between text-[11px]"><span className="text-[#6e7a70]">Role coverage</span><span className="font-mono text-[#a8b3aa]">{s.roles}</span></div>
                </div>
                <div className="text-[11px] text-[#6e7a70] italic py-2 border-t border-[#1c211e]">Open blockers: {s.blockers}</div>
                <button className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors mt-2",
                  s.primary ? "bg-[#a3ff3c] text-[#0a0d0c]" : "bg-[#131815] border border-[#232a25] text-[#e8efe9]"
                )}>
                  {s.primary ? <Share2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  {s.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Role Requirements Table */}
          <Section title="Work Package Role Requirements" sub="Required role headcount vs matched supply across shortlisted suppliers" pad={false}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1c211e]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Required role</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Needed</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Matched</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[#6e7a70]">Gap</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6e7a70]">Risk</th>
                </tr>
              </thead>
              <tbody>
                {ROLE_REQUIREMENTS.map((r, i) => (
                  <tr key={i} className="border-b border-[#1c211e]">
                    <td className="px-4 py-3 text-xs font-medium text-[#e8efe9]">{r.role}</td>
                    <td className="px-4 py-3 text-right text-[11px] font-mono text-[#6e7a70]">{r.needed}</td>
                    <td className="px-4 py-3 text-right text-[11px] font-mono text-[#a8b3aa]">{r.matched}</td>
                    <td className={cn("px-4 py-3 text-right text-[11px] font-mono", r.gap.startsWith("-") ? "text-red-400" : "text-[#a3ff3c]")}>{r.gap}</td>
                    <td className="px-4 py-3"><StatusChip status={r.status}>{r.risk}</StatusChip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-4">
          {/* Match Logic */}
          <Section title="Match Logic" sub="How Trace ranks suppliers against your requirement">
            <div className="p-3 bg-[#131815] rounded-lg mb-4">
              <div className="flex items-center flex-wrap gap-1 text-[10px]">
                <span className="px-2 py-1 bg-[#1c211e] rounded text-[#a8b3aa]">Project demand</span>
                <span className="text-[#6e7a70]">+</span>
                <span className="px-2 py-1 bg-[#1c211e] rounded text-[#a8b3aa]">Capability</span>
                <span className="text-[#6e7a70]">+</span>
                <span className="px-2 py-1 bg-[#1c211e] rounded text-[#a8b3aa]">Evidence</span>
                <span className="text-[#6e7a70]">+</span>
                <span className="px-2 py-1 bg-[#1c211e] rounded text-[#a8b3aa]">Availability</span>
                <span className="text-[#6e7a70]">+</span>
                <span className="px-2 py-1 bg-[#1c211e] rounded text-[#a8b3aa]">Safety rules</span>
                <span className="text-[#6e7a70]">=</span>
                <span className="px-2 py-1 bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 rounded text-[#a3ff3c]">Match</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                ["Role coverage", 30],
                ["Workforce readiness", 25],
                ["Evidence confidence", 20],
                ["Availability", 10],
                ["Expiry risk", 10],
                ["Location / region", 5],
              ].map(([label, weight], i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="flex-1 text-xs text-[#a8b3aa]">{label}</span>
                  <div className="w-16"><ProgressBar value={(weight as number) * 3} /></div>
                  <span className="text-[11px] font-mono text-[#6e7a70] w-8 text-right">{weight}%</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#6e7a70] italic mt-3">Match scores are illustrative and based on configured readiness rules.</p>
          </Section>

          {/* Shortlist Summary */}
          <Section title="Shortlist Summary">
            <div className="space-y-2.5">
              {[
                ["Suppliers shortlisted", "4", ""],
                ["Workers covered", "127", ""],
                ["Required roles covered", "5 / 5", ""],
                ["Remaining evidence gaps", "9", "warn"],
                ["Estimated readiness uplift if actions complete", "+16%", "ok"],
              ].map(([label, value, tone], i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-[#1c211e] last:border-0">
                  <span className="text-xs text-[#a8b3aa]">{label}</span>
                  <span className={cn("text-xs font-mono", tone === "warn" ? "text-amber-400" : tone === "ok" ? "text-[#a3ff3c]" : "text-[#e8efe9]")}>{value}</span>
                </div>
              ))}
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#a3ff3c] text-[#0a0d0c] text-xs font-medium mt-4">
              <Download className="w-3.5 h-3.5" />
              Generate Shortlist Report
            </button>
          </Section>

          {/* Engagement Actions */}
          <Section title="Engagement Actions" sub="Readiness-based engagement - not procurement contracting">
            <div className="space-y-2">
              {[
                { icon: Share2, label: "Request Supplier Readiness Pack", primary: true },
                { icon: Plus, label: "Invite to Project Requirement", primary: false },
                { icon: CheckCircle2, label: "Start Readiness Review", primary: false },
                { icon: FileText, label: "Request Missing Evidence", primary: false },
                { icon: Package, label: "Add to Shortlist", primary: false },
                { icon: Download, label: "Export Comparison", primary: false },
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
      <div className="flex items-center gap-3 text-xs text-[#6e7a70] py-4 border-t border-[#1c211e]">
        <span className="px-2 py-1 bg-[#131815] rounded border border-[#232a25] text-[10px]">Prototype</span>
        <span>Prototype view using illustrative data. Not live customer data.</span>
        <span className="ml-auto">Secured by verciti TRACE</span>
      </div>
    </div>
  );
}
