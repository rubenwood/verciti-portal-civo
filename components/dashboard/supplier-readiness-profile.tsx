"use client";

import { useState } from "react";
import { 
  ChevronRight, Gauge, Target, Users, Package, Globe, User, 
  TrendingDown, FileText, Download, Clock, AlertCircle, MapPin,
  Shield, Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SupplierReadinessProfileProps {
  onBack: () => void;
}

export function SupplierReadinessProfile({ onBack }: SupplierReadinessProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const ReadinessDial = ({ pct, color = "hsl(var(--warning))" }: { pct: number; color?: string }) => {
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

  const roleData = [
    { role: "Hydrogen Technician", needed: 32, ready: 18, conditional: 8, gap: 6, risk: "Amber" },
    { role: "Electrical Installer", needed: 28, ready: 16, conditional: 7, gap: 5, risk: "Amber" },
    { role: "High-Voltage Engineer", needed: 14, ready: 7, conditional: 3, gap: 4, risk: "Red" },
    { role: "Emergency Response Lead", needed: 6, ready: 3, conditional: 1, gap: 2, risk: "Red" },
    { role: "Maintenance Technician", needed: 20, ready: 14, conditional: 3, gap: 3, risk: "Amber" },
  ];

  const topGaps = [
    { t: "HV authorisation evidence missing", workers: 8, impact: "High risk for HV work compliance and safety", sev: "bad" },
    { t: "Hydrogen emergency response refresher overdue", workers: 12, impact: "Emergency readiness not up to date", sev: "bad" },
    { t: "Site induction records missing for Cohort GV-12", workers: 15, impact: "Induction gap blocks site access approval", sev: "warn" },
    { t: "Employer sign-off pending for electrical installers", workers: 9, impact: "Cannot authorise for deployment", sev: "warn" },
  ];

  const interventions = [
    { action: "Request HV authorisation evidence", owner: "M. Patel", workers: 8, due: "19 May 2025", status: "Overdue", tone: "blocked" },
    { action: "Schedule H2 emergency response refresher", owner: "S. Turner", workers: 12, due: "21 May 2025", status: "In Progress", tone: "risk" },
    { action: "Verify practical assessment records", owner: "A. Singh", workers: 9, due: "23 May 2025", status: "Awaiting Evidence", tone: "training" },
    { action: "Confirm site induction records", owner: "J. Roberts", workers: 15, due: "24 May 2025", status: "New", tone: "evidence" },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={onBack} className="hover:text-foreground transition-colors cursor-pointer">
          Workforce Readiness
        </button>
        <ChevronRight className="h-3 w-3" />
        <span className="cursor-pointer">Supplier Readiness Profile</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">GreenVolt Ltd</span>
      </div>

      {/* Header Band */}
      <div className="grid grid-cols-12 gap-4">
        {/* Avatar & Info */}
        <div className="col-span-7 flex gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a2614] to-[#2a3f1a] text-primary flex items-center justify-center text-xl font-semibold">
            GV
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-semibold">GreenVolt Ltd</h1>
              <Badge className="bg-warning/20 text-warning border-warning/30 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-warning mr-1" />At Risk
              </Badge>
              <Badge variant="outline" className="text-violet-400 border-violet-400/30 bg-violet-400/10 text-[10px]">
                Fictional demo record
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm mb-3">Tier 1 Supplier · Hydrogen / Electrification</div>

            <div className="grid grid-cols-5 gap-4 text-xs">
              {[
                { icon: Package, label: "Programme", value: "Regional Net Zero Infrastructure" },
                { icon: Target, label: "Project cluster", value: "Aberdeen H2 / NE EV Infra." },
                { icon: Globe, label: "Region", value: "North East UK" },
                { icon: User, label: "Supplier ID", value: "SUP-20481", mono: true },
                { icon: Users, label: "Workers mapped", value: "126" },
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
              <span className="flex items-center gap-1"><User className="h-3 w-3" />Primary contact: Rachel Morgan</span>
            </div>
          </div>
        </div>

        {/* Readiness Score Card */}
        <div className="col-span-3 p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-3 text-xs">
            <Gauge className="h-3.5 w-3.5 text-warning" />
            <span className="font-medium">Readiness Score</span>
          </div>
          <div className="flex items-center gap-4">
            <ReadinessDial pct={71} />
            <div>
              <div className="text-warning font-medium text-sm">At Risk</div>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingDown className="h-2.5 w-2.5" />▼ 5% vs last 30 days
              </div>
              <div className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                Calculated from role requirements, evidence, expiry, authorisation and safety-critical rules.
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Actions */}
        <div className="col-span-2 p-4 rounded-xl border border-border bg-card">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Supplier actions</div>
          <div className="space-y-2">
            <Button variant="default" size="sm" className="w-full justify-start text-xs h-8">
              <Users className="h-3 w-3 mr-2" />View Workers
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <FileText className="h-3 w-3 mr-2" />Request Evidence
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <Download className="h-3 w-3 mr-2" />Export
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { label: "Readiness Score", value: "71%", sub: "▼ 5% vs 30 days", subType: "warn", valueColor: "warning" },
          { label: "Workforce Assurance", value: "126", sub: "68 Ready · 31 Cond. · 19 Evid. · 8 Blocked", subType: "mixed" },
          { label: "Evidence Confidence", value: "Level 3.7", sub: "84% verified evidence", subType: "ok" },
          { label: "Expiry & Revalidation", value: "14", sub: "Items · 60 days", subType: "warn", valueColor: "warning" },
          { label: "Open Interventions", value: "17", sub: "5 high priority", subType: "bad" },
          { label: "Critical Blockers", value: "4", sub: "Affecting mobilisation", subType: "bad", valueColor: "destructive" },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-card">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{stat.label}</div>
            <div className={cn(
              "text-xl font-semibold",
              stat.valueColor === "warning" && "text-warning",
              stat.valueColor === "destructive" && "text-destructive"
            )}>
              {stat.value}
            </div>
            {stat.subType === "mixed" ? (
              <div className="flex flex-wrap gap-1 mt-1 text-[9px]">
                <span className="text-success">68 Ready</span>
                <span className="text-warning">31 Cond.</span>
                <span className="text-muted-foreground">19 Evid.</span>
                <span className="text-destructive">8 Blocked</span>
              </div>
            ) : (
              <div className={cn(
                "text-[10px] mt-1",
                stat.subType === "ok" && "text-success",
                stat.subType === "warn" && "text-warning",
                stat.subType === "bad" && "text-destructive"
              )}>
                {stat.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/30">
          {["Overview", "Workforce", "Roles", "Evidence", "Interventions", "Audit Trail"].map((tab) => (
            <TabsTrigger 
              key={tab} 
              value={tab.toLowerCase().replace(" ", "-")}
              className="text-xs"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Role Readiness */}
        <div className="col-span-7 rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Role Readiness by Function</div>
              <div className="text-[10px] text-muted-foreground">Workforce coverage by role required for active project clusters</div>
            </div>
            <button className="text-xs text-primary hover:underline">View full role breakdown →</button>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-4 py-2 font-normal">Role</th>
                <th className="text-right px-4 py-2 font-normal w-16">Needed</th>
                <th className="text-right px-4 py-2 font-normal w-16">Ready</th>
                <th className="text-right px-4 py-2 font-normal w-16">Cond.</th>
                <th className="text-right px-4 py-2 font-normal w-16">Gap</th>
                <th className="text-center px-4 py-2 font-normal w-32">Distribution</th>
                <th className="text-left px-4 py-2 font-normal w-20">Risk</th>
              </tr>
            </thead>
            <tbody>
              {roleData.map((r, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-2.5 font-medium">{r.role}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-muted-foreground">{r.needed}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-primary">{r.ready}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-warning">{r.conditional}</td>
                  <td className={cn("px-4 py-2.5 text-right font-mono", r.risk === "Red" ? "text-destructive" : "text-warning")}>{r.gap}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex h-2 rounded overflow-hidden">
                      <div style={{ width: `${r.ready/r.needed*100}%` }} className="bg-primary" />
                      <div style={{ width: `${r.conditional/r.needed*100}%` }} className="bg-warning" />
                      <div style={{ width: `${r.gap/r.needed*100}%` }} className="bg-destructive" />
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge className={cn(
                      "text-[10px]",
                      r.risk === "Red" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full mr-1", r.risk === "Red" ? "bg-destructive" : "bg-warning")} />
                      {r.risk}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Gaps */}
        <div className="col-span-5 rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="text-sm font-medium">Top Readiness Gaps</div>
            <div className="text-[10px] text-muted-foreground">Blockers affecting supplier mobilisation</div>
          </div>
          <div className="p-4 space-y-2.5">
            {topGaps.map((g, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-start gap-2 mb-1">
                  <AlertCircle className={cn(
                    "h-3 w-3 mt-0.5",
                    g.sev === "bad" ? "text-destructive" : "text-warning"
                  )} />
                  <span className="text-xs font-medium flex-1">{g.t}</span>
                  <Badge className={cn(
                    "text-[9px] px-1.5",
                    g.sev === "bad" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                  )}>
                    <span className="w-1 h-1 rounded-full bg-current mr-1" />
                    {g.sev === "bad" ? "High" : "Medium"}
                  </Badge>
                </div>
                <div className="text-[10px] text-muted-foreground pl-5 mb-1">{g.impact}</div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground pl-5">
                  <Users className="h-2.5 w-2.5" />{g.workers} workers affected
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence + Expiry + Authorisation */}
      <div className="grid grid-cols-12 gap-4">
        {/* Evidence Completion */}
        <div className="col-span-4 rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium mb-1">Evidence Completion</div>
          <div className="text-[10px] text-muted-foreground mb-4">Cross-supplier evidence status</div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-[90px] h-[90px]">
              <svg width="90" height="90" viewBox="0 0 100 100" className="-rotate-90">
                <circle cx="50" cy="50" r="42" stroke="hsl(var(--muted))" strokeWidth="9" fill="none"/>
                <circle cx="50" cy="50" r="42" stroke="hsl(var(--primary))" strokeWidth="9" fill="none"
                  strokeDasharray={2*Math.PI*42} strokeDashoffset={2*Math.PI*42*(1-0.84)} strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="text-lg font-semibold">84<small className="text-xs text-muted-foreground">%</small></span>
              </div>
            </div>
            <div>
              <div className="text-primary text-sm font-medium">Complete</div>
              <div className="text-[10px] text-muted-foreground mt-1">240 / 286 items verified across the supplier workforce.</div>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { label: "Certificates verified", value: 92 },
              { label: "Employer sign-offs", value: 74 },
              { label: "Site induction records", value: 41 },
              { label: "Practical assessment records", value: 33 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[11px] flex-1">{item.label}</span>
                <Progress value={item.value} className="w-20 h-1.5" />
                <span className="text-[10px] font-mono w-6 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expiry Timeline */}
        <div className="col-span-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium">Expiry & Revalidation Timeline</div>
            </div>
            <button className="text-xs text-primary hover:underline">View calendar →</button>
          </div>

          <div className="space-y-4">
            {[
              { label: "Engineering Council Registration", days: 21, workers: "1 worker" },
              { label: "First Aid Certificates", days: 34, workers: "4 workers" },
              { label: "HV Awareness Refresher", days: 47, workers: "12 workers" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="h-3 w-3 text-warning" />
                  <span className="text-xs font-medium flex-1">{item.label}</span>
                  <Badge className="bg-warning/20 text-warning text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mr-1" />{item.days} days
                  </Badge>
                </div>
                <div className="flex items-center gap-2 pl-5">
                  <Progress value={100 - item.days * 1.5} className="h-1.5 flex-1 [&>div]:bg-warning" />
                  <span className="text-[10px] font-mono w-16 text-right">{item.workers}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Site Authorisation */}
        <div className="col-span-4 rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium mb-1">Site & Project Authorisation</div>
          <div className="text-[10px] text-muted-foreground mb-4">Supplier authorisation varies by project and evidence status</div>

          <div className="space-y-2.5">
            {[
              { site: "Aberdeen Hydrogen Plant", status: "Conditional", tone: "risk" },
              { site: "North East EV Infrastructure", status: "Approved", tone: "ready" },
              { site: "Tees Estuary Storage Terminal", status: "Evidence Required", tone: "evidence" },
            ].map((item, i) => (
              <div key={i} className={cn("flex items-center gap-2 py-2.5", i < 2 && "border-b border-border")}>
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs flex-1">{item.site}</span>
                <Badge className={cn(
                  "text-[10px]",
                  item.tone === "ready" && "bg-success/20 text-success",
                  item.tone === "risk" && "bg-warning/20 text-warning",
                  item.tone === "evidence" && "bg-muted text-muted-foreground"
                )}>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full mr-1",
                    item.tone === "ready" && "bg-success",
                    item.tone === "risk" && "bg-warning",
                    item.tone === "evidence" && "bg-muted-foreground"
                  )} />
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>

          {/* Readiness Logic Card */}
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-b from-primary/5 to-transparent border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold">Readiness Logic</span>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-[9px] mb-3">
              {["Role req.", "Evidence", "Expiry", "Auth.", "Safety"].map((t, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">{t}</span>
                  {i < 4 && <span className="text-muted-foreground mx-0.5">+</span>}
                </span>
              ))}
              <span className="text-muted-foreground mx-0.5">=</span>
              <span className="px-1.5 py-0.5 rounded bg-success/20 text-success">Readiness</span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Role requirements", value: "71% met", tone: "risk" },
                { label: "Evidence confidence", value: "Level 3.7", tone: "ready" },
                { label: "Expiry risk", value: "14 items due", tone: "risk" },
                { label: "Authorisation status", value: "Mixed by project", tone: "risk" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">{item.label}</span>
                  <Badge className={cn(
                    "text-[9px] px-1.5",
                    item.tone === "ready" && "bg-success/20 text-success",
                    item.tone === "risk" && "bg-warning/20 text-warning"
                  )}>
                    <span className={cn("w-1 h-1 rounded-full mr-1", item.tone === "ready" ? "bg-success" : "bg-warning")} />
                    {item.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Open Interventions Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="text-sm font-medium">Open Interventions</div>
          <button className="text-xs text-primary hover:underline">View all →</button>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-2 font-normal">Intervention</th>
              <th className="text-left px-4 py-2 font-normal">Owner</th>
              <th className="text-right px-4 py-2 font-normal w-20">Workers</th>
              <th className="text-left px-4 py-2 font-normal">Due</th>
              <th className="text-left px-4 py-2 font-normal w-28">Status</th>
            </tr>
          </thead>
          <tbody>
            {interventions.map((r, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-2.5">{r.action}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.owner}</td>
                <td className="px-4 py-2.5 text-right font-mono">{r.workers}</td>
                <td className="px-4 py-2.5 font-mono text-muted-foreground">{r.due}</td>
                <td className="px-4 py-2.5">
                  <Badge className={cn(
                    "text-[10px]",
                    r.tone === "blocked" && "bg-destructive/20 text-destructive",
                    r.tone === "risk" && "bg-warning/20 text-warning",
                    r.tone === "training" && "bg-blue-500/20 text-blue-400",
                    r.tone === "evidence" && "bg-muted text-muted-foreground"
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-1" />
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
