"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Target,
  AlertCircle,
  Users,
  Clock,
  XCircle,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  Download,
  Plus,
  ChevronRight,
  Package,
  CheckCircle,
  AlertTriangle,
  FileText,
  BookOpen,
  ClipboardCheck,
  RefreshCw,
} from "lucide-react";

const kpis = [
  { icon: Target, label: "Open Interventions", value: "47", sub: "Across all organisations", tone: "neutral" },
  { icon: AlertCircle, label: "High Priority", value: "9", sub: "19% of total", tone: "warn" },
  { icon: Users, label: "Workers Affected", value: "184", sub: "Across 9 organisations", tone: "neutral" },
  { icon: Clock, label: "Due in 7 Days", value: "14", sub: "30% of total", tone: "warn" },
  { icon: XCircle, label: "Overdue", value: "7", sub: "15% of total", tone: "bad" },
  { icon: TrendingUp, label: "Expected Readiness Uplift", value: "+18%", sub: "Based on completion", tone: "ok" },
];

const queue = [
  { pri: "high", intervention: "Request HV authorisation evidence from Supplier B", type: "Evidence", owner: "M. Patel, Assessor", workers: 18, due: "19 May 2025 · Overdue", impact: "High", status: "blocked", statusLabel: "Overdue" },
  { pri: "high", intervention: "Schedule hydrogen emergency response refresher", type: "Training", owner: "S. Turner, Programme Manager", workers: 36, due: "21 May 2025 · Due in 2 days", impact: "High", status: "risk", statusLabel: "In Progress" },
  { pri: "high", intervention: "Verify practical assessment records for Cohort 3", type: "Assessment", owner: "A. Singh, Assessor", workers: 24, due: "23 May 2025 · Due in 4 days", impact: "High", status: "training", statusLabel: "Awaiting Evidence" },
  { pri: "medium", intervention: "Confirm site induction availability", type: "Evidence", owner: "J. Roberts, Site Authoriser", workers: 52, due: "26 May 2025 · Due in 7 days", impact: "Medium", status: "risk", statusLabel: "In Progress" },
  { pri: "medium", intervention: "Approve employer sign-off for 12 electrical installers", type: "Approval", owner: "E. Okafor, Lead Assessor", workers: 12, due: "27 May 2025 · Due in 8 days", impact: "Medium", status: "evidence", statusLabel: "New" },
  { pri: "low", intervention: "Escalate medical certificate expiry for 4 workers", type: "Revalidation", owner: "S. Turner, Programme Manager", workers: 4, due: "28 May 2025 · Due in 9 days", impact: "Low", status: "blocked", statusLabel: "Escalated" },
];

const columns = [
  { id: "new", label: "New", items: [
    { title: "Approve employer sign-off for 12 electrical installers", pri: "medium", due: "27 May" },
    { title: "Schedule Q3 hydrogen refresher cycle", pri: "low", due: "30 May" },
  ]},
  { id: "progress", label: "In Progress", items: [
    { title: "Schedule hydrogen emergency response refresher", pri: "high", due: "21 May" },
    { title: "Confirm site induction availability", pri: "medium", due: "26 May" },
  ]},
  { id: "awaiting", label: "Awaiting Evidence", items: [
    { title: "Verify practical assessment records for Cohort 3", pri: "high", due: "23 May" },
    { title: "Receive HV authorisation certificate from GreenVolt", pri: "high", due: "19 May" },
  ]},
  { id: "verified", label: "Verified", items: [
    { title: "Site induction approved · Aberdeen", pri: "low", due: "12 May" },
    { title: "First aid refresher · cohort H2-04", pri: "low", due: "08 May" },
  ]},
  { id: "escalated", label: "Escalated", items: [
    { title: "Escalate medical certificate expiry · 4 workers", pri: "low", due: "28 May" },
    { title: "Supplier C — repeated refresher overdue", pri: "high", due: "Overdue" },
  ]},
];

const queueSummary = [
  { label: "New", count: 8, tone: "evidence" },
  { label: "In Progress", count: 14, tone: "risk" },
  { label: "Awaiting Evidence", count: 11, tone: "training" },
  { label: "Verified", count: 9, tone: "ready" },
  { label: "Escalated", count: 3, tone: "blocked" },
  { label: "Overdue", count: 7, tone: "blocked" },
];

const subTabs = [
  { id: "queue", label: "Action Queue", icon: Target },
  { id: "modules", label: "Training Modules", icon: BookOpen },
  { id: "assess", label: "Assessment Tasks", icon: ClipboardCheck },
  { id: "evidence", label: "Evidence Requests", icon: FileText },
  { id: "reval", label: "Revalidation", icon: RefreshCw },
];

