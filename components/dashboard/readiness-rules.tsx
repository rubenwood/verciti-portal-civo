"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Layers,
  Shield,
  Target,
  FileText,
  Clock,
  CheckCircle,
  Plus,
  Search,
  ChevronDown,
  ChevronRight,
  Copy,
  MoreHorizontal,
  AlertCircle,
  X,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Types
interface Role {
  id: string;
  name: string;
  sector: string;
  status: "active" | "future";
  safetyCritical: boolean;
  version: string;
  lastUpdated: string;
  approvedBy: string;
}

interface EvidenceRequirement {
  id: string;
  requirement: string;
  verificationLevel: string;
  expiryRule: string;
  mandatory: boolean;
}

interface ReadinessCondition {
  condition: string;
  status: string;
  tone: "ok" | "warn" | "info" | "bad";
}

interface ExpiryRule {
  item: string;
  warnThreshold: string;
  action: string;
}

interface LinkedIntervention {
  failCondition: string;
  intervention: string;
}

// Mock Data
const ROLES: Role[] = [
  { id: "hv-engineer", name: "High-Voltage Engineer", sector: "Electrification", status: "active", safetyCritical: true, version: "v1.4", lastUpdated: "14 May 2025", approvedBy: "E. Okafor" },
  { id: "h2-tech", name: "Hydrogen Technician", sector: "Hydrogen", status: "active", safetyCritical: true, version: "v2.1", lastUpdated: "10 May 2025", approvedBy: "M. Patel" },
  { id: "elec-installer", name: "Electrical Installer", sector: "Electrification", status: "active", safetyCritical: false, version: "v1.2", lastUpdated: "08 May 2025", approvedBy: "S. Turner" },
  { id: "emergency", name: "Emergency Response Lead", sector: "Hydrogen", status: "active", safetyCritical: true, version: "v1.1", lastUpdated: "02 May 2025", approvedBy: "E. Okafor" },
  { id: "maint-tech", name: "Maintenance Technician", sector: "Cross-sector", status: "active", safetyCritical: false, version: "v1.3", lastUpdated: "28 Apr 2025", approvedBy: "M. Patel" },
  { id: "ptw-super", name: "Permit-to-Work Supervisor", sector: "Safety-Critical", status: "active", safetyCritical: true, version: "v1.0", lastUpdated: "18 Apr 2025", approvedBy: "S. Turner" },
  { id: "nuclear-op", name: "Nuclear Site Operative", sector: "Advanced Nuclear / SMR", status: "future", safetyCritical: true, version: "v0.1", lastUpdated: "Draft", approvedBy: "Pending" },
];

const EVIDENCE_REQUIREMENTS: Record<string, EvidenceRequirement[]> = {
  "hv-engineer": [
    { id: "ev1", requirement: "High-voltage awareness", verificationLevel: "Level 2+ Training provider verified", expiryRule: "12 months", mandatory: true },
    { id: "ev2", requirement: "Employer authorisation for HV work", verificationLevel: "Level 3+ Employer verified", expiryRule: "12 months", mandatory: true },
    { id: "ev3", requirement: "Practical assessment for HV competency", verificationLevel: "Level 4 Assessor verified", expiryRule: "12 months", mandatory: true },
    { id: "ev4", requirement: "Site induction", verificationLevel: "Level 5 Site authority verified", expiryRule: "Project duration", mandatory: true },
    { id: "ev5", requirement: "Medical / fitness status", verificationLevel: "Restricted evidence status", expiryRule: "12 months", mandatory: false },
    { id: "ev6", requirement: "Permit-to-work awareness", verificationLevel: "Level 3+ Employer verified", expiryRule: "24 months", mandatory: false },
  ],
  "h2-tech": [
    { id: "ev1", requirement: "Hydrogen safety fundamentals", verificationLevel: "Level 2+ Training provider verified", expiryRule: "12 months", mandatory: true },
    { id: "ev2", requirement: "ATEX certification", verificationLevel: "Level 3+ Employer verified", expiryRule: "24 months", mandatory: true },
    { id: "ev3", requirement: "Emergency response training", verificationLevel: "Level 4 Assessor verified", expiryRule: "12 months", mandatory: true },
    { id: "ev4", requirement: "Electrolyser operations", verificationLevel: "Level 4 Assessor verified", expiryRule: "24 months", mandatory: true },
    { id: "ev5", requirement: "Site induction", verificationLevel: "Level 5 Site authority verified", expiryRule: "Project duration", mandatory: true },
  ],
};

