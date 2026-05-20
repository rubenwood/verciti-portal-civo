"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Upload,
  Award,
  FileText,
  ChevronLeft,
  ChevronDown,
  Calendar,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  MapPin,
  User,
  Phone,
  Mail,
  Briefcase,
  Building2,
  Shield,
  Heart,
  History,
  Activity,
  FileCheck,
  Info,
  MoreHorizontal,
  Plus,
  
  AlertCircle,
  FolderKanban,
  Hammer,
  Key,
  QrCode,
  Fingerprint,
  ShieldCheck,
  Copy,
} from "lucide-react";
import { 
  type UserProfile, 
  type Evidence,
  type AuditEvent,
  type RoleRequirement,
  type EvidenceStatus,
  type AuditEventType,
  type Training,
  type ProjectRequirement,
  type ProjectHistoryEntry,
  type VerifiableCredential,
  type CredentialStatus,
} from "@/lib/mock-data";
import { anonymizeEmail, getAvatarInitials, cn } from "@/lib/utils";

// User Avatar Component
function UserAvatar({ email, size = "sm" }: { email: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const initials = getAvatarInitials(email);
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-xl",
    xl: "h-20 w-20 text-2xl",
  };
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-[#4a5d23] font-medium text-white shrink-0 uppercase",
      sizeClasses[size]
    )}>
      {initials}
    </div>
  );
}

