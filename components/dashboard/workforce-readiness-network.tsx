"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Building2,
  MapPin,
  TrendingUp,
  TrendingDown,
  Shield,
  FileText,
  Target,
  Share2,
  Download,
  Filter,
  MoreHorizontal,
  ExternalLink,
  Layers,
  Package,
  AlertCircle,
} from "lucide-react";

// Types for the supply chain network
interface Supplier {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  readiness: number;
  status: "ready" | "conditional" | "at-risk" | "blocked";
  workers: number;
  workersReady: number;
  workersConditional: number;
  workersBlocked: number;
  evidenceLevel: number;
  expiryRisk: "low" | "medium" | "high";
  rolesCovered: number;
  rolesRequired: number;
  region: string;
  risks: { type: string; severity: "high" | "medium" | "low"; description: string }[];
  projects: string[];
}

interface SupplyChainNode {
  id: string;
  name: string;
  type: "project" | "tier1" | "tier2" | "tier3";
  readiness: number;
  status: "ready" | "conditional" | "at-risk" | "blocked";
  children?: SupplyChainNode[];
  supplier?: Supplier;
}

// Mock supply chain data
const mockSuppliers: Supplier[] = [
  {
    id: "sup1",
    name: "GreenVolt Ltd",
    tier: 1,
    readiness: 81,
    status: "conditional",
    workers: 126,
    workersReady: 68,
    workersConditional: 31,
    workersBlocked: 27,
    evidenceLevel: 4,
    expiryRisk: "medium",
    rolesCovered: 5,
    rolesRequired: 5,
    region: "North East UK",
    risks: [
      { type: "Evidence Gap", severity: "medium", description: "HV authorisation evidence missing for 8 workers" },
      { type: "Training Overdue", severity: "high", description: "Hydrogen emergency response refresher overdue" },
    ],
    projects: ["Aberdeen Hydrogen Plant", "NE EV Infrastructure"],
  },
  {
    id: "sup2",
    name: "Northern Power Services",
    tier: 1,
    readiness: 76,
    status: "conditional",
    workers: 98,
    workersReady: 52,
    workersConditional: 28,
    workersBlocked: 18,
    evidenceLevel: 3,
    expiryRisk: "high",
    rolesCovered: 4,
    rolesRequired: 5,
    region: "North West UK",
    risks: [
      { type: "Expiry Risk", severity: "high", description: "12 certifications expiring within 30 days" },
      { type: "Role Gap", severity: "medium", description: "Missing Emergency Response Lead coverage" },
    ],
    projects: ["Trafford Green Hydrogen"],
  },
  {
    id: "sup3",
    name: "HydraGen Solutions",
    tier: 1,
    readiness: 92,
    status: "ready",
    workers: 84,
    workersReady: 71,
    workersConditional: 10,
    workersBlocked: 3,
    evidenceLevel: 4,
    expiryRisk: "low",
    rolesCovered: 5,
    rolesRequired: 5,
    region: "Scotland",
    risks: [],
    projects: ["St Fergus Hydrogen Storage"],
  },
  {
    id: "sup4",
    name: "FieldCore Engineering",
    tier: 2,
    readiness: 59,
    status: "at-risk",
    workers: 45,
    workersReady: 18,
    workersConditional: 15,
    workersBlocked: 12,
    evidenceLevel: 2,
    expiryRisk: "high",
    rolesCovered: 3,
    rolesRequired: 5,
    region: "Midlands",
    risks: [
      { type: "Evidence Gap", severity: "high", description: "Expired certificates for 12 workers" },
      { type: "Authorisation", severity: "high", description: "Missing employer sign-offs" },
      { type: "Training Gap", severity: "medium", description: "Site induction incomplete" },
    ],
    projects: ["Humber Energy Systems"],
  },
  {
    id: "sup5",
    name: "ElecPro Systems",
    tier: 2,
    readiness: 69,
    status: "conditional",
    workers: 62,
    workersReady: 34,
    workersConditional: 18,
    workersBlocked: 10,
    evidenceLevel: 3,
    expiryRisk: "medium",
    rolesCovered: 4,
    rolesRequired: 5,
    region: "South East UK",
    risks: [
      { type: "Evidence Gap", severity: "medium", description: "Practical assessment records missing" },
    ],
    projects: ["Isle of Grain Storage"],
  },
  {
    id: "sup6",
    name: "SafeGrid Services",
    tier: 3,
    readiness: 48,
    status: "blocked",
    workers: 28,
    workersReady: 8,
    workersConditional: 10,
    workersBlocked: 10,
    evidenceLevel: 2,
    expiryRisk: "high",
    rolesCovered: 2,
    rolesRequired: 4,
    region: "Wales",
    risks: [
      { type: "Critical Blocker", severity: "high", description: "No valid safety certifications" },
      { type: "Evidence Gap", severity: "high", description: "Missing all Cat-1 evidence" },
      { type: "Role Gap", severity: "high", description: "Only 50% role coverage" },
    ],
    projects: ["Milford Haven Terminal"],
  },
];

