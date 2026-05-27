"use client";

import { useState } from "react";
import { 
  AlertTriangle, 
  ChevronDown, 
  Download, 
  X,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Users,
  UserCheck,
  ShieldAlert,
  Users2,
  FileText,
  Clock,
  Share2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SkillsMap } from "./skills-map";

type MapOverlay = "projects" | "supplier" | "role-gaps" | "evidence";

interface ProjectSite {
  id: string;
  name: string;
  type: string;
  status: "high-risk" | "conditional" | "ready";
  overallReadiness: number;
  deploymentDate: string;
  daysRemaining: number;
  requiredThreshold: number;
  readinessForecast: number;
  readinessGap: number;
  staffAllocated: number;
  staffRequired: number;
  evidenceCompletion: number;
  evidenceTarget: number;
  certificationsCurrent: number;
  certificationsRequired: number;
  riskReasons: string[];
  criticalRoleGaps: { role: string; gap: number }[];
  workPackages: { name: string; readiness: number; status: "high-risk" | "conditional" | "ready" }[];
  recommendedActions: { action: string; impact: string }[];
}

const sampleSite: ProjectSite = {
  id: "1",
  name: "Trafford Green Hydrogen",
  type: "Hydrogen Production Facility",
  status: "high-risk",
  overallReadiness: 62,
  deploymentDate: "25 May 2025",
  daysRemaining: 34,
  requiredThreshold: 85,
  readinessForecast: 74,
  readinessGap: 11,
  staffAllocated: 24,
  staffRequired: 100,
  evidenceCompletion: 68,
  evidenceTarget: 85,
  certificationsCurrent: 23,
  certificationsRequired: 34,
  riskReasons: [
    "76 staff still needed across 5 critical roles",
    "5 critical skills below target",
    "Evidence completion below 85%",
    "6 certifications expiring within 30 days",
    "2 suppliers below readiness threshold"
  ],
  criticalRoleGaps: [
    { role: "Hydrogen Technician", gap: 28 },
    { role: "High-Voltage Engineer", gap: 16 },
    { role: "Plant & Machinery Operator", gap: 12 },
    { role: "Storage Tank Specialist", gap: 6 },
    { role: "Emergency Response Lead", gap: 5 }
  ],
  workPackages: [
    { name: "Hydrogen Production Systems", readiness: 62, status: "high-risk" },
    { name: "Electrical Installation", readiness: 71, status: "conditional" },
    { name: "Site Operations", readiness: 58, status: "high-risk" },
    { name: "Emergency Response", readiness: 49, status: "high-risk" }
  ],
  recommendedActions: [
    { action: "Assign Hydrogen Fundamentals intervention", impact: "+18 workers toward readiness" }
  ]
};

const aberdeenSite: ProjectSite = {
  id: "2",
  name: "Aberdeen Hydrogen Plant",
  type: "Hydrogen Storage & Distribution",
  status: "conditional",
  overallReadiness: 74,
  deploymentDate: "12 Aug 2025",
  daysRemaining: 113,
  requiredThreshold: 85,
  readinessForecast: 82,
  readinessGap: 8,
  staffAllocated: 45,
  staffRequired: 68,
  evidenceCompletion: 76,
  evidenceTarget: 85,
  certificationsCurrent: 38,
  certificationsRequired: 52,
  riskReasons: [
    "23 staff still needed across 3 critical roles",
    "2 critical skills below target",
    "Evidence completion at 76% (target 85%)",
    "4 certifications expiring within 30 days",
    "1 supplier below readiness threshold"
  ],
  criticalRoleGaps: [
    { role: "Hydrogen Storage Technician", gap: 12 },
    { role: "Pipeline Engineer", gap: 8 },
    { role: "Safety Systems Operator", gap: 3 }
  ],
  workPackages: [
    { name: "Storage Tank Systems", readiness: 78, status: "conditional" },
    { name: "Distribution Network", readiness: 72, status: "conditional" },
    { name: "Safety & Monitoring", readiness: 81, status: "conditional" },
    { name: "Site Operations", readiness: 65, status: "conditional" }
  ],
  recommendedActions: [
    { action: "Complete pipeline safety certification for 8 engineers", impact: "+8 workers toward readiness" },
    { action: "Schedule storage systems refresher training", impact: "+12 workers toward readiness" }
  ]
};

