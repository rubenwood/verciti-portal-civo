"use client";

import { useState } from "react";
import { 
  ChevronRight, Gauge, Target, GraduationCap, Shield, FileText, 
  Clock, BarChart3, Fingerprint, Mail, Bell, TrendingUp, Users,
  Package, Droplet, Globe, User, Check, AlertCircle, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface WorkerReadinessProfileProps {
  onBack: () => void;
}

export function WorkerReadinessProfile({ onBack }: WorkerReadinessProfileProps) {
  const [activeTab, setActiveTab] = useState("readiness");

  const tabs = [
    { id: "readiness", label: "Readiness Overview", icon: Gauge },
    { id: "role", label: "Role Requirements", icon: Target },
    { id: "training", label: "Training Interventions", icon: GraduationCap },
    { id: "qual", label: "Qualifications", icon: Shield },
    { id: "evidence", label: "Evidence", icon: FileText },
    { id: "expiry", label: "Expiry & Revalidation", icon: Clock },
    { id: "activity", label: "Activity", icon: BarChart3 },
    { id: "audit", label: "Audit Trail", icon: Fingerprint },
  ];

  const ReadinessDial = ({ pct, color = "var(--primary)" }: { pct: number; color?: string }) => {
    const r = 42, c = 2 * Math.PI * r;
    return (
      <div className="relative w-[110px] h-[110px]">
        <svg width="110" height="110" viewBox="0 0 100 100" className="-rotate-90">
          <circle cx="50" cy="50" r={r} stroke="hsl(var(--muted))" strokeWidth="9" fill="none"/>
          <circle cx="50" cy="50" r={r} stroke={color} strokeWidth="9" fill="none"
            strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} strokeLinecap="round"/>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-2xl font-semibold tracking-tight">{pct}<small className="text-sm text-muted-foreground font-medium">%</small></span>
        </div>
      </div>
    );
  };

  const gaps = [
    { t: "Electrical Safety Fundamentals overdue", kind: "Training intervention", impact: "Prevents full role-readiness score", tone: "blocked", ic: AlertCircle },
    { t: "Hazardous Voltage Awareness in progress", kind: "Safety-critical training", impact: "Required for HV-adjacent work", tone: "risk", ic: Shield },
    { t: "Engineering Council Registration expires in 77 days", kind: "Revalidation risk", impact: "Revalidation required before next mobilisation phase", tone: "risk", ic: Clock },
    { t: "Wind Energy requirement not met", kind: "Role requirement", impact: "Not required for current hydrogen project, but affects cross-sector readiness", tone: "evidence", ic: Target },
  ];

  const roleRequirements = [
    { area: "Electrical Theory Fundamentals", required: 60, achieved: 80, met: true },
    { area: "Hazardous Voltage", required: 40, achieved: 70, met: true },
    { area: "Electrical Installations", required: 50, achieved: 90, met: true },
    { area: "Plant & Machinery", required: 30, achieved: 60, met: true },
    { area: "Safety Standards", required: 100, achieved: 100, met: true },
    { area: "Documentation & Reporting", required: 40, achieved: 40, met: true },
    { area: "Marine", required: 25, achieved: 20, met: false },
    { area: "Wind Energy", required: 50, achieved: 30, met: false },
  ];

  const interventions = [
    { t: "Electrical Safety Fundamentals", rule: "Electrical baseline evidence required", due: "20/03/2024", src: "Udemy / Imported", status: "blocked", statusLbl: "Overdue", prog: 0 },
    { t: "Hydrogen Fundamentals", rule: "Hydrogen project awareness required", due: "10/06/2024", src: "Verciti", status: "risk", statusLbl: "In Progress", prog: 45 },
    { t: "Hazardous Area Classification", rule: "Hazardous area awareness required", due: "30/06/2024", src: "Verciti", status: "evidence", statusLbl: "Not Started", prog: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={onBack} className="hover:text-foreground transition-colors cursor-pointer">
          Workforce Readiness
        </button>
        <ChevronRight className="h-3 w-3" />
        <span className="cursor-pointer">Worker Readiness Profile</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-mono">ELEC-10482</span>
      </div>

      {/* Header Band */}
      <div className="grid grid-cols-12 gap-4">
        {/* Avatar & Info */}
        <div className="col-span-7 flex gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a2030] to-[#324870] text-[#a8c8ff] flex items-center justify-center text-xl font-semibold">
              EH
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-background" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-semibold">Emma Henderson</h1>
              <Badge variant="outline" className="text-violet-400 border-violet-400/30 bg-violet-400/10 text-[10px]">
                Fictional demo record
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm mb-3">Electrical Engineer</div>

            <div className="grid grid-cols-5 gap-4 text-xs">
              {[
                { icon: Users, label: "Employer", value: "Supplier A" },
                { icon: Package, label: "Programme", value: "Regional Net Zero Infrastructure" },
                { icon: Droplet, label: "Project", value: "Aberdeen Hydrogen Plant" },
                { icon: Globe, label: "Location", value: "Aberdeen, Scotland" },
                { icon: User, label: "Worker ID", value: "ELEC-10482", mono: true },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <item.icon className="h-3 w-3" />{item.label}
                  </div>
                  <div className={item.mono ? "font-mono" : ""}>{item.value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" />em***@supplier-a.example</span>
              <span className="flex items-center gap-1"><Bell className="h-3 w-3" />+44 7700 9*****</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge className="bg-success/20 text-success border-success/30 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-success mr-1" />Deployment-ready
              </Badge>
              <Badge className="bg-success/20 text-success border-success/30 text-[10px]">
                <Check className="h-2.5 w-2.5 mr-1" />Approved · Aberdeen Hydrogen Plant
              </Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
                <Shield className="h-2.5 w-2.5 mr-1" />Evidence confidence · Level 4
              </Badge>
              <Badge className="bg-warning/20 text-warning border-warning/30 text-[10px]">
                <Clock className="h-2.5 w-2.5 mr-1" />2 items expiring · 90 days
              </Badge>
            </div>
          </div>
        </div>

        {/* Readiness Score Card */}
        <div className="col-span-3 p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-3 text-xs">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium">Readiness Score</span>
          </div>
          <div className="flex items-center gap-4">
            <ReadinessDial pct={82} color="hsl(var(--primary))" />
            <div>
              <div className="text-primary font-medium text-sm">Deployment-ready</div>
              <div className="text-[10px] text-muted-foreground">Updated 14/05/2024</div>
              <div className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                Calculated from role requirements, evidence, expiry, authorisation and safety-critical rules.
              </div>
            </div>
          </div>
        </div>

        {/* Reporting & Access */}
        <div className="col-span-2 p-4 rounded-xl border border-border bg-card">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Reporting & access</div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1a2030] to-[#324870] flex items-center justify-center text-xs">CH</div>
              <div>
                <div className="text-xs font-medium">Chris Harper</div>
                <div className="text-[10px] text-muted-foreground">Manager</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2a2418] to-[#5a4a28] flex items-center justify-center text-xs">SM</div>
              <div>
                <div className="text-xs font-medium">Sarah Mitchell</div>
                <div className="text-[10px] text-muted-foreground">Engineering Manager</div>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="text-[10px] text-muted-foreground">Last login</div>
              <div className="text-xs font-mono text-muted-foreground">14/05/2024 · 09:32</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Access status</span>
              <Badge className="bg-success/20 text-success text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-success mr-1" />Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-3 w-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "Readiness Score", value: "82%", sub: "▲ 12% vs last 30 days", subType: "ok", highlight: true },
          { label: "Role Requirements", value: "7 / 8", sub: "Requirements met · 1 open gap", subType: "ok" },
          { label: "Evidence Completion", value: "91%", sub: "41 / 45 evidence items", subType: "neutral" },
          { label: "Expiry Risk", value: "2", sub: "Expiring within 90 days", subType: "warn", valueColor: "warning" },
          { label: "Authorisation", value: "Approved", sub: "Site authorised · since 12/05/2024", subType: "ok", valueColor: "primary" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className={cn(
              "p-4 rounded-xl border border-border bg-card",
              stat.highlight && "bg-gradient-to-br from-primary/10 to-transparent"
            )}
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{stat.label}</div>
            <div className={cn(
              "text-2xl font-semibold",
              stat.valueColor === "warning" && "text-warning",
              stat.valueColor === "primary" && "text-primary"
            )}>
              {stat.value}
            </div>
            <div className={cn(
              "text-[10px] mt-1 flex items-center gap-1",
              stat.subType === "ok" && "text-success",
              stat.subType === "warn" && "text-warning",
              stat.subType === "neutral" && "text-muted-foreground"
            )}>
              {stat.subType === "ok" && <TrendingUp className="h-2.5 w-2.5" />}
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Readiness Logic */}
        <div className="col-span-7 rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="text-sm font-medium">Readiness Logic</div>
            <div className="text-[10px] text-muted-foreground">Trace must prove the status — not just display it</div>
          </div>
          <div className="p-3 bg-muted/30 border-b border-border">
            <div className="flex items-center justify-center gap-2 text-[10px]">
              {["Role requirements", "Verified evidence", "Expiry status", "Authorisation", "Safety rules"].map((token, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">{token}</span>
                  {i < 4 && <span className="text-muted-foreground mx-1">+</span>}
                </span>
              ))}
              <span className="text-muted-foreground mx-1">=</span>
              <span className="px-2 py-1 rounded bg-success/20 text-success font-medium">Deployment readiness</span>
            </div>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-4 py-2 font-normal">Component</th>
                <th className="text-left px-4 py-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { comp: "Role requirements", status: "7 / 8 met", tone: "ready" },
                { comp: "Evidence confidence", status: "Level 4 — Assessor verified", tone: "ready" },
                { comp: "Expiry risk", status: "2 items expiring · 90 days", tone: "risk" },
                { comp: "Site authorisation", status: "Approved", tone: "ready" },
                { comp: "Training interventions", status: "1 overdue · 1 in progress", tone: "risk" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-2.5">{row.comp}</td>
                  <td className="px-4 py-2.5">
                    <Badge className={cn(
                      "text-[10px]",
                      row.tone === "ready" && "bg-success/20 text-success",
                      row.tone === "risk" && "bg-warning/20 text-warning"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full mr-1",
                        row.tone === "ready" && "bg-success",
                        row.tone === "risk" && "bg-warning"
                      )} />
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Open Readiness Gaps */}
        <div className="col-span-5 rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="text-sm font-medium">Open Readiness Gaps</div>
            <div className="text-[10px] text-muted-foreground">What is preventing a perfect readiness profile</div>
          </div>
          <div className="p-4 space-y-2.5">
            {gaps.map((g, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-start gap-2 mb-1">
                  <g.ic className={cn(
                    "h-3 w-3 mt-0.5",
                    g.tone === "blocked" && "text-destructive",
                    g.tone === "risk" && "text-warning",
                    g.tone === "evidence" && "text-muted-foreground"
                  )} />
                  <span className="text-xs font-medium flex-1">{g.t}</span>
                  <Badge className={cn(
                    "text-[9px] px-1.5",
                    g.tone === "blocked" && "bg-destructive/20 text-destructive",
                    g.tone === "risk" && "bg-warning/20 text-warning",
                    g.tone === "evidence" && "bg-muted text-muted-foreground"
                  )}>
                    <span className="w-1 h-1 rounded-full bg-current mr-1" />{g.kind}
                  </Badge>
                </div>
                <div className="text-[10px] text-muted-foreground pl-5">{g.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Requirements + Interventions */}
      <div className="grid grid-cols-12 gap-4">
        {/* Role Requirements */}
        <div className="col-span-7 rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Role Requirements — Electrical Engineer</div>
            </div>
            <button className="text-xs text-primary hover:underline">View full competency breakdown →</button>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-4 py-2 font-normal">Competency area</th>
                <th className="text-right px-4 py-2 font-normal w-20">Required</th>
                <th className="text-right px-4 py-2 font-normal w-20">Achieved</th>
                <th className="text-left px-4 py-2 font-normal w-24">Status</th>
              </tr>
            </thead>
            <tbody>
              {roleRequirements.map((r, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-2.5">{r.area}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-muted-foreground">{r.required}%</td>
                  <td className={cn("px-4 py-2.5 text-right font-mono", r.met ? "text-primary" : "text-destructive")}>{r.achieved}%</td>
                  <td className="px-4 py-2.5">
                    <Badge className={cn(
                      "text-[10px]",
                      r.met ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full mr-1", r.met ? "bg-success" : "bg-destructive")} />
                      {r.met ? "Met" : "Not Met"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Assigned Interventions */}
        <div className="col-span-5 rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="text-sm font-medium">Assigned Readiness Interventions</div>
            <button className="text-xs text-primary hover:underline">View all →</button>
          </div>
          <div className="p-4 space-y-4">
            {interventions.map((x, i) => (
              <div key={i} className={cn("pb-4", i < interventions.length - 1 && "border-b border-border")}>
                <div className="flex items-center gap-2 mb-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium flex-1">{x.t}</span>
                  <Badge className={cn(
                    "text-[10px]",
                    x.status === "blocked" && "bg-destructive/20 text-destructive",
                    x.status === "risk" && "bg-warning/20 text-warning",
                    x.status === "evidence" && "bg-muted text-muted-foreground"
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-1" />{x.statusLbl}
                  </Badge>
                </div>
                <div className="text-[10px] text-muted-foreground italic pl-5 mb-1.5">Linked rule: {x.rule}</div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground pl-5 mb-2">
                  <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />Due {x.due}</span>
                  <span className="flex items-center gap-1"><Package className="h-2.5 w-2.5" />{x.src}</span>
                </div>
                <div className="flex items-center gap-2 pl-5">
                  <Progress value={x.prog} className={cn("h-1.5 flex-1", x.status === "blocked" && "[&>div]:bg-destructive")} />
                  <span className="text-[10px] font-mono w-8 text-right">{x.prog}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
