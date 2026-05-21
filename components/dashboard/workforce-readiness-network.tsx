"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Users,
  Building2,
  Download,
  Filter,
  Plus,
  Share2,
  Lightbulb,
  FileText,
  CheckCircle,
} from "lucide-react";

// Types for the ecosystem network
type OrgStatus = "ready" | "at-risk" | "blocked" | "evidence-required" | "in-training";
type OrgType = "anchor" | "anchor-programme" | "tier-1" | "tier-2" | "education" | "public-sector";

interface Organisation {
  id: string;
  name: string;
  type: OrgType;
  subtext: string;
  status: OrgStatus;
  workers?: number;
  roles?: number;
  learners?: number;
  assessors?: number;
  readinessScore?: number;
  missingEvidence?: number;
  openBlockers?: number;
  actionsAssigned?: number;
}

// Mock ecosystem data matching the screenshot
const ecosystemOrgs: Organisation[] = [
  // Anchors
  { id: "anc1", name: "Infrastructure operator", type: "anchor", subtext: "North-West Infrastructure Authority", status: "ready" },
  { id: "anc2", name: "Regional programme lead", type: "anchor", subtext: "Combined-authority delivery team", status: "ready" },
  // Tier 1
  { id: "t1-1", name: "Electrical systems integrator", type: "tier-1", subtext: "Supplier B", status: "blocked", workers: 86, roles: 14, readinessScore: 41, missingEvidence: 7, openBlockers: 2, actionsAssigned: 4 },
  { id: "t1-2", name: "Engineering delivery partner", type: "tier-1", subtext: "Supplier A", status: "ready", workers: 102, roles: 11 },
  { id: "t1-3", name: "Hydrogen infrastructure contractor", type: "tier-1", subtext: "Supplier C", status: "at-risk", workers: 64, roles: 9 },
  // Tier 2
  { id: "t2-1", name: "Installation subcontractor", type: "tier-2", subtext: "Electrification", status: "at-risk", workers: 44 },
  { id: "t2-2", name: "Specialist safety contractor", type: "tier-2", subtext: "Hydrogen", status: "evidence-required", workers: 22 },
  { id: "t2-3", name: "Maintenance provider", type: "tier-2", subtext: "Cross-sector", status: "ready", workers: 36 },
  // Education
  { id: "edu1", name: "College partner", type: "education", subtext: "Hydrogen Cohort 3", status: "in-training", learners: 45 },
  { id: "edu2", name: "University partner", type: "education", subtext: "HV Engineering pathway", status: "ready", learners: 18 },
  { id: "edu3", name: "Independent training provider", type: "education", subtext: "Multi-sector", status: "ready", learners: 64 },
  { id: "edu4", name: "Assessor network", type: "education", subtext: "NDT-3 / NVQ", status: "evidence-required", assessors: 12 },
  // Public Sector
  { id: "pub1", name: "Combined authority", type: "public-sector", subtext: "Funder & convener", status: "ready" },
  { id: "pub2", name: "Skills funder", type: "public-sector", subtext: "Bootcamp & retraining", status: "ready" },
];

const getStatusBadge = (status: OrgStatus) => {
  switch (status) {
    case "ready":
      return { label: "Ready", className: "bg-success text-success-foreground" };
    case "at-risk":
      return { label: "At Risk", className: "bg-warning text-warning-foreground" };
    case "blocked":
      return { label: "Blocked", className: "bg-destructive text-destructive-foreground" };
    case "evidence-required":
      return { label: "Evidence Required", className: "bg-muted text-muted-foreground" };
    case "in-training":
      return { label: "In Training", className: "bg-primary text-primary-foreground" };
    default:
      return { label: status, className: "bg-muted text-muted-foreground" };
  }
};

const getTypeLabel = (type: OrgType) => {
  switch (type) {
    case "anchor": return "ANCHOR";
    case "anchor-programme": return "ANCHOR PROGRAMME";
    case "tier-1": return "TIER 1";
    case "tier-2": return "TIER 2";
    case "education": return "EDUCATION";
    case "public-sector": return "PUBLIC SECTOR";
    default: return type.toUpperCase();
  }
};

// Organisation Card Component
function OrgCard({ 
  org, 
  isSelected, 
  onClick 
}: { 
  org: Organisation; 
  isSelected: boolean;
  onClick: () => void;
}) {
  const statusBadge = getStatusBadge(org.status);
  const isAnchorProgramme = org.type === "anchor-programme";
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-3 rounded-lg border cursor-pointer transition-all",
        isAnchorProgramme 
          ? "bg-primary/20 border-primary" 
          : isSelected 
            ? "bg-card border-primary ring-1 ring-primary" 
            : "bg-card/50 border-border/50 hover:border-border hover:bg-card"
      )}
    >
      <div className={cn(
        "text-[10px] font-medium tracking-wider mb-1",
        isAnchorProgramme ? "text-primary" : "text-muted-foreground"
      )}>
        {getTypeLabel(org.type)}
      </div>
      <h4 className={cn(
        "font-medium text-sm mb-0.5",
        isAnchorProgramme && "text-primary"
      )}>
        {org.name}
      </h4>
      <p className="text-[11px] text-muted-foreground mb-2">{org.subtext}</p>
      {org.workers && (
        <p className="text-[10px] text-muted-foreground mb-2">{org.workers} workers · {org.roles} roles</p>
      )}
      {org.learners && (
        <p className="text-[10px] text-muted-foreground mb-2">{org.learners} learners</p>
      )}
      {org.assessors && (
        <p className="text-[10px] text-muted-foreground mb-2">{org.assessors} assessors</p>
      )}
      <Badge className={cn("text-[10px] h-5", statusBadge.className)}>
        <span className="mr-1">●</span>
        {statusBadge.label}
      </Badge>
    </div>
  );
}

