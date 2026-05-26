"use client";

import { useState } from "react";
import { 
  GraduationCap, Target, Users, AlertCircle, TrendingUp, Shield, 
  Package, Upload, Plus, Filter, ChevronDown, Search, Clock, 
  Droplet, Zap, Battery, Wrench, Cpu, ScanLine, Check, User, Layers,
  FileText, History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface Module {
  n: number;
  title: string;
  sector: string;
  duration: number;
  status: "completed" | "progress" | "notstarted" | "refresher";
  progress: number;
  roles: string;
  rule: string;
  evidence: string;
  reval: string;
  impact: string;
  icon: typeof Droplet;
  safetyCritical?: boolean;
}

const iconMap: { [key: string]: typeof Droplet } = {
  droplet: Droplet,
  bolt: Zap,
  battery: Battery,
  wrench: Wrench,
  cpu: Cpu,
  scan: ScanLine,
  shield: Shield,
  package: Package,
  alert: AlertCircle,
  drum: Package,
};

export function TrainingModules() {
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("modules");

  const modules: Module[] = [
    { n: 1, title: "Hydrogen Fundamentals", sector: "Hydrogen", duration: 7, status: "completed", progress: 100, roles: "Hydrogen Technician, Project Manager", rule: "Required knowledge baseline", evidence: "Completion record", reval: "12 months", impact: "Supports progression to Conditional", icon: Droplet },
    { n: 2, title: "Hydrogen Production", sector: "Hydrogen", duration: 11, status: "progress", progress: 92, roles: "Hydrogen Technician, Project Manager", rule: "Hydrogen production awareness required", evidence: "Completion record", reval: "12 months", impact: "Supports hydrogen pathway completion", icon: Droplet },
    { n: 3, title: "Electrolyser(s)", sector: "Hydrogen", duration: 13, status: "progress", progress: 78, roles: "Hydrogen Technician", rule: "Electrolyser awareness required", evidence: "Completion record", reval: "12 months", impact: "Supports role-readiness evidence", icon: ScanLine },
    { n: 4, title: "FCEV", sector: "Hydrogen", duration: 10, status: "progress", progress: 65, roles: "Hydrogen Technician, Fleet Operator", rule: "FCEV awareness required", evidence: "Completion record", reval: "12 months", impact: "Adds sector-specific evidence", icon: Cpu },
    { n: 5, title: "Health and Safety: Environments", sector: "Safety", duration: 11, status: "progress", progress: 85, roles: "Hydrogen Technician, Site Operative", rule: "Safety environment awareness required", evidence: "Completion record", reval: "12 months", impact: "Supports safety-critical assurance", icon: Shield },
    { n: 6, title: "Health and Safety: PPE", sector: "Safety", duration: 9, status: "progress", progress: 90, roles: "Site Operative, Hydrogen Technician", rule: "PPE awareness required", evidence: "Completion record", reval: "12 months", impact: "Supports authorised deployment", icon: Package },
    { n: 7, title: "Storage Tanks", sector: "Hydrogen / Storage", duration: 8, status: "progress", progress: 70, roles: "Hydrogen Technician, Maintenance Tech", rule: "Storage awareness required", evidence: "Completion record", reval: "12 months", impact: "Supports storage system readiness", icon: Package },
    { n: 8, title: "Plant & Machinery", sector: "Hydrogen / Safety", duration: 10, status: "progress", progress: 55, roles: "Maintenance Technician", rule: "Plant safety awareness required", evidence: "Completion record", reval: "12 months", impact: "Supports deployment preparation", icon: Wrench },
    { n: 9, title: "Electrical Theory", sector: "Electrification", duration: 10, status: "progress", progress: 35, roles: "Electrical Installer", rule: "Electrical fundamentals required", evidence: "Completion record", reval: "12 months", impact: "Supports electrification pathway", icon: Zap },
    { n: 10, title: "Intermediate Electrical Theory", sector: "Electrification", duration: 10, status: "notstarted", progress: 10, roles: "Electrical Installer", rule: "Intermediate electrical awareness req.", evidence: "Completion record", reval: "12 months", impact: "Supports role progression", icon: Zap },
    { n: 11, title: "Energy Storage", sector: "Storage / Electrification", duration: 40, status: "notstarted", progress: 9, roles: "Energy Systems Technician", rule: "Storage awareness required", evidence: "Completion record", reval: "12 months", impact: "Supports energy systems readiness", icon: Battery },
    { n: 12, title: "Hazardous Voltage Awareness", sector: "Electrification · Safety-Critical", duration: 10, status: "refresher", progress: 2, roles: "Electrical Installer, HV Engineer", rule: "Required for HV-adjacent safety-critical", evidence: "Completion record + employer verification", reval: "12 months", impact: "Closes high-voltage authorisation gap", icon: AlertCircle, safetyCritical: true },
  ];

  const filterChips = ["All", "Required", "In Progress", "Completed", "Refreshers Due", "Safety-Critical", "Hydrogen", "Electrification", "Role-Based", "Expiring Soon"];

  const filtered = modules.filter(m => {
    if (filter === "All") return true;
    if (filter === "In Progress") return m.status === "progress";
    if (filter === "Completed") return m.status === "completed";
    if (filter === "Refreshers Due") return m.status === "refresher";
    if (filter === "Safety-Critical") return m.safetyCritical;
    if (filter === "Hydrogen") return /Hydrogen/i.test(m.sector);
    if (filter === "Electrification") return /Electrification/i.test(m.sector);
    return true;
  });

  const getStatusBadge = (status: Module["status"]) => {
    const styles = {
      completed: { className: "bg-success/20 text-success", label: "Completed" },
      progress: { className: "bg-warning/20 text-warning", label: "In Progress" },
      notstarted: { className: "bg-muted text-muted-foreground", label: "Not Started" },
      refresher: { className: "bg-destructive/20 text-destructive", label: "Refresher Due" },
    };
    const { className, label } = styles[status];
    return (
      <Badge className={cn("text-[10px]", className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1" />{label}
      </Badge>
    );
  };

  const getSectorBadge = (sector: string) => {
    const lc = sector.toLowerCase();
    let className = "bg-muted/50 text-muted-foreground";
    if (lc.includes("hydrogen")) className = "bg-cyan-500/20 text-cyan-400";
    else if (lc.includes("electrification")) className = "bg-yellow-500/20 text-yellow-400";
    else if (lc.includes("safety")) className = "bg-red-500/20 text-red-400";
    else if (lc.includes("storage")) className = "bg-purple-500/20 text-purple-400";
    return <Badge className={cn("text-[9px]", className)}>{sector}</Badge>;
  };

  const pathwayModules = [
    "Hydrogen Fundamentals", "Hydrogen Production", "Electrolyser(s)", "Storage Tanks",
    "Plant & Machinery", "Health and Safety: Environments", "Health and Safety: PPE",
    "Hazardous Voltage Awareness", "Introduction to Power Electronics", "Energy Storage"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Training Modules</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mt-1">
            Assign immersive learning modules that support workforce readiness, safety-critical assurance and role-based deployment preparation.
          </p>
          <p className="text-xs text-muted-foreground italic mt-1 max-w-2xl">
            Training modules are assigned as readiness interventions. Completion creates evidence that supports role readiness, revalidation and safety-critical assurance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Package className="h-4 w-4 mr-2" />TRACE Workspace <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />Import Module Evidence
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />Assign Training Intervention
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/30">
          {[
            { id: "queue", label: "Action Queue" },
            { id: "modules", label: "Training Modules" },
            { id: "assess", label: "Assessment Tasks" },
            { id: "ev", label: "Evidence Requests" },
            { id: "reval", label: "Revalidation" },
            { id: "tmpl", label: "Templates" },
          ].map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { icon: GraduationCap, label: "Active Training Modules", value: "21", sub: "Hydrogen and electrification", color: "default" },
          { icon: Target, label: "Open Training Interventions", value: "18", sub: "↑ 4 vs last 30 days", color: "primary" },
          { icon: Users, label: "Workers Affected", value: "143", sub: "Across 9 organisations", color: "default" },
          { icon: AlertCircle, label: "Mandatory Refreshers Due", value: "27", sub: "At risk", color: "warning" },
          { icon: TrendingUp, label: "Readiness Uplift Potential", value: "+14%", sub: "If open interventions complete", color: "primary" },
          { icon: Shield, label: "Safety-Critical Modules", value: "12", sub: "Linked to assurance rules", color: "default" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center",
                kpi.color === "warning" && "bg-warning/10 text-warning",
                kpi.color === "primary" && "bg-primary/10 text-primary",
                kpi.color === "default" && "bg-muted text-muted-foreground"
              )}>
                <kpi.icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] text-muted-foreground">{kpi.label}</span>
            </div>
            <div className={cn(
              "text-xl font-semibold",
              kpi.color === "warning" && "text-warning",
              kpi.color === "primary" && "text-primary"
            )}>
              {kpi.value}
            </div>
            <div className={cn(
              "text-[10px] mt-0.5",
              kpi.color === "warning" && "text-warning",
              kpi.color === "primary" && "text-primary",
              kpi.color === "default" && "text-muted-foreground"
            )}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8 space-y-4">
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {filterChips.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs border transition-colors",
                  filter === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/30 text-muted-foreground border-border hover:bg-muted"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search modules by role, readiness rule, sector or keyword..." 
                className="pl-10 h-9 text-xs"
              />
            </div>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-2" />Filters <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filtered.map(m => (
              <div 
                key={m.n} 
                className={cn(
                  "rounded-xl border bg-card p-4",
                  m.safetyCritical ? "border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent" : "border-border"
                )}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    m.safetyCritical ? "bg-destructive/20 text-destructive" : "bg-primary/10 text-primary"
                  )}>
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{m.title}</div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {getSectorBadge(m.sector)}
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />{m.duration} min
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(m.status)}
                </div>

                {/* Progress */}
                {(m.status === "progress" || m.status === "completed" || m.status === "refresher") && (
                  <div className="flex items-center gap-2 mb-3">
                    <Progress 
                      value={m.progress} 
                      className={cn(
                        "h-1.5 flex-1",
                        m.status === "refresher" && "[&>div]:bg-destructive",
                        m.status === "completed" && "[&>div]:bg-success"
                      )} 
                    />
                    <span className={cn(
                      "text-[10px] font-mono w-8 text-right",
                      m.status === "refresher" && "text-destructive",
                      m.status === "completed" && "text-success"
                    )}>
                      {m.status === "refresher" ? "Due" : `${m.progress}%`}
                    </span>
                  </div>
                )}

                {/* Meta */}
                <div className="space-y-2 mb-3">
                  {[
                    { icon: Users, label: "Linked roles", value: m.roles },
                    { icon: Target, label: "Readiness rule", value: m.rule },
                    { icon: FileText, label: "Evidence output", value: m.evidence },
                    { icon: History, label: "Revalidation", value: m.reval },
                  ].map((meta, i) => (
                    <div key={i} className="flex items-start gap-2 text-[10px]">
                      <meta.icon className="h-2.5 w-2.5 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground w-20 flex-shrink-0">{meta.label}</span>
                      <span className="text-foreground/80 truncate">{meta.value}</span>
                    </div>
                  ))}
                </div>

                {/* Impact */}
                <div className="flex items-center gap-1.5 text-[10px] text-primary mb-3 p-2 rounded bg-primary/5">
                  <TrendingUp className="h-2.5 w-2.5" />
                  <span>Readiness impact: {m.impact}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-[10px] h-7 flex-1">
                    <Plus className="h-2.5 w-2.5 mr-1" />Assign
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[10px] h-7">
                    <Shield className="h-2.5 w-2.5 mr-1" />Rules
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[10px] h-7">
                    <Layers className="h-2.5 w-2.5 mr-1" />Path
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="col-span-4 space-y-4">
          {/* Pathway Card */}
          <div className="rounded-xl border border-border bg-card">
            <div className="p-3 border-b border-border flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Recommended Readiness Pathway</span>
            </div>
            <div className="p-4">
              <div className="text-[10px] text-muted-foreground mb-1">For Hydrogen Project Manager</div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">Hydrogen Project Essentials</span>
                <Badge className="text-[9px] bg-violet-500/20 text-violet-400">10 modules</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground mb-4">
                Builds essential technical and safety knowledge for managing hydrogen and energy projects.
              </p>

              <div className="space-y-2 mb-4">
                {pathwayModules.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-primary/10 text-primary text-[10px] flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    <span className="text-xs truncate">{p}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Estimated duration</span>
                  <span className="flex items-center gap-1 font-mono"><Clock className="h-2.5 w-2.5 text-primary" />2h 19m</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Readiness impact</span>
                  <span className="font-mono text-primary">+22% role-readiness</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Evidence output</span>
                  <span className="font-mono">Mapped to PM role profile</span>
                </div>
              </div>

              <Button size="sm" className="w-full mt-4 text-xs">
                Assign Readiness Pathway
              </Button>
            </div>
          </div>

          {/* Why This Pathway */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium mb-2">Why this pathway?</div>
            <p className="text-[10px] text-muted-foreground mb-3">
              This pathway builds evidence against the Hydrogen Project Manager role profile and supports readiness for hydrogen and energy project environments.
            </p>
            <div className="space-y-1.5">
              {[
                "Aligned to role requirements",
                "Supports evidence generation",
                "Can close readiness gaps",
                "Includes safety-critical awareness modules"
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <Check className="h-2.5 w-2.5 text-primary" />
                  <span className="text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