// Build supply chain tree
const supplyChainTree: SupplyChainNode = {
  id: "portfolio",
  name: "Regional Net Zero Infrastructure",
  type: "project",
  readiness: 72,
  status: "conditional",
  children: [
    {
      id: "tier1-group",
      name: "Tier 1 Suppliers",
      type: "tier1",
      readiness: 83,
      status: "conditional",
      children: mockSuppliers.filter(s => s.tier === 1).map(s => ({
        id: s.id,
        name: s.name,
        type: "tier1" as const,
        readiness: s.readiness,
        status: s.status,
        supplier: s,
      })),
    },
    {
      id: "tier2-group",
      name: "Tier 2 Suppliers",
      type: "tier2",
      readiness: 64,
      status: "at-risk",
      children: mockSuppliers.filter(s => s.tier === 2).map(s => ({
        id: s.id,
        name: s.name,
        type: "tier2" as const,
        readiness: s.readiness,
        status: s.status,
        supplier: s,
      })),
    },
    {
      id: "tier3-group",
      name: "Tier 3 Suppliers",
      type: "tier3",
      readiness: 48,
      status: "blocked",
      children: mockSuppliers.filter(s => s.tier === 3).map(s => ({
        id: s.id,
        name: s.name,
        type: "tier3" as const,
        readiness: s.readiness,
        status: s.status,
        supplier: s,
      })),
    },
  ],
};