// Organisation Detail Sidebar
function OrgDetailSidebar({ org }: { org: Organisation }) {
  const statusBadge = getStatusBadge(org.status);
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Organisation Detail</span>
        </div>
        <Badge className={cn("text-[10px]", statusBadge.className)}>
          <span className="mr-1">●</span>
          {statusBadge.label}
        </Badge>
      </div>

      {/* Org Info */}
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
          {getTypeLabel(org.type)}
        </div>
        <h3 className="text-lg font-semibold">{org.name}</h3>
        <p className="text-sm text-muted-foreground">
          {org.subtext} · {org.workers || org.learners || org.assessors || 0} {org.workers ? "workers" : org.learners ? "learners" : "assessors"} · {org.roles || 0} roles
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Readiness Score</span>
          <span className={cn(
            "text-lg font-bold",
            (org.readinessScore || 0) >= 70 ? "text-success" : 
            (org.readinessScore || 0) >= 50 ? "text-warning" : "text-destructive"
          )}>
            {org.readinessScore || 41}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Workers Mapped</span>
          <span className="text-sm font-medium">{org.workers || 86}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Roles Covered</span>
          <span className="text-sm font-medium">{org.roles || 14}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Missing Evidence Items</span>
          <span className="text-sm font-medium text-warning">{org.missingEvidence || 7}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Open Blockers</span>
          <span className="text-sm font-medium text-destructive">{org.openBlockers || 2}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Actions Assigned</span>
          <span className="text-sm font-medium">{org.actionsAssigned || 4}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs">
          <Users className="h-3.5 w-3.5 mr-1.5" />
          Workers
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-xs">
          <FileText className="h-3.5 w-3.5 mr-1.5" />
          Evidence
        </Button>
        <Button size="sm" className="flex-1 text-xs bg-primary text-primary-foreground">
          <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
          Actions
        </Button>
      </div>

      {/* Ecosystem Pull-through */}
      <div className="p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Ecosystem pull-through</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Trace activates one anchor programme into 23 downstream organisations — supply chain, education and public sector — into a shared workforce readiness system.
        </p>
      </div>
    </div>
  );
}