const READINESS_LOGIC: ReadinessCondition[] = [
  { condition: "All mandatory evidence current and verified", status: "Deployment-ready", tone: "ok" },
  { condition: "Evidence complete but site induction pending", status: "Conditional", tone: "warn" },
  { condition: "Mandatory evidence missing", status: "Evidence required", tone: "info" },
  { condition: "Safety-critical evidence expired", status: "Not authorised", tone: "bad" },
  { condition: "Employer authorisation missing", status: "Blocked", tone: "bad" },
  { condition: "Evidence confidence below required level", status: "Verification pending", tone: "info" },
];

const EXPIRY_RULES: ExpiryRule[] = [
  { item: "HV awareness", warnThreshold: "60 days", action: "Assign refresher" },
  { item: "Employer authorisation", warnThreshold: "30 days", action: "Request revalidation" },
  { item: "Practical assessment", warnThreshold: "60 days", action: "Schedule reassessment" },
  { item: "Site induction", warnThreshold: "30 days", action: "Request site renewal" },
];

const LINKED_INTERVENTIONS: LinkedIntervention[] = [
  { failCondition: "HV awareness expired", intervention: "Assign Hazardous Voltage Awareness refresher" },
  { failCondition: "Practical assessment missing", intervention: "Create assessment task" },
  { failCondition: "Employer sign-off missing", intervention: "Request employer verification" },
  { failCondition: "Site induction missing", intervention: "Request site induction record" },
];

const VERSION_HISTORY = [
  { ver: "v1.4", change: "Added site induction as mandatory evidence", by: "E. Okafor", date: "14 May 2025" },
  { ver: "v1.3", change: "Updated HV awareness revalidation to 12 months", by: "M. Patel", date: "02 May 2025" },
  { ver: "v1.2", change: "Added employer authorisation requirement", by: "S. Turner", date: "18 Apr 2025" },
  { ver: "v1.1", change: "Initial role rule configured", by: "System", date: "04 Apr 2025" },
];