// Status styling helpers
const getStatusColor = (status: string) => {
  switch (status) {
    case "ready": return "bg-success/10 text-success border-success/20";
    case "conditional": return "bg-warning/10 text-warning border-warning/20";
    case "at-risk": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "blocked": return "bg-destructive/10 text-destructive border-destructive/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusDot = (status: string) => {
  switch (status) {
    case "ready": return "bg-success";
    case "conditional": return "bg-warning";
    case "at-risk": return "bg-orange-500";
    case "blocked": return "bg-destructive";
    default: return "bg-muted-foreground";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high": return "text-destructive";
    case "medium": return "text-warning";
    case "low": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
};

// Supply Chain Network Visualization
function SupplyChainVisualization({ 
  selectedSupplier, 
  onSelectSupplier 
}: { 
  selectedSupplier: Supplier | null;
  onSelectSupplier: (supplier: Supplier | null) => void;
}) {
  const tier1 = mockSuppliers.filter(s => s.tier === 1);
  const tier2 = mockSuppliers.filter(s => s.tier === 2);
  const tier3 = mockSuppliers.filter(s => s.tier === 3);

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-b from-muted/20 to-background rounded-xl border border-border overflow-hidden">
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Network visualization */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Connection lines from Project to Tier 1 */}
        {tier1.map((s, i) => {
          const startX = 120;
          const startY = 200;
          const endX = 280;
          const endY = 80 + i * 110;
          return (
            <path
              key={`line-t1-${s.id}`}
              d={`M${startX},${startY} C${startX + 80},${startY} ${endX - 80},${endY} ${endX},${endY}`}
              fill="none"
              stroke={s.status === "ready" ? "#22c55e" : s.status === "blocked" ? "#ef4444" : "#f59e0b"}
              strokeWidth="2"
              strokeOpacity="0.4"
              strokeDasharray={s.status === "blocked" ? "4 4" : "none"}
            />
          );
        })}

        {/* Connection lines from Tier 1 to Tier 2 */}
        {tier2.map((s, i) => {
          const startX = 360;
          const startY = 140;
          const endX = 520;
          const endY = 120 + i * 160;
          return (
            <path
              key={`line-t2-${s.id}`}
              d={`M${startX},${startY} C${startX + 80},${startY} ${endX - 80},${endY} ${endX},${endY}`}
              fill="none"
              stroke={s.status === "ready" ? "#22c55e" : s.status === "blocked" ? "#ef4444" : "#f59e0b"}
              strokeWidth="2"
              strokeOpacity="0.4"
              strokeDasharray={s.status === "blocked" ? "4 4" : "none"}
            />
          );
        })}

        {/* Connection lines from Tier 2 to Tier 3 */}
        {tier3.map((s, i) => {
          const startX = 600;
          const startY = 200;
          const endX = 720;
          const endY = 180 + i * 40;
          return (
            <path
              key={`line-t3-${s.id}`}
              d={`M${startX},${startY} C${startX + 60},${startY} ${endX - 60},${endY} ${endX},${endY}`}
              fill="none"
              stroke={s.status === "ready" ? "#22c55e" : s.status === "blocked" ? "#ef4444" : "#f59e0b"}
              strokeWidth="2"
              strokeOpacity="0.4"
              strokeDasharray={s.status === "blocked" ? "4 4" : "none"}
            />
          );
        })}
      </svg>

      {/* Project Node (Center-left) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        <div className="w-32 p-3 rounded-xl bg-primary/10 border-2 border-primary">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Portfolio</span>
          </div>
          <p className="text-[10px] text-muted-foreground mb-2">Regional Net Zero</p>
          <div className="flex items-center gap-1">
            <div className="text-lg font-bold">72%</div>
            <Badge variant="outline" className={cn("text-[9px] px-1", getStatusColor("conditional"))}>
              Conditional
            </Badge>
          </div>
        </div>
      </div>

      {/* Tier 1 Suppliers */}
      <div className="absolute left-56 top-4 flex flex-col gap-3">
        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Tier 1</div>
        {tier1.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelectSupplier(selectedSupplier?.id === s.id ? null : s)}
            className={cn(
              "w-28 p-2 rounded-lg border cursor-pointer transition-all",
              selectedSupplier?.id === s.id 
                ? "bg-primary/10 border-primary shadow-lg scale-105" 
                : "bg-card border-border hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-1 mb-1">
              <div className={cn("h-2 w-2 rounded-full", getStatusDot(s.status))} />
              <span className="text-[10px] font-medium truncate">{s.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{s.readiness}%</span>
              <span className="text-[9px] text-muted-foreground">{s.workers}w</span>
            </div>
            {s.risks.length > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-warning" />
                <span className="text-[9px] text-warning">{s.risks.length} risks</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tier 2 Suppliers */}
      <div className="absolute left-[420px] top-12 flex flex-col gap-3">
        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Tier 2</div>
        {tier2.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelectSupplier(selectedSupplier?.id === s.id ? null : s)}
            className={cn(
              "w-28 p-2 rounded-lg border cursor-pointer transition-all",
              selectedSupplier?.id === s.id 
                ? "bg-primary/10 border-primary shadow-lg scale-105" 
                : "bg-card border-border hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-1 mb-1">
              <div className={cn("h-2 w-2 rounded-full", getStatusDot(s.status))} />
              <span className="text-[10px] font-medium truncate">{s.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{s.readiness}%</span>
              <span className="text-[9px] text-muted-foreground">{s.workers}w</span>
            </div>
            {s.risks.length > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-destructive" />
                <span className="text-[9px] text-destructive">{s.risks.length} risks</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tier 3 Suppliers */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Tier 3</div>
        {tier3.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelectSupplier(selectedSupplier?.id === s.id ? null : s)}
            className={cn(
              "w-28 p-2 rounded-lg border cursor-pointer transition-all",
              selectedSupplier?.id === s.id 
                ? "bg-primary/10 border-primary shadow-lg scale-105" 
                : "bg-card border-border hover:border-primary/50"
            )}
          >
            <div className="flex items-center gap-1 mb-1">
              <div className={cn("h-2 w-2 rounded-full", getStatusDot(s.status))} />
              <span className="text-[10px] font-medium truncate">{s.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{s.readiness}%</span>
              <span className="text-[9px] text-muted-foreground">{s.workers}w</span>
            </div>
            {s.risks.length > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <XCircle className="h-3 w-3 text-destructive" />
                <span className="text-[9px] text-destructive">{s.risks.length} risks</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-4 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span>Ready</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-warning" />
          <span>Conditional</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-orange-500" />
          <span>At Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-destructive" />
          <span>Blocked</span>
        </div>
      </div>
    </div>
  );
}

// Supplier Detail Panel
function SupplierDetailPanel({ supplier }: { supplier: Supplier }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{supplier.name}</h3>
            <Badge variant="outline" className={cn("text-xs", getStatusColor(supplier.status))}>
              <span className={cn("h-1.5 w-1.5 rounded-full mr-1", getStatusDot(supplier.status))} />
              {supplier.status === "at-risk" ? "At Risk" : supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Tier {supplier.tier} Supplier</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{supplier.readiness}%</div>
          <p className="text-xs text-muted-foreground">Readiness Score</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2">
        <div className="p-2 rounded-lg bg-muted/30 border border-border text-center">
          <p className="text-lg font-bold">{supplier.workers}</p>
          <p className="text-[10px] text-muted-foreground">Total Workers</p>
        </div>
        <div className="p-2 rounded-lg bg-success/10 border border-success/20 text-center">
          <p className="text-lg font-bold text-success">{supplier.workersReady}</p>
          <p className="text-[10px] text-muted-foreground">Ready</p>
        </div>
        <div className="p-2 rounded-lg bg-warning/10 border border-warning/20 text-center">
          <p className="text-lg font-bold text-warning">{supplier.workersConditional}</p>
          <p className="text-[10px] text-muted-foreground">Conditional</p>
        </div>
        <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
          <p className="text-lg font-bold text-destructive">{supplier.workersBlocked}</p>
          <p className="text-[10px] text-muted-foreground">Blocked</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Evidence Confidence</span>
          <Badge variant="outline" className="text-xs">Level {supplier.evidenceLevel}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Role Coverage</span>
          <span className="text-sm font-medium">{supplier.rolesCovered} / {supplier.rolesRequired}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Expiry Risk</span>
          <Badge variant="outline" className={cn("text-xs", 
            supplier.expiryRisk === "high" ? "bg-destructive/10 text-destructive border-destructive/20" :
            supplier.expiryRisk === "medium" ? "bg-warning/10 text-warning border-warning/20" :
            "bg-success/10 text-success border-success/20"
          )}>
            {supplier.expiryRisk.charAt(0).toUpperCase() + supplier.expiryRisk.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Region</span>
          <span className="text-sm text-muted-foreground">{supplier.region}</span>
        </div>
      </div>

      {/* Risks */}
      {supplier.risks.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Open Risks ({supplier.risks.length})
          </h4>
          <div className="space-y-2">
            {supplier.risks.map((risk, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-xs font-medium", getSeverityColor(risk.severity))}>
                    {risk.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">{risk.type}</span>
                </div>
                <p className="text-xs">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Assigned Projects</h4>
        <div className="flex flex-wrap gap-1">
          {supplier.projects.map((project, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {project}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button size="sm" className="flex-1 text-xs">View Profile</Button>
        <Button size="sm" variant="outline" className="flex-1 text-xs">Request Evidence</Button>
      </div>
    </div>
  );
}

// Main component
export function WorkforceReadinessNetwork() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [viewMode, setViewMode] = useState<"network" | "list">("network");

  // Calculate aggregate stats
  const totalWorkers = mockSuppliers.reduce((acc, s) => acc + s.workers, 0);
  const totalReady = mockSuppliers.reduce((acc, s) => acc + s.workersReady, 0);
  const totalConditional = mockSuppliers.reduce((acc, s) => acc + s.workersConditional, 0);
  const totalBlocked = mockSuppliers.reduce((acc, s) => acc + s.workersBlocked, 0);
  const totalRisks = mockSuppliers.reduce((acc, s) => acc + s.risks.length, 0);
  const highRisks = mockSuppliers.reduce((acc, s) => acc + s.risks.filter(r => r.severity === "high").length, 0);
  const avgReadiness = Math.round(mockSuppliers.reduce((acc, s) => acc + s.readiness, 0) / mockSuppliers.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">Workforce Readiness Network</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Supply chain readiness visualization with risk indicators across all tiers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { icon: Building2, label: "Suppliers", value: mockSuppliers.length.toString(), sub: "In network", tone: "" },
          { icon: Users, label: "Total Workers", value: totalWorkers.toString(), sub: "Mapped to roles", tone: "" },
          { icon: CheckCircle, label: "Ready", value: totalReady.toString(), sub: `${Math.round(totalReady / totalWorkers * 100)}% of workforce`, tone: "success" },
          { icon: Clock, label: "Conditional", value: totalConditional.toString(), sub: "Pending actions", tone: "warning" },
          { icon: XCircle, label: "Blocked", value: totalBlocked.toString(), sub: "Critical gaps", tone: "destructive" },
          { icon: AlertTriangle, label: "Open Risks", value: totalRisks.toString(), sub: `${highRisks} high priority`, tone: "warning" },
          { icon: Target, label: "Avg Readiness", value: `${avgReadiness}%`, sub: "Across network", tone: avgReadiness >= 75 ? "success" : avgReadiness >= 60 ? "warning" : "destructive" },
        ].map((stat, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={cn("h-4 w-4", 
                stat.tone === "success" ? "text-success" :
                stat.tone === "warning" ? "text-warning" :
                stat.tone === "destructive" ? "text-destructive" :
                "text-muted-foreground"
              )} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className={cn("text-xl font-bold",
              stat.tone === "success" ? "text-success" :
              stat.tone === "warning" ? "text-warning" :
              stat.tone === "destructive" ? "text-destructive" : ""
            )}>{stat.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Network Visualization */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-medium">Supply Chain Network</h3>
                <p className="text-xs text-muted-foreground">Click a supplier node to view details</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[10px] text-muted-foreground px-2 py-1 rounded bg-muted/50 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Live
                </div>
              </div>
            </div>
            <SupplyChainVisualization 
              selectedSupplier={selectedSupplier} 
              onSelectSupplier={setSelectedSupplier} 
            />
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card h-full">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium">
                {selectedSupplier ? "Supplier Details" : "Select a Supplier"}
              </h3>
            </div>
            <div className="p-4">
              {selectedSupplier ? (
                <SupplierDetailPanel supplier={selectedSupplier} />
              ) : (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Click on a supplier in the network to view detailed readiness information</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Summary Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-medium">Supply Chain Risk Summary</h3>
            <p className="text-xs text-muted-foreground">Critical risks affecting mobilisation readiness</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            View All Risks
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Supplier</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Tier</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Readiness</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Workers</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Evidence</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Risks</th>
                <th className="text-right text-xs font-medium text-muted-foreground p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSuppliers.map((supplier) => (
                <tr 
                  key={supplier.id} 
                  className="border-b border-border hover:bg-muted/20 cursor-pointer"
                  onClick={() => setSelectedSupplier(supplier)}
                >
                  <td className="p-3">
                    <span className="font-medium text-sm">{supplier.name}</span>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs">Tier {supplier.tier}</Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Progress value={supplier.readiness} className="w-16 h-1.5" />
                      <span className="text-sm font-medium">{supplier.readiness}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(supplier.status))}>
                      <span className={cn("h-1.5 w-1.5 rounded-full mr-1", getStatusDot(supplier.status))} />
                      {supplier.status === "at-risk" ? "At Risk" : supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-success">{supplier.workersReady}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-warning">{supplier.workersConditional}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-destructive">{supplier.workersBlocked}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs">L{supplier.evidenceLevel}</Badge>
                  </td>
                  <td className="p-3">
                    {supplier.risks.length > 0 ? (
                      <div className="flex items-center gap-1">
                        <AlertCircle className={cn("h-4 w-4", 
                          supplier.risks.some(r => r.severity === "high") ? "text-destructive" : "text-warning"
                        )} />
                        <span className="text-xs">{supplier.risks.length}</span>
                      </div>
                    ) : (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