const projectSites: ProjectSite[] = [aberdeenSite, sampleSite];

const kpiData = [
  { label: "Active Project Sites", value: "7", subtitle: "Portfolio view", icon: MapPin, color: "text-[#e8efe9]" },
  { label: "Ready / Low Risk", value: "2", subtitle: "29% of sites", icon: CheckCircle2, color: "text-success" },
  { label: "Conditional / Medium Risk", value: "3", subtitle: "43% of sites", icon: AlertCircle, color: "text-warning" },
  { label: "High Risk", value: "2", subtitle: "28% of sites", icon: XCircle, color: "text-destructive" },
  { label: "Workers Required", value: "1,240", subtitle: "Across active sites", icon: Users, color: "text-[#e8efe9]" },
  { label: "Deployment-ready Workers", value: "684", subtitle: "55% coverage", icon: UserCheck, color: "text-success" },
  { label: "Critical Blockers", value: "18", subtitle: "Affecting mobilisation", icon: ShieldAlert, color: "text-destructive" },
];

const filters = [
  { label: "Region", value: "All Regions" },
  { label: "Sector", value: "All Sectors" },
  { label: "Risk Level", value: "All" },
  { label: "Project Type", value: "All" },
  { label: "Mobilisation Window", value: "Next 90 Days" },
  { label: "Deployment Phase", value: "All" },
];

const overlayTabs: { id: MapOverlay; label: string }[] = [
  { id: "projects", label: "Projects Readiness" },
  { id: "supplier", label: "Supplier Readiness" },
  { id: "role-gaps", label: "Role Gaps" },
  { id: "evidence", label: "Evidence Risk" },
];

