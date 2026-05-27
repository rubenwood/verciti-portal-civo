"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Users,
  Download,
  Filter,
  Plus,
  Share2,
  Lightbulb,
  FileText,
  CheckCircle,
} from "lucide-react";

// Types for the ecosystem network
type NodeStatus = "ready" | "risk" | "blocked" | "evidence" | "training";

interface EcosystemNode {
  id: string;
  tier: string;
  title: string;
  meta: string;
  status: NodeStatus;
  x: number; // percentage position
  y: number; // percentage position
  workers?: number;
  roles?: number;
  readinessScore?: number;
  missingEvidence?: number;
  openBlockers?: number;
  actionsAssigned?: number;
}

interface CentreNode {
  title: string;
  meta: string;
  status: NodeStatus;
}

// Ecosystem data matching the reference design
const centreNode: CentreNode = {
  title: "Regional Net Zero Infrastructure Programme",
  meta: "Anchor",
  status: "risk",
};

const ecosystemNodes: EcosystemNode[] = [
  // Tier 1 suppliers - top area
  { id: "t1-1", tier: "Tier 1 — Engineering delivery", title: "Engineering delivery partner", meta: "Supplier A · 102 workers", status: "ready", x: 20, y: 25, workers: 102, roles: 11, readinessScore: 84, missingEvidence: 2, openBlockers: 0, actionsAssigned: 3 },
  { id: "t1-2", tier: "Tier 1 — Hydrogen contractor", title: "Hydrogen infrastructure contractor", meta: "Supplier C · 64 workers", status: "risk", x: 80, y: 25, workers: 64, roles: 9, readinessScore: 62, missingEvidence: 5, openBlockers: 1, actionsAssigned: 5 },
  { id: "t1-3", tier: "Tier 1 — Electrical integrator", title: "Electrical systems integrator", meta: "Supplier B · 86 workers", status: "blocked", x: 15, y: 55, workers: 86, roles: 14, readinessScore: 41, missingEvidence: 7, openBlockers: 2, actionsAssigned: 4 },
  
  // Tier 2 suppliers - middle-right area
  { id: "t2-1", tier: "Tier 2 — Installation", title: "Installation subcontractor", meta: "Electrification · 44 workers", status: "risk", x: 85, y: 55, workers: 44, roles: 6, readinessScore: 55, missingEvidence: 4, openBlockers: 1, actionsAssigned: 2 },
  { id: "t2-2", tier: "Tier 2 — Safety", title: "Specialist safety contractor", meta: "Hydrogen · 22 workers", status: "evidence", x: 75, y: 75, workers: 22, roles: 4, readinessScore: 55, missingEvidence: 6, openBlockers: 0, actionsAssigned: 3 },
  { id: "t2-3", tier: "Tier 2 — Maintenance", title: "Maintenance provider", meta: "Cross-sector · 36 workers", status: "ready", x: 25, y: 80, workers: 36, roles: 5, readinessScore: 78, missingEvidence: 1, openBlockers: 0, actionsAssigned: 1 },
  
  // Education - bottom area
  { id: "edu1", tier: "Education — College", title: "College partner", meta: "Hydrogen Cohort 3 · 45 learners", status: "training", x: 50, y: 85, workers: 45, roles: 3, readinessScore: 0, missingEvidence: 0, openBlockers: 0, actionsAssigned: 2 },
  { id: "edu2", tier: "Education — University", title: "University partner", meta: "HV Engineering pathway · 18 learners", status: "ready", x: 10, y: 35, workers: 18, roles: 2, readinessScore: 82, missingEvidence: 1, openBlockers: 0, actionsAssigned: 1 },
  
  // Public sector - corners
  { id: "pub1", tier: "Public sector — Authority", title: "Combined authority", meta: "Funder & convener", status: "ready", x: 90, y: 15, workers: 0, roles: 0, readinessScore: 94, missingEvidence: 0, openBlockers: 0, actionsAssigned: 0 },
  { id: "pub2", tier: "Public sector — Skills", title: "Skills funder", meta: "Bootcamp & retraining", status: "ready", x: 5, y: 70, workers: 0, roles: 0, readinessScore: 88, missingEvidence: 0, openBlockers: 0, actionsAssigned: 0 },
];

// Readiness chip component
function ReadinessChip({ status, children }: { status: NodeStatus; children?: React.ReactNode }) {
  const config = {
    ready: { bg: "bg-[#a3e635]/20", text: "text-[#a3e635]", label: "Ready" },
    risk: { bg: "bg-[#f59e0b]/20", text: "text-[#f59e0b]", label: "At Risk" },
    blocked: { bg: "bg-[#ef4444]/20", text: "text-[#ef4444]", label: "Blocked" },
    evidence: { bg: "bg-[#6b7280]/20", text: "text-[#9ca3af]", label: "Evidence Required" },
    training: { bg: "bg-[#3b82f6]/20", text: "text-[#60a5fa]", label: "In Training" },
  };
  const c = config[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium", c.bg, c.text)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children || c.label}
    </span>
  );
}