export function ReadinessRules() {
  const [selectedRoleId, setSelectedRoleId] = useState("hv-engineer");
  const [builderTab, setBuilderTab] = useState<"evidence" | "logic" | "expiry" | "interventions">("evidence");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewRuleDialog, setShowNewRuleDialog] = useState(false);

  const selectedRole = ROLES.find(r => r.id === selectedRoleId) || ROLES[0];
  const evidenceReqs = EVIDENCE_REQUIREMENTS[selectedRoleId] || EVIDENCE_REQUIREMENTS["hv-engineer"];

  const filteredRoles = ROLES.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold tracking-tight">Readiness Rules Engine</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure role requirements, evidence rules, expiry logic and authorisation conditions that determine deployment readiness.
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3" />
            TRACE calculates readiness by assessing verified evidence against role-specific, safety-critical and project-specific rules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Layers className="h-4 w-4" />
            All sectors
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Clock className="h-4 w-4" />
            Last 30 days
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setShowNewRuleDialog(true)}>
            <Plus className="h-4 w-4" />
            New Rule
          </Button>
        </div>
      </div>

      {/* Readiness Formula Strip */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-primary/5 via-muted/30 to-primary/5 border border-border">
        <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
          <span className="px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary font-medium">Role requirements</span>
          <Plus className="h-3 w-3 text-muted-foreground" />
          <span className="px-2.5 py-1.5 rounded-lg bg-success/10 text-success font-medium">Verified evidence</span>
          <Plus className="h-3 w-3 text-muted-foreground" />
          <span className="px-2.5 py-1.5 rounded-lg bg-warning/10 text-warning font-medium">Expiry status</span>
          <Plus className="h-3 w-3 text-muted-foreground" />
          <span className="px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary font-medium">Authorisation status</span>
          <Plus className="h-3 w-3 text-muted-foreground" />
          <span className="px-2.5 py-1.5 rounded-lg bg-destructive/10 text-destructive font-medium">Safety-critical rules</span>
          <ChevronRight className="h-4 w-4 text-primary" />
          <span className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5" />
            Deployment readiness
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: Layers, label: "Active Readiness Rules", value: "42", sub: "Across configured sectors" },
          { icon: Shield, label: "Safety-Critical Rules", value: "18", sub: "Require controlled approval", tone: "warn" },
          { icon: Target, label: "Role Templates", value: "26", sub: "Active role profiles" },
          { icon: FileText, label: "Evidence Requirements", value: "186", sub: "Mapped to readiness logic" },
          { icon: Clock, label: "Rules Pending Approval", value: "5", sub: "Awaiting review", tone: "warn" },
          { icon: CheckCircle, label: "Rules Updated This Month", value: "12", sub: "Version-controlled changes", tone: "ok" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
            </div>
            <p className={cn(
              "text-2xl font-bold",
              kpi.tone === "warn" ? "text-warning" : kpi.tone === "ok" ? "text-success" : "text-foreground"
            )}>
              {kpi.value}
            </p>
            <p className={cn(
              "text-[10px] mt-1",
              kpi.tone === "warn" ? "text-warning" : kpi.tone === "ok" ? "text-success" : "text-muted-foreground"
            )}>
              {kpi.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Three-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Role Library */}
        <aside className="lg:col-span-3 p-4 rounded-xl bg-muted/30 border border-border">
          <h3 className="font-semibold text-sm mb-3">Role / Rule Library</h3>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search roles..." 
              className="pl-9 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {["Sector: All", "Status: All", "Safety-critical: All"].map((f, i) => (
              <Button key={i} variant="outline" size="sm" className="h-6 text-[10px] px-2 gap-1">
                {f}
                <ChevronDown className="h-2.5 w-2.5" />
              </Button>
            ))}
          </div>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredRoles.map(role => (
              <div 
                key={role.id}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all",
                  role.id === selectedRoleId 
                    ? "bg-primary/10 border-primary/30" 
                    : "bg-background border-border hover:border-primary/20"
                )}
                onClick={() => setSelectedRoleId(role.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{role.name}</p>
                    <p className="text-[10px] text-muted-foreground">{role.sector}</p>
                    {role.status === "future" && (
                      <p className="text-[10px] text-muted-foreground italic mt-1">Illustrative future pathway</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className={cn(
                      "text-[9px] px-1.5",
                      role.status === "active" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                    )}>
                      {role.status === "active" ? "Active" : "Future"}
                    </Badge>
                    {role.safetyCritical && (
                      <Badge variant="outline" className="text-[9px] px-1.5 bg-warning/10 text-warning border-warning/20">
                        Safety-critical
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3 gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            New Role Template
          </Button>
        </aside>

        {/* Center: Rule Builder */}
        <main className="lg:col-span-9 space-y-4">
          {/* Role Header */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedRole.name}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                  <span>Sector: <span className="text-foreground">{selectedRole.sector}</span></span>
                  <span>Safety-critical: <span className={selectedRole.safetyCritical ? "text-warning" : "text-foreground"}>{selectedRole.safetyCritical ? "Yes" : "No"}</span></span>
                  <span>Status: 
                    <Badge variant="outline" className={cn("ml-1 text-[10px]", selectedRole.status === "active" ? "bg-success/10 text-success" : "bg-primary/10 text-primary")}>
                      {selectedRole.status === "active" ? "Active" : "Future pathway"}
                    </Badge>
                  </span>
                  <span>Version: <span className="font-mono text-foreground">{selectedRole.version}</span></span>
                  <span>Last updated: <span className="text-foreground">{selectedRole.lastUpdated}</span></span>
                  <span>Approved by: <span className="text-foreground">{selectedRole.approvedBy}</span></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Copy className="h-3.5 w-3.5" />
                  Duplicate
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sub Tabs */}
          <div className="flex items-center gap-1 border-b border-border">
            {[
              { id: "evidence", label: "Evidence Rules" },
              { id: "logic", label: "Readiness Logic" },
              { id: "expiry", label: "Expiry & Revalidation" },
              { id: "interventions", label: "Linked Interventions" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setBuilderTab(tab.id as typeof builderTab)}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                  builderTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {builderTab === "evidence" && (
            <div className="space-y-4">
              {/* Required Evidence Table */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <h3 className="font-medium text-sm">A. Required Evidence</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/20">
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Evidence requirement</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Verification level</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Expiry rule</th>
                        <th className="text-center p-3 text-xs font-medium text-muted-foreground w-24">Mandatory</th>
                      </tr>
                    </thead>
                    <tbody>
                      {evidenceReqs.map((ev) => (
                        <tr key={ev.id} className="border-b border-border last:border-0 hover:bg-muted/10">
                          <td className="p-3 text-sm">{ev.requirement}</td>
                          <td className="p-3 text-xs text-muted-foreground">{ev.verificationLevel}</td>
                          <td className="p-3 text-xs font-mono">{ev.expiryRule}</td>
                          <td className="p-3 text-center">
                            {ev.mandatory ? (
                              <CheckCircle className="h-4 w-4 text-success mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Readiness Status Logic */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <h3 className="font-medium text-sm">B. Readiness Status Logic</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">How TRACE converts rule outcomes into deployment status</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/20">
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Condition</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Output status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {READINESS_LOGIC.map((logic, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10">
                          <td className="p-3 text-sm">{logic.condition}</td>
                          <td className="p-3">
                            <Badge variant="outline" className={cn("text-xs", getStatusColor(logic.tone))}>
                              {logic.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rule Summary */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <h3 className="font-medium text-sm">C. Rule Summary</h3>
                </div>
                <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    ["Total evidence requirements", evidenceReqs.length.toString()],
                    ["Mandatory requirements", evidenceReqs.filter(e => e.mandatory).length.toString()],
                    ["Conditional requirements", evidenceReqs.filter(e => !e.mandatory).length.toString()],
                    ["Safety-critical", selectedRole.safetyCritical ? "Yes" : "No"],
                    ["Default verification level", "Level 3+"],
                    ["Review cycle", "12 months"],
                    ["Applies to projects", "7"],
                  ].map(([label, value], i) => (
                    <div key={i}>
                      <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
                      <p className="text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {builderTab === "expiry" && (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="p-3 bg-muted/30 border-b border-border">
                <h3 className="font-medium text-sm">Expiry & Revalidation Logic</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left p-3 text-xs font-medium text-muted-foreground">Evidence item</th>
                      <th className="text-left p-3 text-xs font-medium text-muted-foreground">Warning threshold</th>
                      <th className="text-left p-3 text-xs font-medium text-muted-foreground">Expiry action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXPIRY_RULES.map((rule, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10">
                        <td className="p-3 text-sm">{rule.item}</td>
                        <td className="p-3 text-xs font-mono">{rule.warnThreshold}</td>
                        <td className="p-3 text-sm text-muted-foreground">{rule.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {builderTab === "interventions" && (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="p-3 bg-muted/30 border-b border-border">
                <h3 className="font-medium text-sm">Linked Interventions</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Failed rules auto-recommend these actions</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left p-3 text-xs font-medium text-muted-foreground">Failed rule</th>
                      <th className="text-left p-3 text-xs font-medium text-muted-foreground">Recommended intervention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LINKED_INTERVENTIONS.map((int, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10">
                        <td className="p-3 text-sm">{int.failCondition}</td>
                        <td className="p-3 text-sm text-muted-foreground">{int.intervention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {builderTab === "logic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Version History */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <h3 className="font-medium text-sm">Version History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/20">
                        <th className="text-left p-2 text-[10px] font-medium text-muted-foreground">Ver</th>
                        <th className="text-left p-2 text-[10px] font-medium text-muted-foreground">Change</th>
                        <th className="text-left p-2 text-[10px] font-medium text-muted-foreground">By</th>
                        <th className="text-left p-2 text-[10px] font-medium text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {VERSION_HISTORY.map((v, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          <td className="p-2 text-xs font-mono">{v.ver}</td>
                          <td className="p-2 text-xs">{v.change}</td>
                          <td className="p-2 text-xs text-muted-foreground">{v.by}</td>
                          <td className="p-2 text-xs font-mono text-muted-foreground">{v.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Approval Workflow */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <h3 className="font-medium text-sm">Approval Workflow</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                    {["Draft", "Assessor Review", "Employer Approval", "Active Rule", "Version Locked"].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-1 rounded text-[10px]",
                          i < 4 ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                        )}>
                          {step}
                        </span>
                        {i < 4 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Current status: <span className="text-success">Active Rule — Version Locked</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="justify-start text-xs">Duplicate Rule</Button>
                    <Button variant="outline" size="sm" className="justify-start text-xs">Submit for Review</Button>
                    <Button variant="outline" size="sm" className="justify-start text-xs">Archive Rule</Button>
                    <Button size="sm" className="justify-start text-xs">Create New Version</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Rule Dialog */}
      <Dialog open={showNewRuleDialog} onOpenChange={setShowNewRuleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Readiness Rule</DialogTitle>
            <DialogDescription>
              Define evidence requirements for a new role or project context.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium">Rule Name</label>
              <Input className="mt-1.5" placeholder="e.g., Hydrogen Safety Technician" />
            </div>
            <div>
              <label className="text-sm font-medium">Sector</label>
              <Input className="mt-1.5" placeholder="e.g., Hydrogen, Electrification" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="safety-critical" className="rounded" />
              <label htmlFor="safety-critical" className="text-sm">Mark as safety-critical role</label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowNewRuleDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowNewRuleDialog(false)}>Create Rule</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