function StatusBadge({ status }: { status: "high-risk" | "conditional" | "ready" }) {
  const config = {
    "high-risk": { label: "High Risk", className: "bg-destructive/20 text-destructive border-destructive/30" },
    "conditional": { label: "Conditional", className: "bg-warning/20 text-warning border-warning/30" },
    "ready": { label: "Ready", className: "bg-success/20 text-success border-success/30" }
  };
  const { label, className } = config[status];
  return (
    <span className={cn("px-2 py-0.5 text-xs font-medium rounded border inline-flex items-center gap-1", className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", status === "high-risk" ? "bg-destructive" : status === "conditional" ? "bg-warning" : "bg-success")} />
      {label}
    </span>
  );
}

function GapBadge({ gap }: { gap: number }) {
  const color = gap >= 15 ? "text-destructive bg-destructive/20 border-destructive/30" : gap >= 10 ? "text-warning bg-warning/20 border-warning/30" : "text-warning bg-warning/20 border-warning/30";
  return (
    <span className={cn("px-2 py-0.5 text-xs font-medium rounded border inline-flex items-center gap-1", color)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", gap >= 15 ? "bg-destructive" : "bg-warning")} />
      Gap {gap}
    </span>
  );
}

function SiteDetailPanel({ site, onClose }: { site: ProjectSite; onClose: () => void }) {
  const staffStillNeeded = site.staffRequired - site.staffAllocated;
  const certifiedPercent = Math.round((site.certificationsCurrent / site.certificationsRequired) * 100);

  return (
    <div className="w-[420px] bg-[#0f1211] border border-border/50 rounded-lg overflow-y-auto shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-start justify-between mb-2">
          <span className="text-[10px] text-[#6e7a70] uppercase tracking-wider">Project Site</span>
          <div className="flex items-center gap-2">
            <StatusBadge status={site.status} />
            <button onClick={onClose} className="text-[#6e7a70] hover:text-[#e8efe9] p-1">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-[#e8efe9]">{site.name}</h2>
        <p className="text-sm text-[#6e7a70]">{site.type}</p>
      </div>

      {/* Stats Grid */}
      <div className="p-4 border-b border-border/30">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Overall Readiness</div>
            <div className={cn("text-2xl font-semibold", site.overallReadiness < 70 ? "text-destructive" : site.overallReadiness < 85 ? "text-warning" : "text-success")}>
              {site.overallReadiness}%
            </div>
            <div className="text-xs text-destructive">At Risk</div>
          </div>
          <div>
            <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Deployment Date</div>
            <div className="text-2xl font-semibold text-[#e8efe9]">{site.deploymentDate}</div>
            <div className="text-xs text-[#6e7a70]">{site.daysRemaining} days remaining</div>
          </div>
          <div>
            <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Required Threshold</div>
            <div className="text-2xl font-semibold text-[#e8efe9]">{site.requiredThreshold}%</div>
            <div className="text-xs text-[#6e7a70]">Minimum required readiness</div>
          </div>
          <div>
            <div className="text-[10px] text-[#6e7a70] uppercase tracking-wider mb-1">Readiness Forecast</div>
            <div className="text-2xl font-semibold text-warning">{site.readinessForecast}%</div>
            <div className="text-xs text-warning">{site.readinessGap}% gap</div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#6e7a70]">Staff Allocation</span>
              <span className="text-[#e8efe9]">{site.staffAllocated} / {site.staffRequired}</span>
            </div>
            <div className="h-1.5 bg-[#1a1f1c] rounded-full overflow-hidden">
              <div className="h-full bg-destructive rounded-full" style={{ width: `${(site.staffAllocated / site.staffRequired) * 100}%` }} />
            </div>
            <div className="text-[10px] text-[#6e7a70] mt-0.5">{staffStillNeeded} staff still needed</div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#6e7a70]">Evidence Completion</span>
              <span className="text-warning">{site.evidenceCompletion}%</span>
            </div>
            <div className="h-1.5 bg-[#1a1f1c] rounded-full overflow-hidden">
              <div className="h-full bg-warning rounded-full" style={{ width: `${site.evidenceCompletion}%` }} />
            </div>
            <div className="text-[10px] text-[#6e7a70] mt-0.5">Target: {site.evidenceTarget}%</div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#6e7a70]">Certification Status</span>
              <span className="text-[#e8efe9]">{site.certificationsCurrent} / {site.certificationsRequired}</span>
            </div>
            <div className="h-1.5 bg-[#1a1f1c] rounded-full overflow-hidden">
              <div className="h-full bg-warning rounded-full" style={{ width: `${certifiedPercent}%` }} />
            </div>
            <div className="text-[10px] text-[#6e7a70] mt-0.5">{certifiedPercent}% certified</div>
          </div>
        </div>
      </div>

      {/* Why High Risk Box */}
      <div className="p-4 border-b border-border/30">
        <div className="bg-[#1a1f1c] border border-border/30 rounded-lg p-3">
          <h3 className="text-sm font-medium text-[#e8efe9] mb-3">Why this site is high risk</h3>
          <ul className="space-y-2">
            {site.riskReasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#6e7a70]">
                {i === 0 && <Users2 className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />}
                {i === 1 && <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />}
                {i === 2 && <FileText className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />}
                {i === 3 && <Clock className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />}
                {i === 4 && <Share2 className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />}
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Critical Role Gaps */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[#e8efe9]">Critical Role Gaps</h3>
          <button className="text-xs text-primary hover:underline flex items-center gap-1">
            View all roles <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-2">
          {site.criticalRoleGaps.map((role, i) => (
            <div key={i} className="flex items-center justify-between py-1.5">
              <span className="text-sm text-[#e8efe9]">{role.role}</span>
              <GapBadge gap={role.gap} />
            </div>
          ))}
        </div>
      </div>

      {/* Work Package Readiness */}
      <div className="p-4 border-b border-border/30">
        <h3 className="text-sm font-medium text-[#e8efe9] mb-3">Work Package Readiness</h3>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-[#6e7a70] uppercase tracking-wider">
              <th className="text-left pb-2 font-normal">Work Package</th>
              <th className="text-left pb-2 font-normal">Readiness</th>
              <th className="text-left pb-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {site.workPackages.map((pkg, i) => (
              <tr key={i} className="border-t border-border/20">
                <td className="py-2.5 text-sm text-[#e8efe9] pr-2">{pkg.name}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-[#1a1f1c] rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", pkg.status === "high-risk" ? "bg-destructive" : pkg.status === "conditional" ? "bg-warning" : "bg-success")} 
                        style={{ width: `${pkg.readiness}%` }} 
                      />
                    </div>
                    <span className="text-xs text-[#e8efe9] w-8">{pkg.readiness}%</span>
                  </div>
                </td>
                <td className="py-2.5">
                  <StatusBadge status={pkg.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommended Actions */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-[#e8efe9] mb-3">Recommended Actions & Impact</h3>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-[#6e7a70] uppercase tracking-wider">
              <th className="text-left pb-2 font-normal">Action</th>
              <th className="text-left pb-2 font-normal">Impact</th>
            </tr>
          </thead>
          <tbody>
            {site.recommendedActions.map((action, i) => (
              <tr key={i} className="border-t border-border/20">
                <td className="py-2.5 text-sm text-[#e8efe9] pr-4">{action.action}</td>
                <td className="py-2.5 text-sm text-success">{action.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function MobilisationMap() {
  const [activeOverlay, setActiveOverlay] = useState<MapOverlay>("projects");
  const [selectedSite, setSelectedSite] = useState<ProjectSite>(aberdeenSite);

  const handleSiteClick = () => {
    // Toggle between Aberdeen and Trafford sites when clicking on the map
    setSelectedSite(prev => prev.id === aberdeenSite.id ? sampleSite : aberdeenSite);
  };

  return (
    <div className="space-y-4">
      {/* Full-width Header Section */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#e8efe9] mb-1">Mobilisation Map</h1>
            <p className="text-sm text-[#6e7a70] mb-3">
              Portfolio-level view of workforce readiness, supplier assurance and deployment risk across project sites.
            </p>
            <div className="flex items-start gap-2 text-xs text-warning bg-warning/5 border border-warning/20 rounded-lg px-3 py-2 max-w-3xl">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                This map shows readiness risk by project site based on role coverage, verified evidence, expiry risk, supplier readiness and deployment timelines.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30">
              TRACE Workspace
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button className="h-8 px-3 text-sm bg-primary text-primary-foreground">
              <Download className="mr-2 h-4 w-4" />
              Export / Report
            </Button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-7 gap-3">
          {kpiData.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="bg-card/30 border border-border/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-[#6e7a70] mb-1">
                  <Icon className={cn("h-3.5 w-3.5", kpi.color)} />
                  <span>{kpi.label}</span>
                </div>
                <div className={cn("text-2xl font-semibold", kpi.color)}>{kpi.value}</div>
                <div className="text-xs text-[#6e7a70]">{kpi.subtitle}</div>
              </div>
            );
          })}
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((filter, i) => (
            <Button key={i} variant="outline" className="h-8 px-3 text-sm border-border/50 bg-card/30 text-[#e8efe9]">
              <span className="text-[#6e7a70] mr-1">{filter.label}:</span>
              {filter.value}
              <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          ))}
          <Button variant="ghost" className="h-8 px-3 text-sm text-[#6e7a70] hover:text-[#e8efe9]">
            <X className="mr-1 h-3 w-3" />
            Clear Filters
          </Button>
        </div>

        {/* Map Overlay Tabs */}
        <div className="flex items-center gap-6 border-b border-border/30 pb-0">
          <span className="text-xs text-[#6e7a70] uppercase tracking-wide">Map Overlay</span>
          <div className="flex items-center gap-1">
            {overlayTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveOverlay(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors",
                  activeOverlay === tab.id
                    ? "bg-card/50 text-[#e8efe9] border border-border/50 border-b-transparent"
                    : "text-[#6e7a70] hover:text-[#e8efe9]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map + Side Panel Row */}
      <div className="flex gap-4">
        {/* Map Component - Clickable */}
        <div 
          className="flex-1 bg-card/30 border border-border/50 rounded-lg p-4 cursor-pointer min-h-[600px]" 
          onClick={handleSiteClick}
        >
          <SkillsMap />
        </div>

        {/* Site Detail Panel - Always visible */}
        <SiteDetailPanel site={selectedSite} onClose={() => setSelectedSite(aberdeenSite)} />
      </div>
    </div>
  );
}