// Get line color based on status
function getLineColor(status: NodeStatus) {
  switch (status) {
    case "blocked": return "rgba(248,113,113,0.45)";
    case "risk": return "rgba(245,185,66,0.45)";
    default: return "rgba(163,255,60,0.25)";
  }
}

// Get readiness score display
function getReadinessDisplay(status: NodeStatus, score?: number) {
  if (status === "training") return "—";
  if (score !== undefined) return `${score}%`;
  switch (status) {
    case "ready": return "84%";
    case "risk": return "62%";
    case "blocked": return "41%";
    default: return "55%";
  }
}

export function WorkforceReadinessNetwork() {
  const [selected, setSelected] = useState<EcosystemNode | null>(ecosystemNodes[2]); // Default to Electrical integrator

  // KPIs
  const totalOrgs = 24;
  const tier1Count = 6;
  const tier2Count = 11;
  const educationCount = 5;
  const publicSectorCount = 2;
  const evidenceCompletion = 71;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Ecosystem</h1>
          <p className="text-[#6e7a70] text-sm max-w-2xl">
            24 organisations mapped across anchor, tier 1/2 supply chain, education and public sector. Trace connects the full workforce readiness ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs border-[#232a25] text-[#6e7a70] hover:text-[#e8efe9]">
            <Filter className="h-3.5 w-3.5 mr-1.5" />
            Filter by tier
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-[#232a25] text-[#6e7a70] hover:text-[#e8efe9]">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export network
          </Button>
          <Button size="sm" className="text-xs bg-[#a3e635] text-[#0a0d0c] hover:bg-[#a3e635]/90">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Onboard organisation
          </Button>
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-6 gap-3">
        <div className="p-3 rounded-lg bg-[#0f1311] border border-[#1c211e]">
          <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Organisations</div>
          <div className="text-xl font-bold text-[#e8efe9]">{totalOrgs}</div>
        </div>
        <div className="p-3 rounded-lg bg-[#0f1311] border border-[#1c211e]">
          <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Tier 1 suppliers</div>
          <div className="text-xl font-bold text-[#e8efe9]">{tier1Count}</div>
        </div>
        <div className="p-3 rounded-lg bg-[#0f1311] border border-[#1c211e]">
          <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Tier 2 suppliers</div>
          <div className="text-xl font-bold text-[#e8efe9]">{tier2Count}</div>
        </div>
        <div className="p-3 rounded-lg bg-[#0f1311] border border-[#1c211e]">
          <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Education / training</div>
          <div className="text-xl font-bold text-[#e8efe9]">{educationCount}</div>
        </div>
        <div className="p-3 rounded-lg bg-[#0f1311] border border-[#1c211e]">
          <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Public sector</div>
          <div className="text-xl font-bold text-[#e8efe9]">{publicSectorCount}</div>
        </div>
        <div className="p-3 rounded-lg bg-[#0f1311] border border-[#1c211e]">
          <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Evidence completion</div>
          <div className="text-xl font-bold text-[#f59e0b]">{evidenceCompletion}%</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Network Visualization - 8 columns */}
        <div className="col-span-8">
          <div className="rounded-lg bg-[#0f1311] border border-[#1c211e]">
            <div className="p-4 border-b border-[#1c211e]">
              <h2 className="font-semibold text-[#e8efe9] mb-1">Workforce readiness network</h2>
              <p className="text-xs text-[#6e7a70]">
                Trace supports pull-through: one anchor programme can activate multiple supply-chain organisations into a shared readiness system.
              </p>
            </div>
            
            <div className="p-4">
              {/* Network container with relative positioning */}
              <div className="relative h-[500px] w-full">
                {/* SVG connection lines */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  {ecosystemNodes.map((n) => (
                    <line 
                      key={n.id}
                      x1="50" 
                      y1="50" 
                      x2={n.x} 
                      y2={n.y}
                      stroke={getLineColor(n.status)}
                      strokeWidth="0.2"
                      strokeDasharray={n.status === "evidence" ? "0.6 0.6" : "0"}
                    />
                  ))}
                </svg>

                {/* Centre node - Anchor Programme */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: "50%", top: "50%" }}
                  onClick={() => setSelected(null)}
                >
                  <div className="p-3 rounded-lg bg-[#0a0d0c] border border-[#a3e635]/30 min-w-[180px] text-center">
                    <div className="text-[9px] text-[#a3e635] uppercase tracking-wider mb-1">Anchor programme</div>
                    <div className="text-sm font-semibold text-[#a3e635] mb-1">{centreNode.title}</div>
                    <div className="text-[10px] text-[#6e7a70] mb-2">{centreNode.meta}</div>
                    <ReadinessChip status={centreNode.status} />
                  </div>
                </div>

                {/* Surrounding nodes */}
                {ecosystemNodes.map((node) => (
                  <div
                    key={node.id}
                    className={cn(
                      "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all",
                    )}
                    style={{ 
                      left: `${node.x}%`, 
                      top: `${node.y}%`,
                    }}
                    onClick={() => setSelected(node)}
                  >
                    <div 
                      className={cn(
                        "p-2.5 rounded-lg bg-[#0a0d0c] border min-w-[140px]",
                        selected?.id === node.id 
                          ? "border-[#a3e635] shadow-[0_0_0_3px_rgba(163,255,60,0.12)]" 
                          : "border-[#232a25] hover:border-[#3a4540]"
                      )}
                    >
                      <div className="text-[8px] text-[#6e7a70] uppercase tracking-wider mb-0.5">{node.tier}</div>
                      <div className="text-xs font-medium text-[#e8efe9] mb-0.5">{node.title}</div>
                      <div className="text-[9px] text-[#6e7a70] mb-1.5">{node.meta}</div>
                      <ReadinessChip status={node.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Sidebar - 4 columns */}
        <div className="col-span-4 space-y-3">
          {/* Organisation Detail Drawer */}
          <div className="rounded-lg bg-[#0f1311] border border-[#1c211e] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Share2 className="h-3.5 w-3.5 text-[#a3e635]" />
                <span className="text-[10px] text-[#6e7a70] uppercase tracking-wider">Organisation detail</span>
              </div>
              {selected && <ReadinessChip status={selected.status} />}
            </div>

            {selected ? (
              <>
                <div className="text-[9px] text-[#6e7a70] uppercase tracking-wider mb-0.5">{selected.tier}</div>
                <div className="text-base font-semibold text-[#e8efe9] mb-0.5">{selected.title}</div>
                <div className="text-xs text-[#6e7a70] mb-4">{selected.meta}</div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#6e7a70] uppercase tracking-wider">Readiness score</span>
                    <span className={cn(
                      "text-sm font-mono font-medium",
                      selected.status === "ready" ? "text-[#a3e635]" : 
                      selected.status === "risk" ? "text-[#f59e0b]" : 
                      selected.status === "blocked" ? "text-[#ef4444]" : 
                      selected.status === "training" ? "text-[#6e7a70]" : "text-[#6e7a70]"
                    )}>
                      {getReadinessDisplay(selected.status, selected.readinessScore)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#6e7a70] uppercase tracking-wider">Workers mapped</span>
                    <span className="text-sm font-mono text-[#e8efe9]">{selected.workers || 86}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#6e7a70] uppercase tracking-wider">Roles covered</span>
                    <span className="text-sm font-mono text-[#e8efe9]">{selected.roles || 14}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#6e7a70] uppercase tracking-wider">Missing evidence items</span>
                    <span className="text-sm font-mono text-[#ef4444]">{selected.missingEvidence ?? 7}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#6e7a70] uppercase tracking-wider">Open blockers</span>
                    <span className="text-sm font-mono text-[#f59e0b]">{selected.openBlockers ?? 2}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#6e7a70] uppercase tracking-wider">Actions assigned</span>
                    <span className="text-sm font-mono text-[#e8efe9]">{selected.actionsAssigned ?? 4}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1c211e]">
                  <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7 border-[#232a25] text-[#e8efe9]">
                    <Users className="h-3 w-3 mr-1" />
                    Workers
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7 border-[#232a25] text-[#e8efe9]">
                    <FileText className="h-3 w-3 mr-1" />
                    Evidence
                  </Button>
                  <Button size="sm" className="flex-1 text-[10px] h-7 bg-[#a3e635] text-[#0a0d0c]">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Actions
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-sm text-[#6e7a70] text-center py-8">
                Click a node to view details
              </div>
            )}
          </div>

          {/* Ecosystem Pull-through Card */}
          <div 
            className="rounded-lg p-4 border border-[#a3e635]/20"
            style={{ background: "linear-gradient(180deg, rgba(163,255,60,0.04), transparent 70%)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-3.5 w-3.5 text-[#a3e635]" />
              <span className="text-xs font-semibold text-[#e8efe9]">Ecosystem pull-through</span>
            </div>
            <p className="text-[11px] text-[#6e7a70] leading-relaxed">
              Trace activates one anchor programme into 23 downstream organisations — supply chain, education and public sector — into a shared workforce readiness system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