// Circular Progress Component
function CircularProgress({ value, size = 80, strokeWidth = 8, color = "primary" }: { 
  value: number; 
  size?: number; 
  strokeWidth?: number;
  color?: "primary" | "success" | "warning" | "destructive";
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  const colorClasses = {
    primary: "stroke-primary",
    success: "stroke-success",
    warning: "stroke-warning",
    destructive: "stroke-destructive",
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={colorClasses[color]}
        />
      </svg>
      
    </div>
  );
}

// Donut Chart for Evidence Verification
function DonutChart({ verified, pending, rejected }: { verified: number; pending: number; rejected: number }) {
  const total = verified + pending + rejected;
  const percentage = total > 0 ? Math.round((verified / total) * 100) : 0;
  
  const verifiedAngle = (verified / total) * 360;
  const pendingAngle = (pending / total) * 360;
  
  return (
    <div className="relative w-28 h-28">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" className="text-destructive/60" />
        {/* Pending segment */}
        <circle 
          cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" 
          className="text-warning"
          strokeDasharray={`${(pendingAngle / 360) * 251.2} 251.2`}
          strokeDashoffset={`${-(verifiedAngle / 360) * 251.2}`}
        />
        {/* Verified segment */}
        <circle 
          cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" 
          className="text-success"
          strokeDasharray={`${(verifiedAngle / 360) * 251.2} 251.2`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-success">{percentage}%</span>
        <span className="text-[10px] text-muted-foreground">Verified</span>
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status, variant = "default" }: { 
  status: string; 
  variant?: "default" | "outline";
}) {
  const config: Record<string, { className: string }> = {
    active: { className: "bg-success/20 text-success border-success/30" },
    "signed_up_not_logged_in": { className: "bg-warning/20 text-warning border-warning/30" },
    invited: { className: "bg-info/20 text-info border-info/30" },
    verified: { className: "bg-success/20 text-success border-success/30" },
    pending: { className: "bg-warning/20 text-warning border-warning/30" },
    expired: { className: "bg-destructive/20 text-destructive border-destructive/30" },
    "expiring_soon": { className: "bg-warning/20 text-warning border-warning/30" },
    overdue: { className: "bg-destructive/20 text-destructive border-destructive/30" },
    "due_soon": { className: "bg-warning/20 text-warning border-warning/30" },
    in_progress: { className: "bg-info/20 text-info border-info/30" },
    not_started: { className: "bg-muted/50 text-muted-foreground border-muted" },
    complete: { className: "bg-success/20 text-success border-success/30" },
    partial: { className: "bg-warning/20 text-warning border-warning/30" },
    "fit_for_work": { className: "bg-success/20 text-success border-success/30" },
  };

  const { className } = config[status.toLowerCase().replace(/ /g, "_")] || { className: "bg-muted/50 text-muted-foreground border-muted" };
  const displayText = status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Badge variant="outline" className={cn("text-[10px] font-medium", className)}>
      {displayText}
    </Badge>
  );
}

// Audit Event Icon
function AuditEventIcon({ type }: { type: AuditEventType }) {
  const icons: Record<AuditEventType, { icon: React.ElementType; color: string }> = {
    profile_created: { icon: User, color: "text-info" },
    profile_updated: { icon: FileCheck, color: "text-info" },
    training_assigned: { icon: BookOpen, color: "text-warning" },
    training_completed: { icon: CheckCircle, color: "text-success" },
    training_started: { icon: Activity, color: "text-info" },
    document_uploaded: { icon: Upload, color: "text-primary" },
    evidence_verified: { icon: CheckCircle, color: "text-success" },
    evidence_failed: { icon: XCircle, color: "text-destructive" },
    qualification_added: { icon: Award, color: "text-primary" },
    certification_earned: { icon: Award, color: "text-success" },
    login: { icon: User, color: "text-muted-foreground" },
    password_changed: { icon: Shield, color: "text-warning" },
  };

  const { icon: Icon, color } = icons[type] || { icon: Activity, color: "text-muted-foreground" };
  return <Icon className={cn("h-3.5 w-3.5", color)} />;
}

// Get audit event label
function getAuditEventLabel(type: AuditEventType): string {
  const labels: Record<AuditEventType, string> = {
    profile_created: "Profile Created",
    profile_updated: "Profile Updated",
    training_assigned: "Training Assigned",
    training_completed: "Training Completed",
    training_started: "Training Started",
    document_uploaded: "Document Uploaded",
    evidence_verified: "Evidence Verified",
    evidence_failed: "Evidence Failed",
    qualification_added: "Qualification Added",
    certification_earned: "Certification Earned",
    login: "Login",
    password_changed: "Password Changed",
  };
  return labels[type] || type;
}

interface DigitalCompetencePassportProps {
  user: UserProfile;
  onBack: () => void;
}

export function DigitalCompetencePassport({ user, onBack }: DigitalCompetencePassportProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Default values for optional DCP fields
  const displayEmail = anonymizeEmail(user.email);
  const anonymizedUsername = user.anonymizedUsername || `Worker-${user.id.toUpperCase()}`;
  const employeeId = user.employeeId || `EMP-${user.id.slice(-3).toUpperCase().padStart(5, "0")}`;
  const evidence = user.evidence || [];
  const auditTrail = user.auditTrail || [];
  const roleRequirements = user.roleRequirements || [];
  const deploymentContext = user.deploymentContext || {
    department: user.department,
    reportingTo: "Not Assigned",
    startDate: user.dateSignedUp || user.dateInvited,
    medicalClearance: "pending" as const,
    securityClearance: "none" as const,
    fitnessForWork: "pending" as const,
  };
  const eligibleProjects = user.eligibleProjects || [];
  const ineligibleProjects = user.ineligibleProjects || [];
  const currentProjects = user.currentProjects || [];
  const projectRequirements = user.projectRequirements || [];
  const projectHistory = user.projectHistory || [];
  const verifiableCredentials = user.verifiableCredentials || [];

  // Calculate stats
  const totalEvidence = evidence.length;
  const verifiedEvidence = evidence.filter(e => e.status === "verified").length;
  const pendingEvidence = evidence.filter(e => e.status === "pending").length;
  const rejectedEvidence = evidence.filter(e => e.status === "failed").length;
  const evidencePercentage = totalEvidence > 0 ? Math.round((verifiedEvidence / totalEvidence) * 100) : 0;

  // Group role requirements by category
  const groupedRequirements = roleRequirements.reduce((acc, req) => {
    if (!acc[req.category]) acc[req.category] = [];
    acc[req.category].push(req);
    return acc;
  }, {} as Record<string, RoleRequirement[]>);

  // Calculate requirement stats
  const totalRequirements = roleRequirements.length;
  const completedRequirements = roleRequirements.filter(r => r.met).length;
  const requirementPercentage = totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 100;

  // Calculate readiness score (simplified)
  const readinessScore = Math.round((user.overallProgress * 0.4) + (requirementPercentage * 0.3) + (evidencePercentage * 0.3));

  // Deployment status
  const gapsToReadiness = ineligibleProjects.reduce((acc, p) => acc + p.missingRequirements.length, 0);
  const deploymentStatus = gapsToReadiness === 0 ? "Fully Ready" : gapsToReadiness <= 3 ? "Partially Ready" : "Not Ready";

  // Expiring items
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expiringItems = [
    ...roleRequirements.filter(r => r.expiryDate && new Date(r.expiryDate) <= thirtyDaysFromNow),
    ...user.certifications.filter(c => new Date(c.expiryDate) <= thirtyDaysFromNow),
  ];
  const nextExpiry = expiringItems.length > 0 
    ? expiringItems.sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime())[0]
    : null;

  // Training stats
  const overdueTraining = user.training.filter(t => t.status === "overdue");
  const dueSoonTraining = user.training.filter(t => {
    if (t.status === "overdue" || t.status === "completed") return false;
    const deadline = new Date(t.deadline);
    return deadline <= thirtyDaysFromNow;
  });
  const inProgressTraining = user.training.filter(t => t.status === "in_progress");

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button onClick={onBack} className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Workforce
        </button>
        <span>/</span>
        <span className="text-foreground">Digital Competence Passport</span>
      </div>

      {/* Readiness Logic Formula Strip */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-primary/5 via-muted/30 to-primary/5 border border-border">
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">Readiness Logic:</span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">Role Requirements</span>
            <span className="text-muted-foreground">×</span>
            <span className="font-semibold">{requirementPercentage}%</span>
          </div>
          <span className="text-muted-foreground">+</span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-1 rounded bg-success/10 text-success font-medium">Evidence</span>
            <span className="text-muted-foreground">×</span>
            <span className="font-semibold">{evidencePercentage}%</span>
          </div>
          <span className="text-muted-foreground">+</span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-1 rounded bg-warning/10 text-warning font-medium">Training</span>
            <span className="text-muted-foreground">×</span>
            <span className="font-semibold">{user.overallProgress}%</span>
          </div>
          <span className="text-muted-foreground">=</span>
          <div className="flex items-center gap-1.5">
            <span className={cn(
              "px-3 py-1 rounded font-bold",
              readinessScore >= 80 ? "bg-success/20 text-success" :
              readinessScore >= 50 ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive"
            )}>
              {readinessScore}% Readiness
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* User Info */}
        <div className="flex items-start gap-4 flex-1">
          <UserAvatar email={user.email} size="xl" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{displayEmail}</h1>
            <p className="text-muted-foreground">{user.jobTitle} &bull; {user.department}</p>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={user.status} />
              <Badge variant="outline" className="text-xs bg-muted/30">Employee ID: {employeeId}</Badge>
              <Badge variant="outline" className="text-xs bg-muted/30">Joined: {new Date(user.dateInvited).toLocaleDateString("en-GB")}</Badge>
              {deploymentContext.currentProject && (
                <Badge variant="outline" className="text-xs bg-muted/30">Base: {deploymentContext.currentProject.split(" ")[0]}</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Overall Readiness Score */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border min-w-[140px]">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-muted-foreground">Overall Readiness Score</span>
              <Info className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3">
              <CircularProgress value={readinessScore} size={50} strokeWidth={5} color="success" />
              <div>
                <p className="text-2xl font-bold">{readinessScore}%</p>
              </div>
            </div>
          </div>

          {/* Deployment Status */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border min-w-[140px]">
            <div className="flex items-center gap-1 mb-2">
              <Shield className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Deployment Status</span>
            </div>
            <p className={cn(
              "text-lg font-bold",
              deploymentStatus === "Fully Ready" ? "text-success" :
              deploymentStatus === "Partially Ready" ? "text-warning" : "text-destructive"
            )}>{deploymentStatus}</p>
            <p className="text-[10px] text-muted-foreground">
              {gapsToReadiness === 0 ? "All requirements met" : `${gapsToReadiness} gaps to full readiness`}
            </p>
          </div>

          {/* Expiring Soon */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border min-w-[140px]">
            <div className="flex items-center gap-1 mb-2">
              <AlertCircle className="h-3 w-3 text-destructive" />
              <span className="text-xs text-muted-foreground">Expiring Soon</span>
            </div>
            <p className="text-lg font-bold text-destructive">{expiringItems.length} items</p>
            <p className="text-[10px] text-muted-foreground">
              {nextExpiry ? `Next: ${new Date(nextExpiry.expiryDate!).toLocaleDateString("en-GB")}` : "No upcoming expiries"}
            </p>
          </div>

          {/* Evidence Verified */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border min-w-[140px]">
            <div className="flex items-center gap-1 mb-2">
              <FileCheck className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Evidence Verified</span>
            </div>
            <p className="text-lg font-bold">{evidencePercentage}%</p>
            <p className="text-[10px] text-muted-foreground">{verifiedEvidence} of {totalEvidence} verified</p>
          </div>
        </div>
      </div>

      {/* Tabs and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent border-none p-0 h-auto gap-0">
            <TabsTrigger 
              value="overview" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="training" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Training
            </TabsTrigger>
            <TabsTrigger 
              value="qualifications" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Qualifications & Evidence
            </TabsTrigger>
            <TabsTrigger 
              value="credentials" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Credentials
            </TabsTrigger>
            <TabsTrigger 
              value="audit" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Audit Trail
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2 pb-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Generate Report
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 border-primary text-primary hover:bg-primary/10">
            <Plus className="h-4 w-4" />
            Assign Training
          </Button>
          <Button variant="default" size="sm" className="gap-1.5 bg-primary">
            <Upload className="h-4 w-4" />
            Upload Evidence
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            More Actions
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <OverviewTab 
          user={user}
          displayEmail={displayEmail}
          deploymentContext={deploymentContext}
          groupedRequirements={groupedRequirements}
          totalRequirements={totalRequirements}
          completedRequirements={completedRequirements}
          requirementPercentage={requirementPercentage}
          overdueTraining={overdueTraining}
          dueSoonTraining={dueSoonTraining}
          inProgressTraining={inProgressTraining}
          expiringItems={expiringItems}
          evidence={evidence}
          verifiedEvidence={verifiedEvidence}
          pendingEvidence={pendingEvidence}
          rejectedEvidence={rejectedEvidence}
          auditTrail={auditTrail}
          projectRequirements={projectRequirements}
          projectHistory={projectHistory}
          ineligibleProjects={ineligibleProjects}
          readinessScore={readinessScore}
        />
      )}
      {activeTab === "training" && (
        <TrainingTab user={user} />
      )}
{activeTab === "qualifications" && (
        <QualificationsTab user={user} evidence={evidence} />
      )}
      {activeTab === "credentials" && (
        <CredentialsTab credentials={verifiableCredentials} userName={anonymizedUsername} />
      )}
      {activeTab === "audit" && (
        <AuditTab auditTrail={auditTrail} />
      )}
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ 
  user, 
  displayEmail,
  deploymentContext, 
  groupedRequirements,
  totalRequirements,
  completedRequirements,
  requirementPercentage,
  overdueTraining,
  dueSoonTraining,
  inProgressTraining,
  expiringItems,
  evidence,
  verifiedEvidence,
  pendingEvidence,
  rejectedEvidence,
  auditTrail,
  projectRequirements,
  projectHistory,
  ineligibleProjects,
  readinessScore,
}: {
  user: UserProfile;
  displayEmail: string;
  deploymentContext: NonNullable<UserProfile["deploymentContext"]>;
  groupedRequirements: Record<string, RoleRequirement[]>;
  totalRequirements: number;
  completedRequirements: number;
  requirementPercentage: number;
  overdueTraining: Training[];
  dueSoonTraining: Training[];
  inProgressTraining: Training[];
  expiringItems: (RoleRequirement | { expiryDate: string; activityName?: string; name?: string })[];
  evidence: Evidence[];
  verifiedEvidence: number;
  pendingEvidence: number;
  rejectedEvidence: number;
  auditTrail: AuditEvent[];
  projectRequirements: ProjectRequirement[];
  projectHistory: ProjectHistoryEntry[];
  ineligibleProjects: { name: string; missingRequirements: string[] }[];
  readinessScore: number;
}) {
  const [trainingFilter, setTrainingFilter] = useState<"all" | "overdue" | "due_soon" | "in_progress">("all");
  
  const allTraining = user.training.filter(t => t.status !== "completed");
  const filteredTraining = trainingFilter === "all" ? allTraining :
    trainingFilter === "overdue" ? overdueTraining :
    trainingFilter === "due_soon" ? dueSoonTraining :
    inProgressTraining;

  return (
    <div className="space-y-4">
      {/* Open Readiness Gaps - Highlighted Section */}
      {(ineligibleProjects.length > 0 || overdueTraining.length > 0 || expiringItems.length > 0) && (
        <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Open Readiness Gaps</h3>
                <p className="text-xs text-muted-foreground">Issues preventing full deployment readiness</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                {(ineligibleProjects.reduce((acc, p) => acc + p.missingRequirements.length, 0) + overdueTraining.length + expiringItems.filter(e => new Date(e.expiryDate!) < new Date()).length)} total gaps
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Missing Requirements */}
            {ineligibleProjects.length > 0 && (
              <div className="p-3 rounded-lg bg-background border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  <span className="text-xs font-medium">Missing Requirements</span>
                </div>
                <div className="space-y-1.5">
                  {ineligibleProjects.flatMap(p => p.missingRequirements).slice(0, 3).map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <XCircle className="h-3 w-3 text-destructive shrink-0" />
                      <span className="truncate">{req}</span>
                    </div>
                  ))}
                  {ineligibleProjects.flatMap(p => p.missingRequirements).length > 3 && (
                    <p className="text-[10px] text-muted-foreground">
                      +{ineligibleProjects.flatMap(p => p.missingRequirements).length - 3} more
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Overdue Training */}
            {overdueTraining.length > 0 && (
              <div className="p-3 rounded-lg bg-background border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-warning" />
                  <span className="text-xs font-medium">Overdue Training</span>
                </div>
                <div className="space-y-1.5">
                  {overdueTraining.slice(0, 3).map((t) => (
                    <div key={t.id} className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3 text-warning shrink-0" />
                      <span className="truncate">{t.title}</span>
                    </div>
                  ))}
                  {overdueTraining.length > 3 && (
                    <p className="text-[10px] text-muted-foreground">+{overdueTraining.length - 3} more</p>
                  )}
                </div>
              </div>
            )}

            {/* Expired Items */}
            {expiringItems.filter(e => new Date(e.expiryDate!) < new Date()).length > 0 && (
              <div className="p-3 rounded-lg bg-background border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  <span className="text-xs font-medium">Expired Certifications</span>
                </div>
                <div className="space-y-1.5">
                  {expiringItems.filter(e => new Date(e.expiryDate!) < new Date()).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <AlertCircle className="h-3 w-3 text-destructive shrink-0" />
                      <span className="truncate">{('name' in item ? item.name : item.activityName) || 'Certification'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top Row: 4 column grid for main cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Column 1: Role & Deployment Context + Contact */}
      <div className="space-y-4 lg:col-span-1">
        {/* Role & Deployment Context */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-medium text-sm">Role & Deployment Context</h3>
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="font-medium">{user.jobTitle}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Department</p>
              <p className="font-medium">{deploymentContext.department}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Project</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="p-1.5 rounded bg-primary/10">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{deploymentContext.currentProject || "Not Assigned"}</p>
                  <p className="text-xs text-muted-foreground">Hydrogen Production</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-medium">Aberdeen, UK</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Manager</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-6 w-6 rounded-full bg-[#4a5d23] flex items-center justify-center text-[10px] font-medium text-white">
                  {deploymentContext.reportingTo.split(" ").map(n => n[0]).join("")}
                </div>
                <p className="font-medium">{deploymentContext.reportingTo}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Contractor / Employer</p>
              <p className="font-medium">Verciti Engineering Ltd.</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Clearance Level</p>
                <p className="font-medium capitalize">{deploymentContext.securityClearance === "none" ? "None" : `Level ${deploymentContext.securityClearance === "basic" ? "1" : deploymentContext.securityClearance === "enhanced" ? "2" : "3"}`}</p>
              </div>
              <Badge variant="outline" className="text-[10px] bg-info/10 text-info border-info/30">Site Access</Badge>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Medical / Fitness</p>
                {deploymentContext.medicalClearanceExpiry && (
                  <p className="text-[10px] text-muted-foreground">Expires: {new Date(deploymentContext.medicalClearanceExpiry).toLocaleDateString("en-GB")}</p>
                )}
              </div>
              <StatusBadge status={deploymentContext.fitnessForWork === "fit" ? "Fit for Work" : deploymentContext.fitnessForWork} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <h3 className="font-medium text-sm mb-3">Contact</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{displayEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{user.phoneNumber || "+44 *** *** ****"}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>12 Union Street, Aberdeen, AB10 1XX, UK</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">Notes</h3>
            <button className="text-xs text-primary hover:underline">Add note</button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Engineer on {deploymentContext.currentProject || "project"} since {new Date(deploymentContext.startDate).toLocaleDateString("en-GB")}. 
            Requires Electrical Safety Fundamentals completion to achieve full deployability.
          </p>
          <p className="text-[10px] text-muted-foreground mt-2">- Sarah Ahmed, {new Date().toLocaleDateString("en-GB")}</p>
        </div>
      </div>

      {/* Column 2: Role Requirement Checklist + Completed Training */}
      <div className="space-y-4">
        {/* Role Requirement Checklist */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-medium text-sm">Role Requirement Checklist</h3>
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          
          {Object.keys(groupedRequirements).length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No requirements defined</p>
          ) : (
            <>
              <div className="space-y-1">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 text-[10px] text-muted-foreground pb-1 border-b border-border">
                  <span>Requirement Category</span>
                  <span>Status</span>
                  <span className="text-right">Completed</span>
                  <span className="text-right">Total</span>
                </div>
                {Object.entries(groupedRequirements).map(([category, reqs]) => {
                  const completed = reqs.filter(r => r.met).length;
                  const total = reqs.length;
                  const status = completed === total ? "Complete" : completed > 0 ? "Partial" : "Not Started";
                  return (
                    <div key={category} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center py-1.5 text-sm">
                      <div className="flex items-center gap-2">
                        {status === "Complete" ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : status === "Partial" ? (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{category}</span>
                      </div>
                      <StatusBadge status={status} />
                      <span className="text-right">{completed}</span>
                      <span className="text-right text-muted-foreground">{total}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm text-muted-foreground">{completedRequirements} / {totalRequirements} ({requirementPercentage}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all",
                      requirementPercentage === 100 ? "bg-success" : "bg-primary"
                    )}
                    style={{ width: `${requirementPercentage}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Project Requirement Checklist */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-medium text-sm">Project Requirement Checklist</h3>
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          
          {projectRequirements.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No project requirements defined</p>
          ) : (
            <>
              <div className="space-y-1">
                <div className="grid grid-cols-[1fr_auto_auto] gap-2 text-[10px] text-muted-foreground pb-1 border-b border-border">
                  <span>Requirement</span>
                  <span>Category</span>
                  <span className="text-right">Status</span>
                </div>
                {projectRequirements.map((req) => (
                  <div key={req.id} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center py-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      {req.met ? (
                        <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive shrink-0" />
                      )}
                      <span className="truncate">{req.name}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] capitalize">{req.category}</Badge>
                    {req.met ? (
                      req.expiryDate ? (
                        <span className={cn(
                          "text-[10px] text-right",
                          new Date(req.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
                            ? "text-warning" 
                            : "text-muted-foreground"
                        )}>
                          Exp: {new Date(req.expiryDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                        </span>
                      ) : (
                        <span className="text-[10px] text-success text-right">Complete</span>
                      )
                    ) : (
                      <span className="text-[10px] text-destructive text-right">Required</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Project Readiness</span>
                  <span className="text-sm text-muted-foreground">
                    {projectRequirements.filter(r => r.met).length} / {projectRequirements.length} ({Math.round((projectRequirements.filter(r => r.met).length / projectRequirements.length) * 100)}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all",
                      projectRequirements.filter(r => r.met).length === projectRequirements.length ? "bg-success" : "bg-primary"
                    )}
                    style={{ width: `${(projectRequirements.filter(r => r.met).length / projectRequirements.length) * 100}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Project History */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">Project History</h3>
              <FolderKanban className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          
          {projectHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No project history</p>
          ) : (
            <div className="space-y-3">
              {projectHistory.slice(0, 4).map((project) => (
                <div key={project.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                  <div className={cn(
                    "mt-0.5 p-1.5 rounded-lg shrink-0",
                    project.status === "active" ? "bg-success/10" : "bg-muted"
                  )}>
                    <Hammer className={cn(
                      "h-3.5 w-3.5",
                      project.status === "active" ? "text-success" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-sm truncate">{project.projectName}</span>
                      {project.status === "active" && (
                        <Badge className="text-[9px] px-1.5 py-0 bg-success/10 text-success border-success/20">Active</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{project.role}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                      <span>{new Date(project.startDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                      <span>-</span>
                      <span>{project.endDate ? new Date(project.endDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "Present"}</span>
                      {project.location && (
                        <>
                          <span className="mx-1">|</span>
                          <MapPin className="h-3 w-3" />
                          <span>{project.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Verciti Training */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">Completed Verciti Training</h3>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          
          <div className="space-y-2">
            {user.certifications.slice(0, 5).map((cert) => (
              <div key={cert.id} className="flex items-center justify-between py-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="truncate max-w-[180px]">{cert.activityName}</span>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(cert.earnedDate).toLocaleDateString("en-GB")}</span>
              </div>
            ))}
            {user.certifications.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No completed training</p>
            )}
          </div>
        </div>
      </div>

      {/* Column 3: Assigned Training + Qualifications */}
      <div className="space-y-4">
        {/* Assigned Training */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">Assigned Training</h3>
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-1 mb-3">
            <button 
              onClick={() => setTrainingFilter("all")}
              className={cn(
                "px-2 py-1 rounded text-xs transition-colors",
                trainingFilter === "all" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              All ({allTraining.length})
            </button>
            <button 
              onClick={() => setTrainingFilter("overdue")}
              className={cn(
                "px-2 py-1 rounded text-xs transition-colors",
                trainingFilter === "overdue" ? "bg-destructive/20 text-destructive" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Overdue ({overdueTraining.length})
            </button>
            <button 
              onClick={() => setTrainingFilter("due_soon")}
              className={cn(
                "px-2 py-1 rounded text-xs transition-colors",
                trainingFilter === "due_soon" ? "bg-warning/20 text-warning" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Due Soon ({dueSoonTraining.length})
            </button>
            <button 
              onClick={() => setTrainingFilter("in_progress")}
              className={cn(
                "px-2 py-1 rounded text-xs transition-colors",
                trainingFilter === "in_progress" ? "bg-info/20 text-info" : "text-muted-foreground hover:text-foreground"
              )}
            >
              In Progress ({inProgressTraining.length})
            </button>
          </div>

          <div className="space-y-2">
            {filteredTraining.slice(0, 5).map((training) => (
              <div key={training.id} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{training.title}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Provider: {training.isVerciti ? "Verciti" : training.provider || "External"}
                  </p>
                </div>
                <div className="text-right ml-2">
                  <StatusBadge status={training.status} />
                  <p className="text-[10px] text-muted-foreground mt-0.5">Deadline: {new Date(training.deadline).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            ))}
            {filteredTraining.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No training assigned</p>
            )}
          </div>
        </div>

        {/* Qualifications & Certificates */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">Qualifications & Certificates</h3>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          
          <div className="space-y-2">
            {user.qualifications.slice(0, 5).map((qual) => {
              const isExpired = qual.expiryDate && new Date(qual.expiryDate) < new Date();
              const isExpiringSoon = qual.expiryDate && !isExpired && new Date(qual.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
              return (
                <div key={qual.id} className="flex items-center justify-between py-1.5 text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{qual.name}</p>
                    <p className="text-[10px] text-muted-foreground">Issued: {new Date(qual.dateObtained).toLocaleDateString("en-GB")}</p>
                  </div>
                  <StatusBadge status={isExpired ? "Expired" : isExpiringSoon ? "Expiring Soon" : "Verified"} />
                </div>
              );
            })}
            {user.qualifications.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No qualifications recorded</p>
            )}
          </div>
        </div>
      </div>

      {/* Column 4: Expiry Alerts + Evidence + Quick Actions + Notes */}
      <div className="space-y-4">
        {/* Expiry & Renewal Alerts */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">Expiry & Renewal Alerts</h3>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          
          <div className="space-y-2">
            {expiringItems.slice(0, 4).map((item, idx) => {
              const name = "activityName" in item ? item.activityName : item.name;
              const isExpired = new Date(item.expiryDate!) < new Date();
              return (
                <div key={idx} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={cn("h-4 w-4", isExpired ? "text-destructive" : "text-warning")} />
                    <div>
                      <p className="text-sm truncate max-w-[120px]">{name}</p>
                      <p className="text-[10px] text-muted-foreground">Expires: {new Date(item.expiryDate!).toLocaleDateString("en-GB")}</p>
                    </div>
                  </div>
                  <StatusBadge status={isExpired ? "Expired" : "Expiring Soon"} />
                </div>
              );
            })}
            {expiringItems.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No expiring items</p>
            )}
          </div>
        </div>

        {/* Evidence Verification */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">Evidence Verification</h3>
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          
          <div className="flex items-center gap-4">
            <DonutChart verified={verifiedEvidence} pending={pendingEvidence} rejected={rejectedEvidence} />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-success" />
                <span className="text-xs">Verified</span>
                <span className="text-xs font-medium ml-auto">{verifiedEvidence}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-warning" />
                <span className="text-xs">Pending</span>
                <span className="text-xs font-medium ml-auto">{pendingEvidence}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-destructive" />
                <span className="text-xs">Rejected</span>
                <span className="text-xs font-medium ml-auto">{rejectedEvidence}</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">Last verified: {evidence.length > 0 ? new Date().toLocaleDateString("en-GB") : "N/A"}</p>
        </div>

        {/* Uploaded Evidence */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border">
          <h3 className="font-medium text-sm mb-3">Uploaded Evidence</h3>
          <div className="space-y-1.5">
            {evidence.slice(0, 5).map((ev) => (
              <div key={ev.id} className="flex items-center justify-between py-1 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="truncate max-w-[100px]">{ev.fileName || ev.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground capitalize">{ev.type}</span>
                  <StatusBadge status={ev.status} />
                </div>
              </div>
            ))}
            {evidence.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-2">No evidence uploaded</p>
            )}
          </div>
        </div>

</div>
      </div>
    </div>
  );
}

// Training Tab Component (simplified placeholder)
function TrainingTab({ user }: { user: UserProfile }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 rounded-xl bg-muted/30 border border-border">
        <h3 className="font-medium mb-4">Assigned Training</h3>
        <div className="space-y-3">
          {user.training.map((t) => (
            <div key={t.id} className="p-3 rounded-lg bg-background border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{t.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.isVerciti ? `Verciti - ${t.courseName}` : t.provider}
                  </p>
                </div>
                <StatusBadge status={t.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Deadline: {new Date(t.deadline).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))}
          {user.training.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No training assigned</p>
          )}
        </div>
      </div>
      
      <div className="p-4 rounded-xl bg-muted/30 border border-border">
        <h3 className="font-medium mb-4">Completed Certifications</h3>
        <div className="space-y-3">
          {user.certifications.map((c) => (
            <div key={c.id} className="p-3 rounded-lg bg-background border border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{c.activityName}</p>
                    <p className="text-xs text-muted-foreground">Score: {c.score}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs">Earned: {new Date(c.earnedDate).toLocaleDateString("en-GB")}</p>
                  <p className="text-xs text-muted-foreground">Expires: {new Date(c.expiryDate).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            </div>
          ))}
          {user.certifications.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No certifications earned</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Qualifications Tab Component
function QualificationsTab({ user, evidence }: { user: UserProfile; evidence: Evidence[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 rounded-xl bg-muted/30 border border-border">
        <h3 className="font-medium mb-4">Qualifications</h3>
        <div className="space-y-3">
          {user.qualifications.map((q) => (
            <div key={q.id} className="p-3 rounded-lg bg-background border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{q.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{q.issuingBody}</p>
                </div>
                <StatusBadge status="verified" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Obtained: {new Date(q.dateObtained).toLocaleDateString("en-GB")}
                {q.expiryDate && ` | Expires: ${new Date(q.expiryDate).toLocaleDateString("en-GB")}`}
              </p>
            </div>
          ))}
          {user.qualifications.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No qualifications recorded</p>
          )}
        </div>
      </div>
      
      <div className="p-4 rounded-xl bg-muted/30 border border-border">
        <h3 className="font-medium mb-4">Uploaded Evidence</h3>
        <div className="space-y-3">
          {evidence.map((e) => (
            <div key={e.id} className="p-3 rounded-lg bg-background border border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.description}</p>
                  </div>
                </div>
                <StatusBadge status={e.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Uploaded: {new Date(e.uploadedDate).toLocaleDateString("en-GB")}
                {e.verifiedDate && ` | Verified: ${new Date(e.verifiedDate).toLocaleDateString("en-GB")}`}
              </p>
            </div>
          ))}
          {evidence.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No evidence uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Audit Tab Component
// Credentials Tab Component
function CredentialsTab({ credentials, userName }: { credentials: VerifiableCredential[]; userName: string }) {
  const [selectedCredential, setSelectedCredential] = useState<VerifiableCredential | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | CredentialStatus>("all");
  const [filterCategory, setFilterCategory] = useState<"all" | string>("all");

  const filteredCredentials = credentials.filter(c => {
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    if (filterCategory !== "all" && c.category !== filterCategory) return false;
    return true;
  });

  const activeCount = credentials.filter(c => c.status === "active").length;
  const expiredCount = credentials.filter(c => c.status === "expired").length;
  const revokedCount = credentials.filter(c => c.status === "revoked").length;

  const getStatusColor = (status: CredentialStatus) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "expired": return "bg-destructive/10 text-destructive border-destructive/20";
      case "revoked": return "bg-destructive/10 text-destructive border-destructive/20";
      case "suspended": return "bg-warning/10 text-warning border-warning/20";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "training": return BookOpen;
      case "qualification": return Award;
      case "certification": return FileCheck;
      case "competency": return Fingerprint;
      case "clearance": return ShieldCheck;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-medium text-lg">W3C Verifiable Credentials</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Cryptographically secured digital credentials for {userName}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 px-4 py-2 rounded-lg bg-muted/30 border border-border">
            <div className="text-center">
              <p className="text-lg font-bold text-success">{activeCount}</p>
              <p className="text-[10px] text-muted-foreground">Active</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-destructive">{expiredCount}</p>
              <p className="text-[10px] text-muted-foreground">Expired</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-muted-foreground">{revokedCount}</p>
              <p className="text-[10px] text-muted-foreground">Revoked</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Issue Credential
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <div className="flex gap-1">
          {["all", "active", "expired", "revoked"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              className="text-xs h-7 px-2.5"
              onClick={() => setFilterStatus(status as "all" | CredentialStatus)}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
        <div className="w-px h-6 bg-border mx-2" />
        <div className="flex gap-1">
          {["all", "training", "qualification", "certification", "clearance"].map((cat) => (
            <Button
              key={cat}
              variant={filterCategory === cat ? "default" : "outline"}
              size="sm"
              className="text-xs h-7 px-2.5"
              onClick={() => setFilterCategory(cat)}
            >
              {cat === "all" ? "All Types" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCredentials.map((credential) => {
          const CategoryIcon = getCategoryIcon(credential.category);
          return (
            <div 
              key={credential.id}
              className={cn(
                "p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                credential.status === "active" ? "bg-muted/30 border-border hover:border-primary/50" : "bg-muted/10 border-border/50"
              )}
              onClick={() => setSelectedCredential(credential)}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2.5 rounded-lg shrink-0",
                  credential.status === "active" ? "bg-primary/10" : "bg-muted"
                )}>
                  <CategoryIcon className={cn(
                    "h-5 w-5",
                    credential.status === "active" ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{credential.displayName}</h4>
                    <Badge variant="outline" className={cn("text-[10px] shrink-0", getStatusColor(credential.status))}>
                      {credential.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{credential.description}</p>
                  
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Issuer:</span>
                      <span>{credential.issuer.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Issued:</span>
                      <span>{new Date(credential.issuanceDate).toLocaleDateString("en-GB")}</span>
                    </div>
                    {credential.expirationDate && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Expires:</span>
                        <span className={new Date(credential.expirationDate) < new Date() ? "text-destructive" : ""}>
                          {new Date(credential.expirationDate).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 text-success" />
                  <span>Cryptographically Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={(e) => { e.stopPropagation(); }}>
                    <QrCode className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={(e) => { e.stopPropagation(); }}>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={(e) => { e.stopPropagation(); }}>
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredCredentials.length === 0 && (
          <div className="col-span-full text-center py-12">
            <ShieldCheck className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No credentials found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or issue a new credential</p>
          </div>
        )}
      </div>

      {/* Credential Detail Modal */}
      {selectedCredential && (
        <Dialog open={!!selectedCredential} onOpenChange={() => setSelectedCredential(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Verifiable Credential Details
              </DialogTitle>
              <DialogDescription>
                W3C compliant digital credential with cryptographic proof
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Credential Header */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{selectedCredential.displayName}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{selectedCredential.description}</p>
                  </div>
                  <Badge variant="outline" className={cn("text-xs", getStatusColor(selectedCredential.status))}>
                    {selectedCredential.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-success">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Cryptographically Verified Credential</span>
                </div>
              </div>

              {/* Credential Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/20 border border-border">
                  <p className="text-[10px] text-muted-foreground mb-1">Credential Type</p>
                  <p className="text-sm font-medium">{selectedCredential.type.join(", ")}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20 border border-border">
                  <p className="text-[10px] text-muted-foreground mb-1">Category</p>
                  <p className="text-sm font-medium capitalize">{selectedCredential.category}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20 border border-border">
                  <p className="text-[10px] text-muted-foreground mb-1">Issuance Date</p>
                  <p className="text-sm font-medium">{new Date(selectedCredential.issuanceDate).toLocaleDateString("en-GB")}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20 border border-border">
                  <p className="text-[10px] text-muted-foreground mb-1">Expiration Date</p>
                  <p className="text-sm font-medium">
                    {selectedCredential.expirationDate 
                      ? new Date(selectedCredential.expirationDate).toLocaleDateString("en-GB")
                      : "No Expiration"}
                  </p>
                </div>
              </div>

              {/* Issuer */}
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <p className="text-[10px] text-muted-foreground mb-2">Issuer</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {selectedCredential.issuer.logo || selectedCredential.issuer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{selectedCredential.issuer.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{selectedCredential.issuer.id}</p>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <p className="text-[10px] text-muted-foreground mb-2">Credential Subject</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subject ID (DID)</span>
                    <span className="text-sm font-mono">{selectedCredential.credentialSubject.id}</span>
                  </div>
                  {selectedCredential.credentialSubject.achievement && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Achievement</span>
                      <span className="text-sm">{selectedCredential.credentialSubject.achievement}</span>
                    </div>
                  )}
                  {selectedCredential.credentialSubject.competency && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Competency</span>
                      <span className="text-sm">{selectedCredential.credentialSubject.competency}</span>
                    </div>
                  )}
                  {selectedCredential.credentialSubject.level && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Level</span>
                      <span className="text-sm">{selectedCredential.credentialSubject.level}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Proof */}
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Key className="h-4 w-4 text-primary" />
                  <p className="text-[10px] text-muted-foreground">Cryptographic Proof</p>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span>{selectedCredential.proof.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span>{new Date(selectedCredential.proof.created).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Purpose</span>
                    <span>{selectedCredential.proof.proofPurpose}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Verification Method</span>
                    <span className="break-all bg-muted/50 p-2 rounded text-[10px]">{selectedCredential.proof.verificationMethod}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="gap-1.5 flex-1">
                  <QrCode className="h-4 w-4" />
                  Show QR Code
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 flex-1">
                  <Copy className="h-4 w-4" />
                  Copy JSON-LD
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 flex-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 flex-1">
                  <ExternalLink className="h-4 w-4" />
                  Verify
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function AuditTab({ auditTrail }: { auditTrail: AuditEvent[] }) {
  return (
    <div className="p-4 rounded-xl bg-muted/30 border border-border">
      <h3 className="font-medium mb-4">Complete Audit Trail</h3>
      
      {auditTrail.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No activity recorded</p>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {[...auditTrail].reverse().map((event) => (
              <div key={event.id} className="relative flex gap-4 pl-2">
                <div className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-card",
                  event.type.includes("completed") || event.type.includes("verified") || event.type.includes("earned")
                    ? "border-success" :
                  event.type.includes("failed")
                    ? "border-destructive" :
                  event.type.includes("assigned") || event.type.includes("started")
                    ? "border-info" :
                  "border-muted-foreground"
                )}>
                  <AuditEventIcon type={event.type} />
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">{getAuditEventLabel(event.type)}</Badge>
                        {event.performedBy && (
                          <span className="text-xs text-muted-foreground">by {event.performedBy}</span>
                        )}
                      </div>
                      <p className="text-sm mt-1">{event.description}</p>
                      {event.metadata && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {Object.entries(event.metadata).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="text-[10px]">
                              {key}: {value}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(event.timestamp).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