export function WorkforceReadinessNetwork() {
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(ecosystemOrgs.find(o => o.id === "t1-1") || null);

  // Calculate KPIs
  const totalOrgs = ecosystemOrgs.length + 1; // +1 for anchor programme
  const tier1Count = ecosystemOrgs.filter(o => o.type === "tier-1").length;
  const tier2Count = ecosystemOrgs.filter(o => o.type === "tier-2").length;
  const educationCount = ecosystemOrgs.filter(o => o.type === "education").length;
  const publicSectorCount = ecosystemOrgs.filter(o => o.type === "public-sector").length;
  const evidenceCompletion = 71;

  // Group orgs by type
  const anchors = ecosystemOrgs.filter(o => o.type === "anchor");
  const tier1 = ecosystemOrgs.filter(o => o.type === "tier-1");
  const tier2 = ecosystemOrgs.filter(o => o.type === "tier-2");
  const education = ecosystemOrgs.filter(o => o.type === "education");
  const publicSector = ecosystemOrgs.filter(o => o.type === "public-sector");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Ecosystem</h1>
          <p className="text-muted-foreground">
            {totalOrgs} organisations mapped across anchor, tier 1/2 supply chain, education and public sector. Trace connects the full workforce readiness ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter by tier
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export network
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Onboard organisation
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-6 gap-4">
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Organisations</p>
          <p className="text-2xl font-bold">{totalOrgs}</p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Tier 1 Suppliers</p>
          <p className="text-2xl font-bold">{tier1Count}</p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Tier 2 Suppliers</p>
          <p className="text-2xl font-bold">{tier2Count}</p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Education / Training</p>
          <p className="text-2xl font-bold">{educationCount}</p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Public Sector</p>
          <p className="text-2xl font-bold">{publicSectorCount}</p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Evidence Completion</p>
          <p className="text-2xl font-bold text-primary">{evidenceCompletion}%</p>
        </div>
      </div>

      {/* Main Content: Network + Detail Sidebar */}
      <div className="flex gap-6">
        {/* Workforce Readiness Network */}
        <div className="flex-1 p-4 rounded-xl bg-card border border-border">
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Workforce readiness network</h2>
            <p className="text-sm text-muted-foreground">
              Trace supports pull-through: one anchor programme can activate multiple supply-chain organisations into a shared readiness system.
            </p>
          </div>

          {/* Network Visualization */}
          <div className="relative min-h-[600px]">
            {/* SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {/* Lines from Anchors to Anchor Programme */}
              <path d="M180,60 Q300,60 380,220" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M500,60 Q400,60 420,220" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
              
              {/* Lines from Anchor Programme to Tier 1 */}
              <path d="M350,260 Q200,280 100,160" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 2" />
              <path d="M400,240 Q400,150 350,130" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M450,260 Q550,200 620,160" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" />
              
              {/* Lines from Anchor Programme to Tier 2 */}
              <path d="M350,300 Q200,400 100,370" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M400,310 Q400,380 400,360" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 2" />
              <path d="M450,300 Q550,350 600,370" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
              
              {/* Lines from Tier 2 to Education */}
              <path d="M100,420 Q100,500 100,500" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M250,420 Q250,500 250,490" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M400,420 Q400,500 430,490" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M600,420 Q620,500 620,500" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 2" />
              
              {/* Lines to Public Sector */}
              <path d="M200,560 Q200,620 200,600" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M520,560 Q520,620 520,600" fill="none" stroke="#a3ff3c" strokeWidth="1.5" strokeOpacity="0.3" />
            </svg>

            {/* Anchor Row */}
            <div className="flex justify-center gap-8 mb-4" style={{ position: 'relative', zIndex: 1 }}>
              {anchors.map(org => (
                <div key={org.id} className="w-52">
                  <OrgCard 
                    org={org} 
                    isSelected={selectedOrg?.id === org.id}
                    onClick={() => setSelectedOrg(org)}
                  />
                </div>
              ))}
            </div>

            {/* Tier 1 Row */}
            <div className="flex justify-between items-start mb-4 px-4" style={{ position: 'relative', zIndex: 1 }}>
              <div className="w-44">
                <OrgCard 
                  org={tier1[0]} 
                  isSelected={selectedOrg?.id === tier1[0].id}
                  onClick={() => setSelectedOrg(tier1[0])}
                />
              </div>
              <div className="w-48">
                <OrgCard 
                  org={tier1[1]} 
                  isSelected={selectedOrg?.id === tier1[1].id}
                  onClick={() => setSelectedOrg(tier1[1])}
                />
              </div>
              
              {/* Anchor Programme - Center */}
              <div className="w-56 -mt-2">
                <OrgCard 
                  org={{
                    id: "anchor-prog",
                    name: "Regional Net Zero Infrastructure Programme",
                    type: "anchor-programme",
                    subtext: "Anchor",
                    status: "at-risk"
                  }} 
                  isSelected={false}
                  onClick={() => {}}
                />
              </div>
              
              <div className="w-44">
                <OrgCard 
                  org={tier1[2]} 
                  isSelected={selectedOrg?.id === tier1[2].id}
                  onClick={() => setSelectedOrg(tier1[2])}
                />
              </div>
            </div>

            {/* Tier 2 Row */}
            <div className="flex justify-between items-start mb-4 px-8" style={{ position: 'relative', zIndex: 1 }}>
              <div className="w-44">
                <OrgCard 
                  org={tier2[0]} 
                  isSelected={selectedOrg?.id === tier2[0].id}
                  onClick={() => setSelectedOrg(tier2[0])}
                />
              </div>
              <div className="w-48">
                <OrgCard 
                  org={tier2[1]} 
                  isSelected={selectedOrg?.id === tier2[1].id}
                  onClick={() => setSelectedOrg(tier2[1])}
                />
              </div>
              <div className="w-44">
                <OrgCard 
                  org={tier2[2]} 
                  isSelected={selectedOrg?.id === tier2[2].id}
                  onClick={() => setSelectedOrg(tier2[2])}
                />
              </div>
            </div>

            {/* Education Row */}
            <div className="flex justify-between items-start mb-4 px-4" style={{ position: 'relative', zIndex: 1 }}>
              {education.map(org => (
                <div key={org.id} className="w-40">
                  <OrgCard 
                    org={org} 
                    isSelected={selectedOrg?.id === org.id}
                    onClick={() => setSelectedOrg(org)}
                  />
                </div>
              ))}
            </div>

            {/* Public Sector Row */}
            <div className="flex justify-center gap-8" style={{ position: 'relative', zIndex: 1 }}>
              {publicSector.map(org => (
                <div key={org.id} className="w-44">
                  <OrgCard 
                    org={org} 
                    isSelected={selectedOrg?.id === org.id}
                    onClick={() => setSelectedOrg(org)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Organisation Detail Sidebar */}
        <div className="w-80 shrink-0 p-4 rounded-xl bg-card border border-border">
          {selectedOrg ? (
            <OrgDetailSidebar org={selectedOrg} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-sm text-muted-foreground">Select an organisation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
