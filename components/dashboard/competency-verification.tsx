"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ClipboardCheck,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  User,
  Calendar,
  Award,
  Shield,
  Eye,
  MoreHorizontal,
  Play,
  Upload,
  Video,
  Camera,
  Mic,
  FileCheck,
  Target,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Types
interface Assessment {
  id: string;
  worker: string;
  workerId: string;
  role: string;
  competency: string;
  type: "practical" | "observation" | "viva" | "portfolio";
  status: "scheduled" | "in-progress" | "pending-review" | "verified" | "failed" | "expired";
  assessor: string;
  scheduledDate: string;
  completedDate?: string;
  verificationLevel: number;
  evidenceCount: number;
  score?: number;
  notes?: string;
}

interface CompetencyFramework {
  id: string;
  name: string;
  sector: string;
  competencies: number;
  assessments: number;
  verified: number;
  pending: number;
}

// Mock Data
const ASSESSMENTS: Assessment[] = [
  { id: "ASS-001", worker: "R. Thompson", workerId: "WK-7X4K9", role: "High-Voltage Engineer", competency: "HV Practical Competency", type: "practical", status: "scheduled", assessor: "E. Okafor", scheduledDate: "2025-05-20", verificationLevel: 4, evidenceCount: 0 },
  { id: "ASS-002", worker: "J. Martinez", workerId: "WK-8Y5L0", role: "Hydrogen Technician", competency: "Electrolyser Operations", type: "observation", status: "in-progress", assessor: "M. Patel", scheduledDate: "2025-05-18", verificationLevel: 4, evidenceCount: 3, score: 75 },
  { id: "ASS-003", worker: "S. Chen", workerId: "WK-9Z6M1", role: "Emergency Response Lead", competency: "Emergency Procedure Execution", type: "practical", status: "pending-review", assessor: "S. Turner", scheduledDate: "2025-05-15", completedDate: "2025-05-15", verificationLevel: 4, evidenceCount: 5, score: 92 },
  { id: "ASS-004", worker: "A. Williams", workerId: "WK-1A2B3", role: "Electrical Installer", competency: "Wiring Regulations Compliance", type: "viva", status: "verified", assessor: "E. Okafor", scheduledDate: "2025-05-10", completedDate: "2025-05-10", verificationLevel: 4, evidenceCount: 2, score: 88 },
  { id: "ASS-005", worker: "M. Johnson", workerId: "WK-4C5D6", role: "Maintenance Technician", competency: "Equipment Diagnostics", type: "portfolio", status: "verified", assessor: "M. Patel", scheduledDate: "2025-05-08", completedDate: "2025-05-08", verificationLevel: 3, evidenceCount: 8, score: 95 },
  { id: "ASS-006", worker: "K. Brown", workerId: "WK-7E8F9", role: "High-Voltage Engineer", competency: "HV Practical Competency", type: "practical", status: "failed", assessor: "S. Turner", scheduledDate: "2025-05-05", completedDate: "2025-05-05", verificationLevel: 4, evidenceCount: 4, score: 45, notes: "Failed safety protocol section" },
  { id: "ASS-007", worker: "L. Davis", workerId: "WK-0G1H2", role: "Permit-to-Work Supervisor", competency: "Permit Authorization", type: "observation", status: "expired", assessor: "E. Okafor", scheduledDate: "2024-05-12", completedDate: "2024-05-12", verificationLevel: 4, evidenceCount: 3, score: 82, notes: "Revalidation required" },
];

const COMPETENCY_FRAMEWORKS: CompetencyFramework[] = [
  { id: "cf1", name: "High-Voltage Operations", sector: "Electrification", competencies: 12, assessments: 156, verified: 124, pending: 18 },
  { id: "cf2", name: "Hydrogen Safety & Operations", sector: "Hydrogen", competencies: 18, assessments: 203, verified: 168, pending: 24 },
  { id: "cf3", name: "Emergency Response", sector: "Safety-Critical", competencies: 8, assessments: 89, verified: 72, pending: 11 },
  { id: "cf4", name: "Electrical Installation", sector: "Electrification", competencies: 15, assessments: 312, verified: 289, pending: 8 },
  { id: "cf5", name: "Maintenance & Diagnostics", sector: "Cross-sector", competencies: 10, assessments: 178, verified: 152, pending: 15 },
];