const filters = ["All", "High Priority", "Evidence", "Training", "Revalidation", "Supplier", "Assessor", "Site Authorisation", "Overdue"];

export function ActionQueue() {
  const [activeTab, setActiveTab] = useState("queue");
  const [activeFilter, setActiveFilter] = useState("All");

  const getStatusTone = (status: string) => {
    switch (status) {
      case "blocked": return "bg-destructive/10 text-destructive border-destructive/20";
      case "risk": return "bg-warning/10 text-warning border-warning/20";
      case "training": return "bg-primary/10 text-primary border-primary/20";
      case "evidence": return "bg-muted text-muted-foreground border-border";
      case "ready": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPriorityTone = (pri: string) => {
    switch (pri) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Action Queue</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Coordinate readiness interventions, evidence actions and approvals needed to move workers and suppliers toward deployment readiness.
          </p>
          <p className="text-xs text-muted-foreground mt-1 italic">
            Every action is linked to a readiness rule, an evidence gap or a deployment risk.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Package className="h-4 w-4" />
            TRACE Workspace
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export Queue
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Create Intervention
          </Button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg w-fit border border-border">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi, i) => (
          <div key={i} className="p-3 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded bg-muted">
                <kpi.icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
            </div>
            <p className={cn(
              "text-xl font-bold mb-0.5",
              kpi.tone === "warn" ? "text-warning" : kpi.tone === "bad" ? "text-destructive" : kpi.tone === "ok" ? "text-success" : "text-foreground"
            )}>
              {kpi.value}
            </p>
            <p className={cn(
              "text-[10px]",
              kpi.tone === "warn" ? "text-warning" : kpi.tone === "bad" ? "text-destructive" : kpi.tone === "ok" ? "text-success" : "text-muted-foreground"
            )}>
              {kpi.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
              activeFilter === filter
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/30 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search interventions by module, evidence item, worker, supplier or owner..."
            className="pl-9 bg-muted/30"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Calendar className="h-4 w-4" />
          Due Date
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Queue Table */}
        <div className="lg:col-span-8">
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border">
                    <th className="text-left pb-2 font-normal">Priority</th>
                    <th className="text-left pb-2 font-normal">Intervention</th>
                    <th className="text-left pb-2 font-normal">Type</th>
                    <th className="text-left pb-2 font-normal">Owner</th>
                    <th className="text-right pb-2 font-normal">Workers</th>
                    <th className="text-left pb-2 font-normal">Due Date</th>
                    <th className="text-left pb-2 font-normal">Impact</th>
                    <th className="text-left pb-2 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((q, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/20 cursor-pointer">
                      <td className="py-2.5">
                        <Badge variant="outline" className={cn("text-[10px]", getPriorityTone(q.pri))}>
                          <span className="h-1.5 w-1.5 rounded-full mr-1" style={{
                            backgroundColor: q.pri === "high" ? "var(--destructive)" : q.pri === "medium" ? "var(--warning)" : "var(--muted-foreground)"
                          }} />
                          {q.pri.charAt(0).toUpperCase() + q.pri.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-2.5 font-medium max-w-[200px] truncate">{q.intervention}</td>
                      <td className="py-2.5">
                        <Badge variant="outline" className="text-[10px]">{q.type}</Badge>
                      </td>
                      <td className="py-2.5 text-muted-foreground text-xs">{q.owner}</td>
                      <td className="py-2.5 text-right font-mono text-xs">{q.workers}</td>
                      <td className={cn(
                        "py-2.5 text-xs font-mono",
                        q.due.includes("Overdue") ? "text-destructive" : "text-muted-foreground"
                      )}>
                        {q.due}
                      </td>
                      <td className="py-2.5">
                        <Badge variant="outline" className={cn("text-[10px]", getPriorityTone(q.impact.toLowerCase()))}>
                          <span className="h-1.5 w-1.5 rounded-full mr-1" style={{
                            backgroundColor: q.impact === "High" ? "var(--destructive)" : q.impact === "Medium" ? "var(--warning)" : "var(--muted-foreground)"
                          }} />
                          {q.impact}
                        </Badge>
                      </td>
                      <td className="py-2.5">
                        <Badge variant="outline" className={cn("text-[10px]", getStatusTone(q.status))}>
                          <span className="h-1.5 w-1.5 rounded-full mr-1" style={{
                            backgroundColor: q.status === "blocked" ? "var(--destructive)" : q.status === "risk" ? "var(--warning)" : q.status === "training" ? "var(--primary)" : q.status === "ready" ? "var(--success)" : "var(--muted-foreground)"
                          }} />
                          {q.statusLabel}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Queue Summary */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <h3 className="font-semibold text-sm mb-3">Queue Summary</h3>
            <div className="space-y-2">
              {queueSummary.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <Badge variant="outline" className={cn("text-[10px]", getStatusTone(item.tone))}>
                    <span className="h-1.5 w-1.5 rounded-full mr-1" style={{
                      backgroundColor: item.tone === "blocked" ? "var(--destructive)" : item.tone === "risk" ? "var(--warning)" : item.tone === "training" ? "var(--primary)" : item.tone === "ready" ? "var(--success)" : "var(--muted-foreground)"
                    }} />
                    {item.label}
                  </Badge>
                  <span className="font-mono text-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Readiness Impact */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <h3 className="font-semibold text-sm mb-1">Readiness Impact</h3>
            <p className="text-xs text-muted-foreground mb-4">Based on 47 open interventions</p>
            <div className="flex items-center gap-4">
              <div className="relative w-[120px] h-[120px] shrink-0">
                <svg width="120" height="120" viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="9" fill="none" className="text-muted/30" />
                  <circle cx="50" cy="50" r="42" stroke="var(--destructive)" strokeWidth="9" fill="none"
                    strokeDasharray={`${2 * Math.PI * 42 * 0.61} ${2 * Math.PI * 42}`} />
                  <circle cx="50" cy="50" r="42" stroke="var(--warning)" strokeWidth="9" fill="none"
                    strokeDasharray={`${2 * Math.PI * 42 * 0.28} ${2 * Math.PI * 42}`}
                    strokeDashoffset={-2 * Math.PI * 42 * 0.61} />
                  <circle cx="50" cy="50" r="42" stroke="var(--success)" strokeWidth="9" fill="none"
                    strokeDasharray={`${2 * Math.PI * 42 * 0.11} ${2 * Math.PI * 42}`}
                    strokeDashoffset={-2 * Math.PI * 42 * 0.89} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold text-success">+18%</p>
                    <p className="text-[10px] text-muted-foreground">Total uplift</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-destructive shrink-0" />
                  <span className="flex-1 text-xs">High impact</span>
                  <span className="font-mono text-xs">+11%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-warning shrink-0" />
                  <span className="flex-1 text-xs">Medium impact</span>
                  <span className="font-mono text-xs">+5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-success shrink-0" />
                  <span className="flex-1 text-xs">Low impact</span>
                  <span className="font-mono text-xs">+2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Upcoming Deadlines</h3>
              <button className="text-xs text-primary hover:underline">View all →</button>
            </div>
            <div className="space-y-3">
              {[
                { title: "Request HV authorisation evidence from Supplier B", due: "19 May · Overdue", tone: "bad" },
                { title: "Schedule hydrogen emergency response refresher", due: "21 May · Due in 2 days", tone: "warn" },
                { title: "Verify practical assessment records for Cohort 3", due: "23 May · Due in 4 days", tone: "warn" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Clock className={cn(
                    "h-3.5 w-3.5 mt-0.5 shrink-0",
                    item.tone === "bad" ? "text-destructive" : "text-warning"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug">{item.title}</p>
                    <p className={cn(
                      "text-[10px] mt-0.5",
                      item.tone === "bad" ? "text-destructive" : "text-warning"
                    )}>
                      {item.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm">Action Board</h3>
            <p className="text-xs text-muted-foreground">Move interventions between columns as work progresses</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {columns.map((col) => (
            <div key={col.id} className="bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="text-xs font-medium">{col.label}</span>
                <Badge variant="outline" className="text-[10px] h-5 min-w-[20px] justify-center">
                  {col.items.length}
                </Badge>
              </div>
              <div className="p-2 space-y-2 min-h-[200px]">
                {col.items.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 cursor-pointer transition-colors">
                    <p className="text-xs font-medium leading-snug mb-2">{item.title}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={cn("text-[9px]", getPriorityTone(item.pri))}>
                        <span className="h-1 w-1 rounded-full mr-1" style={{
                          backgroundColor: item.pri === "high" ? "var(--destructive)" : item.pri === "medium" ? "var(--warning)" : "var(--muted-foreground)"
                        }} />
                        {item.pri}
                      </Badge>
                      <span className={cn(
                        "text-[10px]",
                        item.due === "Overdue" ? "text-destructive" : "text-muted-foreground"
                      )}>
                        {item.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border text-xs text-muted-foreground">
        <Badge variant="outline" className="text-[10px]">Prototype</Badge>
        <span>Prototype view using illustrative data. Not live customer data.</span>
        <span className="ml-auto">Secured by Verciti Trace</span>
      </div>
    </div>
  );
}