const EVIDENCE_TYPES = [
  { type: "video", icon: Video, label: "Video Recording", description: "Capture practical demonstration" },
  { type: "photo", icon: Camera, label: "Photo Evidence", description: "Document completed work" },
  { type: "audio", icon: Mic, label: "Audio Recording", description: "Record verbal assessment" },
  { type: "document", icon: FileText, label: "Document Upload", description: "Attach certificates or reports" },
];

export function CompetencyVerification() {
  const [selectedTab, setSelectedTab] = useState<"assessments" | "frameworks" | "evidence">("assessments");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [showNewAssessmentDialog, setShowNewAssessmentDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-success/10 text-success border-success/20";
      case "in-progress": return "bg-primary/10 text-primary border-primary/20";
      case "pending-review": return "bg-warning/10 text-warning border-warning/20";
      case "scheduled": return "bg-muted text-muted-foreground";
      case "failed": return "bg-destructive/10 text-destructive border-destructive/20";
      case "expired": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return CheckCircle;
      case "in-progress": return Play;
      case "pending-review": return Clock;
      case "scheduled": return Calendar;
      case "failed": return XCircle;
      case "expired": return AlertCircle;
      default: return Clock;
    }
  };

  const filteredAssessments = ASSESSMENTS.filter(a => {
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    if (searchQuery && !a.worker.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !a.competency.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: ASSESSMENTS.length,
    verified: ASSESSMENTS.filter(a => a.status === "verified").length,
    pending: ASSESSMENTS.filter(a => a.status === "pending-review").length,
    inProgress: ASSESSMENTS.filter(a => a.status === "in-progress").length,
    scheduled: ASSESSMENTS.filter(a => a.status === "scheduled").length,
    failed: ASSESSMENTS.filter(a => a.status === "failed").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Competency Verification</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Capture structured assessment evidence that proves capability beyond course completion.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setShowNewAssessmentDialog(true)}>
            <Plus className="h-4 w-4" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: ClipboardCheck, label: "Total Assessments", value: stats.total, tone: "" },
          { icon: CheckCircle, label: "Verified", value: stats.verified, tone: "ok" },
          { icon: Clock, label: "Pending Review", value: stats.pending, tone: "warn" },
          { icon: Play, label: "In Progress", value: stats.inProgress, tone: "info" },
          { icon: Calendar, label: "Scheduled", value: stats.scheduled, tone: "" },
          { icon: XCircle, label: "Failed / Expired", value: stats.failed + ASSESSMENTS.filter(a => a.status === "expired").length, tone: "bad" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon className={cn(
                "h-4 w-4",
                kpi.tone === "ok" ? "text-success" : kpi.tone === "warn" ? "text-warning" : kpi.tone === "bad" ? "text-destructive" : kpi.tone === "info" ? "text-primary" : "text-muted-foreground"
              )} />
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
            </div>
            <p className={cn(
              "text-2xl font-bold",
              kpi.tone === "ok" ? "text-success" : kpi.tone === "warn" ? "text-warning" : kpi.tone === "bad" ? "text-destructive" : kpi.tone === "info" ? "text-primary" : "text-foreground"
            )}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-border">
        {[
          { id: "assessments", label: "Assessments", count: stats.total },
          { id: "frameworks", label: "Competency Frameworks", count: COMPETENCY_FRAMEWORKS.length },
          { id: "evidence", label: "Evidence Capture" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              selectedTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <Badge variant="secondary" className="text-[10px] px-1.5">{tab.count}</Badge>
            )}
          </button>
        ))}
      </div>

      {/* Assessments Tab */}
      {selectedTab === "assessments" && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by worker or competency..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {["all", "scheduled", "in-progress", "pending-review", "verified", "failed"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setFilterStatus(status)}
                >
                  {status === "all" ? "All" : status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              ))}
            </div>
          </div>

          {/* Assessments Table */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Assessment ID</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Worker</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Competency</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Assessor</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Date</th>
                    <th className="text-center p-3 text-xs font-medium text-muted-foreground">Evidence</th>
                    <th className="text-center p-3 text-xs font-medium text-muted-foreground">Score</th>
                    <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-center p-3 text-xs font-medium text-muted-foreground w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssessments.map((assessment) => {
                    const StatusIcon = getStatusIcon(assessment.status);
                    return (
                      <tr 
                        key={assessment.id} 
                        className="border-b border-border last:border-0 hover:bg-muted/10 cursor-pointer"
                        onClick={() => setSelectedAssessment(assessment)}
                      >
                        <td className="p-3 text-xs font-mono">{assessment.id}</td>
                        <td className="p-3">
                          <div>
                            <p className="text-sm font-medium">{assessment.worker}</p>
                            <p className="text-[10px] text-muted-foreground">{assessment.workerId}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="text-sm">{assessment.competency}</p>
                            <p className="text-[10px] text-muted-foreground">{assessment.role}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {assessment.type}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{assessment.assessor}</td>
                        <td className="p-3 text-xs font-mono">
                          {new Date(assessment.completedDate || assessment.scheduledDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">{assessment.evidenceCount}</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          {assessment.score !== undefined ? (
                            <span className={cn(
                              "text-sm font-semibold",
                              assessment.score >= 80 ? "text-success" : assessment.score >= 60 ? "text-warning" : "text-destructive"
                            )}>
                              {assessment.score}%
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={cn("text-[10px] gap-1", getStatusColor(assessment.status))}>
                            <StatusIcon className="h-3 w-3" />
                            {assessment.status.replace("-", " ")}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Frameworks Tab */}
      {selectedTab === "frameworks" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPETENCY_FRAMEWORKS.map((framework) => (
              <div key={framework.id} className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{framework.name}</h3>
                    <p className="text-xs text-muted-foreground">{framework.sector}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {framework.competencies} competencies
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Assessments</p>
                    <p className="text-lg font-bold">{framework.assessments}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Verified</p>
                    <p className="text-lg font-bold text-success">{framework.verified}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Pending</p>
                    <p className="text-lg font-bold text-warning">{framework.pending}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Verification rate</span>
                    <span className="font-medium">{Math.round((framework.verified / framework.assessments) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success rounded-full"
                      style={{ width: `${(framework.verified / framework.assessments) * 100}%` }}
                    />
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="w-full mt-3 gap-1.5 text-xs">
                  <Eye className="h-3.5 w-3.5" />
                  View Framework
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Capture Tab */}
      {selectedTab === "evidence" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Evidence Capture Methods</h3>
            <p className="text-sm text-muted-foreground mb-4">
              TRACE supports multiple evidence types to prove competency beyond simple course completion certificates.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EVIDENCE_TYPES.map((type) => (
                <div key={type.type} className="p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <type.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{type.label}</p>
                      <p className="text-[10px] text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Verification Levels */}
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/30 border-b border-border">
                <h3 className="font-semibold">Evidence Verification Levels</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Higher levels provide stronger assurance of competency
                </p>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { level: 1, name: "Self-declared", desc: "Worker claims competency without supporting evidence", color: "destructive" },
                  { level: 2, name: "Training provider verified", desc: "Course completion confirmed by training provider", color: "primary" },
                  { level: 3, name: "Employer verified", desc: "Competency confirmed by employing organisation", color: "warning" },
                  { level: 4, name: "Assessor verified", desc: "Independent practical assessment completed", color: "success" },
                  { level: 5, name: "Site authority verified", desc: "Site-specific authorisation with standards alignment", color: "success" },
                ].map((level) => (
                  <div key={level.level} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                      level.color === "success" ? "bg-success/10 text-success" :
                      level.color === "warning" ? "bg-warning/10 text-warning" :
                      level.color === "primary" ? "bg-primary/10 text-primary" :
                      "bg-destructive/10 text-destructive"
                    )}>
                      L{level.level}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{level.name}</p>
                      <p className="text-xs text-muted-foreground">{level.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/30 border-b border-border">
                <h3 className="font-semibold">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Plus className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Schedule New Assessment</p>
                    <p className="text-xs text-muted-foreground">Create a practical assessment booking</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Upload className="h-4 w-4 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Upload Evidence</p>
                    <p className="text-xs text-muted-foreground">Add photos, videos or documents</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <FileCheck className="h-4 w-4 text-warning" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Review Pending Assessments</p>
                    <p className="text-xs text-muted-foreground">{stats.pending} assessments awaiting verification</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Manage Competency Frameworks</p>
                    <p className="text-xs text-muted-foreground">Configure assessment criteria</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Detail Dialog */}
      {selectedAssessment && (
        <Dialog open={!!selectedAssessment} onOpenChange={() => setSelectedAssessment(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Assessment Details
              </DialogTitle>
              <DialogDescription>
                {selectedAssessment.id} - {selectedAssessment.competency}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Status Banner */}
              <div className={cn(
                "p-3 rounded-lg flex items-center justify-between",
                selectedAssessment.status === "verified" ? "bg-success/10 border border-success/20" :
                selectedAssessment.status === "failed" ? "bg-destructive/10 border border-destructive/20" :
                selectedAssessment.status === "pending-review" ? "bg-warning/10 border border-warning/20" :
                "bg-muted/30 border border-border"
              )}>
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = getStatusIcon(selectedAssessment.status);
                    return <Icon className="h-4 w-4" />;
                  })()}
                  <span className="text-sm font-medium capitalize">{selectedAssessment.status.replace("-", " ")}</span>
                </div>
                {selectedAssessment.score !== undefined && (
                  <span className={cn(
                    "text-lg font-bold",
                    selectedAssessment.score >= 80 ? "text-success" : selectedAssessment.score >= 60 ? "text-warning" : "text-destructive"
                  )}>
                    {selectedAssessment.score}%
                  </span>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-[10px] text-muted-foreground mb-1">Worker</p>
                  <p className="text-sm font-medium">{selectedAssessment.worker}</p>
                  <p className="text-xs text-muted-foreground">{selectedAssessment.workerId}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-[10px] text-muted-foreground mb-1">Role</p>
                  <p className="text-sm font-medium">{selectedAssessment.role}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-[10px] text-muted-foreground mb-1">Assessor</p>
                  <p className="text-sm font-medium">{selectedAssessment.assessor}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-[10px] text-muted-foreground mb-1">Assessment Type</p>
                  <p className="text-sm font-medium capitalize">{selectedAssessment.type}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-[10px] text-muted-foreground mb-1">Scheduled Date</p>
                  <p className="text-sm font-medium">{new Date(selectedAssessment.scheduledDate).toLocaleDateString("en-GB")}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20">
                  <p className="text-[10px] text-muted-foreground mb-1">Verification Level</p>
                  <p className="text-sm font-medium">Level {selectedAssessment.verificationLevel}</p>
                </div>
              </div>

              {/* Evidence */}
              <div className="p-4 rounded-lg bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Evidence Attached</h4>
                  <Badge variant="outline" className="text-xs">{selectedAssessment.evidenceCount} items</Badge>
                </div>
                {selectedAssessment.evidenceCount > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: selectedAssessment.evidenceCount }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No evidence attached yet</p>
                )}
              </div>

              {/* Notes */}
              {selectedAssessment.notes && (
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-xs text-warning font-medium mb-1">Notes</p>
                  <p className="text-sm">{selectedAssessment.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {selectedAssessment.status === "pending-review" && (
                  <>
                    <Button className="flex-1 gap-1.5">
                      <CheckCircle className="h-4 w-4" />
                      Verify Assessment
                    </Button>
                    <Button variant="destructive" className="gap-1.5">
                      <XCircle className="h-4 w-4" />
                      Fail
                    </Button>
                  </>
                )}
                {selectedAssessment.status === "scheduled" && (
                  <Button className="flex-1 gap-1.5">
                    <Play className="h-4 w-4" />
                    Start Assessment
                  </Button>
                )}
                {(selectedAssessment.status === "failed" || selectedAssessment.status === "expired") && (
                  <Button className="flex-1 gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Schedule Reassessment
                  </Button>
                )}
                <Button variant="outline" className="gap-1.5">
                  <Upload className="h-4 w-4" />
                  Add Evidence
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* New Assessment Dialog */}
      <Dialog open={showNewAssessmentDialog} onOpenChange={setShowNewAssessmentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Assessment</DialogTitle>
            <DialogDescription>
              Create a practical competency assessment for a worker.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium">Worker</label>
              <Input className="mt-1.5" placeholder="Search worker..." />
            </div>
            <div>
              <label className="text-sm font-medium">Competency</label>
              <Input className="mt-1.5" placeholder="Select competency to assess..." />
            </div>
            <div>
              <label className="text-sm font-medium">Assessment Type</label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {["Practical", "Observation", "Viva", "Portfolio"].map((type) => (
                  <Button key={type} variant="outline" className="justify-start">
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Assessor</label>
              <Input className="mt-1.5" placeholder="Select assessor..." />
            </div>
            <div>
              <label className="text-sm font-medium">Scheduled Date</label>
              <Input className="mt-1.5" type="date" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowNewAssessmentDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowNewAssessmentDialog(false)}>Schedule Assessment</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
