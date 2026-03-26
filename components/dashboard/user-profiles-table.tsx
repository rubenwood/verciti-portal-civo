"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Upload,
  Award,
  FileText,
  Plus,
  ArrowLeft,
  ArrowRight,
  Calendar,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  Link2,
  LinkIcon,
} from "lucide-react";
import { 
  userProfiles, 
  courses, 
  modules,
  type LinkedProvider, 
  trainingProviders,
  type UserProfile, 
  type UserStatus, 
  type Certification,
  type Training,
} from "@/lib/mock-data";
import { anonymizeEmail, getAvatarInitials, cn } from "@/lib/utils";

function UserAvatar({ email, size = "sm" }: { email: string; size?: "sm" | "lg" }) {
  const initials = getAvatarInitials(email);
  const sizeClasses = size === "lg" ? "h-16 w-16 text-xl" : "h-8 w-8 text-xs";
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-[#4a5d23] font-medium text-white shrink-0 uppercase",
      sizeClasses
    )}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const config = {
    not_signed_up: {
      label: "Not Signed Up",
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
    signed_up_not_logged_in: {
      label: "Signed Up (No Login)",
      icon: Clock,
      className: "bg-warning/10 text-warning border-warning/20",
    },
    active: {
      label: "Active",
      icon: CheckCircle,
      className: "bg-success/10 text-success border-success/20",
    },
  };

  const { label, icon: Icon, className } = config[status];

  return (
    <Badge variant="outline" className={cn("gap-1", className)}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}

function TrainingStatusBadge({ status }: { status: Training["status"] }) {
  const config = {
    not_started: {
      label: "Not Started",
      className: "bg-muted text-muted-foreground border-border",
    },
    in_progress: {
      label: "In Progress",
      className: "bg-info/10 text-info border-info/20",
    },
    completed: {
      label: "Completed",
      className: "bg-success/10 text-success border-success/20",
    },
    overdue: {
      label: "Overdue",
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };

  const { label, className } = config[status];

  return (
    <Badge variant="outline" className={cn("text-xs", className)}>
      {label}
    </Badge>
  );
}

// Generate QR code SVG using a simple pattern based on verification code
function QRCodeDisplay({ verificationCode, activityName, userEmail }: { 
  verificationCode: string; 
  activityName: string;
  userEmail: string;
}) {
  const generatePattern = (code: string) => {
    const cells: boolean[][] = [];
    const size = 21;
    
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = ((hash << 5) - hash) + code.charCodeAt(i);
      hash = hash & hash;
    }
    
    for (let row = 0; row < size; row++) {
      cells[row] = [];
      for (let col = 0; col < size; col++) {
        const isTopLeft = row < 7 && col < 7;
        const isTopRight = row < 7 && col >= size - 7;
        const isBottomLeft = row >= size - 7 && col < 7;
        
        if (isTopLeft || isTopRight || isBottomLeft) {
          const localRow = row >= size - 7 ? row - (size - 7) : row;
          const localCol = col >= size - 7 ? col - (size - 7) : col;
          
          if (localRow === 0 || localRow === 6 || localCol === 0 || localCol === 6) {
            cells[row][col] = true;
          } else if (localRow >= 2 && localRow <= 4 && localCol >= 2 && localCol <= 4) {
            cells[row][col] = true;
          } else {
            cells[row][col] = false;
          }
        } else {
          const seed = (hash + row * 31 + col * 17) % 100;
          cells[row][col] = seed > 45;
        }
      }
    }
    return cells;
  };

  const pattern = generatePattern(verificationCode);
  const cellSize = 8;
  const padding = 16;
  const qrSize = 21 * cellSize;
  const totalSize = qrSize + padding * 2;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg">
      <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`}>
        <rect x="0" y="0" width={totalSize} height={totalSize} fill="white" />
        {pattern.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            cell ? (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={padding + colIndex * cellSize}
                y={padding + rowIndex * cellSize}
                width={cellSize}
                height={cellSize}
                fill="black"
              />
            ) : null
          )
        )}
      </svg>
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-gray-900">{activityName}</p>
        <p className="text-xs text-gray-500 mt-1">Certification</p>
        <p className="text-xs font-mono text-gray-700 mt-2 bg-gray-100 px-2 py-1 rounded">
          {verificationCode}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Awarded to: {anonymizeEmail(userEmail)}
        </p>
      </div>
    </div>
  );
}

function CertificationQRModal({ 
  certification, 
  userEmail,
  open, 
  onOpenChange 
}: { 
  certification: Certification;
  userEmail: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Certification Verification
          </DialogTitle>
          <DialogDescription>
            Scan this QR code to verify the authenticity of this certification.
          </DialogDescription>
        </DialogHeader>
        <QRCodeDisplay 
          verificationCode={certification.verificationCode}
          activityName={certification.activityName}
          userEmail={userEmail}
        />
        <div className="text-center text-xs text-muted-foreground">
          Earned on {new Date(certification.earnedDate).toLocaleDateString("en-GB")} with {certification.score}% score
        </div>
      </DialogContent>
    </Dialog>
  );
}

// External Training Details Modal
function ExternalTrainingDetailsModal({
  training,
  open,
  onOpenChange,
  onDelete,
  linkedProviders,
}: {
  training: Training;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  linkedProviders: LinkedProvider[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeadline, setEditedDeadline] = useState(training.deadline);
  const [editedDescription, setEditedDescription] = useState(training.description || "");
  const [documents, setDocuments] = useState<{ name: string; uploadedAt: string }[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    // Here you would save the changes
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete();
    onOpenChange(false);
  };

  const handleUploadDocument = () => {
    // Simulate document upload
    const newDoc = {
      name: `completion_evidence_${Date.now()}.pdf`,
      uploadedAt: new Date().toISOString(),
    };
    setDocuments([...documents, newDoc]);
  };

  const provider = trainingProviders.find(p => p.id === training.provider);
  const providerName = provider?.name || training.provider;
  const supportsLinking = provider?.supportsAccountLinking ?? false;
  const linkedProvider = linkedProviders.find(lp => lp.providerId === training.provider);
  const isLinked = !!linkedProvider;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-info" />
            External Training Details
          </DialogTitle>
          <DialogDescription>
            View and manage this external training assignment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Training Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Provider</span>
              <span className="font-medium">{providerName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <TrainingStatusBadge status={training.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Assigned</span>
              <span className="text-sm">{new Date(training.assignedDate).toLocaleDateString("en-GB")}</span>
            </div>
          </div>

          {/* Account Linking Status */}
          {supportsLinking && (
            <div className="pt-3 border-t border-border">
              {isLinked ? (
                <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Link2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Account Linked</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Connected to {providerName} as <span className="font-medium">{linkedProvider.accountEmail}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Linked on {new Date(linkedProvider.linkedAt).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-xs text-primary mt-2">
                    Training completion will be synced automatically.
                  </p>
                </div>
              ) : (
                <div className="bg-muted/30 border border-border rounded-md p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Account Not Linked</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Link your {providerName} account to automatically sync training completion status.
                  </p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Link2 className="h-4 w-4" />
                    Link {providerName} Account
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Editable Fields */}
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Deadline</label>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                )}
              </div>
              {isEditing ? (
                <Input
                  type="date"
                  value={editedDeadline}
                  onChange={(e) => setEditedDeadline(e.target.value)}
                />
              ) : (
                <p className={cn(
                  "text-sm",
                  training.status === "overdue" && "text-destructive"
                )}>
                  {new Date(training.deadline).toLocaleDateString("en-GB")}
                  {training.status === "overdue" && (
                    <span className="ml-2 text-xs">(Overdue)</span>
                  )}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Training Details</label>
              {isEditing ? (
                <Textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={3}
                />
              ) : (
                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                  {training.description || "No description provided"}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Supporting Documents - Only show if not linked */}
          {(!supportsLinking || !isLinked) && (
            <div className="space-y-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Supporting Documents</label>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleUploadDocument}>
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
              
              {documents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4 bg-muted/20 rounded-md">
                  No documents uploaded yet. Upload evidence of completion.
                </p>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/20 rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 text-info">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Delete Section */}
          <div className="pt-3 border-t border-border">
            {showDeleteConfirm ? (
              <div className="bg-destructive/10 p-3 rounded-md space-y-3">
                <p className="text-sm text-destructive">
                  Are you sure you want to delete this training assignment?
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleDelete}
                  >
                    Delete Training
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Training
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Assign Training Wizard
function AssignTrainingWizard({ 
  open, 
  onOpenChange,
  userEmail,
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}) {
  const [step, setStep] = useState(1);
  const [isVerciti, setIsVerciti] = useState<boolean | null>(null);
  
  // Verciti training state
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<string>("");
  
  // External training state
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [providerSearch, setProviderSearch] = useState<string>("");
  const [trainingDescription, setTrainingDescription] = useState<string>("");
  
  // Shared state
  const [deadline, setDeadline] = useState<string>("");

  const resetForm = () => {
    setStep(1);
    setIsVerciti(null);
    setSelectedCourse("");
    setSelectedModule("");
    setSelectedProvider("");
    setProviderSearch("");
    setTrainingDescription("");
    setDeadline("");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleAssign = () => {
    // Here you would save the training assignment
    handleClose();
  };

  const filteredProviders = trainingProviders.filter(provider =>
    provider.name.toLowerCase().includes(providerSearch.toLowerCase())
  );

  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Assign New Training
          </DialogTitle>
          <DialogDescription>
            Assign training to {anonymizeEmail(userEmail)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Step indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={cn("px-2 py-1 rounded", step === 1 ? "bg-primary text-primary-foreground" : "bg-muted")}>
              Step {step}
            </span>
            <span>of {isVerciti === null ? "?" : isVerciti ? "3" : "3"}</span>
          </div>

          {/* Step 1: Choose training type */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-foreground">Is this training provided via the Verciti app?</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setIsVerciti(true); setStep(2); }}
                  className={cn(
                    "p-4 rounded-lg border text-left transition-colors",
                    "hover:border-primary hover:bg-primary/5",
                    "border-border bg-muted/20"
                  )}
                >
                  <BookOpen className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium text-sm">Verciti Training</p>
                  <p className="text-xs text-muted-foreground mt-1">Assign from our course catalog</p>
                </button>
                <button
                  onClick={() => { setIsVerciti(false); setStep(2); }}
                  className={cn(
                    "p-4 rounded-lg border text-left transition-colors",
                    "hover:border-primary hover:bg-primary/5",
                    "border-border bg-muted/20"
                  )}
                >
                  <ExternalLink className="h-6 w-6 text-info mb-2" />
                  <p className="font-medium text-sm">External Training</p>
                  <p className="text-xs text-muted-foreground mt-1">Third-party provider</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Verciti - Select course and module */}
          {step === 2 && isVerciti && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Course</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course..." />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCourse && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Module</label>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a module..." />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCourseData?.modules.map(mod => (
                        <SelectItem key={mod} value={mod}>
                          {mod}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!selectedModule}
                  className="flex-1 gap-1"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: External - Select provider and add description */}
          {step === 2 && isVerciti === false && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Training Provider</label>
                <Input
                  placeholder="Search providers..."
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                  className="mb-2"
                />
                <div className="max-h-40 overflow-y-auto space-y-1 border border-border rounded-md p-2">
                  {filteredProviders.map(provider => (
                    <button
                      key={provider.id}
                      onClick={() => setSelectedProvider(provider.id)}
                      className={cn(
                        "w-full flex items-center gap-2 p-2 rounded text-left text-sm transition-colors",
                        selectedProvider === provider.id 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      )}
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs font-medium shrink-0">
                        {provider.logo}
                      </span>
                      {provider.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Training Details</label>
                <Textarea
                  placeholder="Describe the training, including any specific course URLs or requirements..."
                  value={trainingDescription}
                  onChange={(e) => setTrainingDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!selectedProvider || !trainingDescription}
                  className="flex-1 gap-1"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Set deadline */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Training Summary</p>
                {isVerciti ? (
                  <>
                    <p className="font-medium text-sm">{selectedModule}</p>
                    <p className="text-xs text-muted-foreground">
                      Course: {selectedCourseData?.name}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-sm">
                      {trainingProviders.find(p => p.id === selectedProvider)?.name} Training
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {trainingDescription}
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Deadline
                </label>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleAssign}
                  disabled={!deadline}
                  className="flex-1"
                >
                  Assign Training
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UserProfileModal({ user, open, onOpenChange }: { 
  user: UserProfile; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const displayEmail = anonymizeEmail(user.email);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [assignTrainingOpen, setAssignTrainingOpen] = useState(false);
  const [selectedExternalTraining, setSelectedExternalTraining] = useState<Training | null>(null);

  const handleDeleteTraining = () => {
    // Here you would delete the training from the user's training list
    setSelectedExternalTraining(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <UserAvatar email={user.email} size="lg" />
              <div>
                <DialogTitle className="text-xl">{displayEmail}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {user.jobTitle} - {user.department}
                </DialogDescription>
                <div className="mt-2">
                  <StatusBadge status={user.status} />
                </div>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="training" className="mt-4">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="training" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Manage ongoing and assigned training
                </p>
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setAssignTrainingOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Assign New Training
                </Button>
              </div>

              {user.training.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No training assigned</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Assign training to help this user develop their skills
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {user.training.map((training) => (
                    <div 
                      key={training.id} 
                      onClick={!training.isVerciti ? () => setSelectedExternalTraining(training) : undefined}
                      className={cn(
                        "p-4 rounded-lg border transition-colors",
                        training.status === "overdue" 
                          ? "border-destructive/30 bg-destructive/5" 
                          : "border-border bg-muted/20",
                        !training.isVerciti && "cursor-pointer hover:bg-muted/40"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {training.isVerciti ? (
                              <BookOpen className="h-4 w-4 text-primary" />
                            ) : (
                              <ExternalLink className="h-4 w-4 text-info" />
                            )}
                            <span className="font-medium text-sm">{training.title}</span>
                            <TrainingStatusBadge status={training.status} />
                          </div>
                          
                          {training.isVerciti ? (
                            <p className="text-xs text-muted-foreground">
                              Course: {training.courseName} - Module: {training.moduleName}
                            </p>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Provider: {trainingProviders.find(p => p.id === training.provider)?.name || training.provider}</span>
                                {user.linkedProviders.some(lp => lp.providerId === training.provider) && (
                                  <span className="inline-flex items-center gap-1 text-primary text-[10px] bg-primary/10 px-1.5 py-0.5 rounded">
                                    <Link2 className="h-3 w-3" />
                                    Linked
                                  </span>
                                )}
                              </div>
                              {training.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {training.description}
                                </p>
                              )}
                            </>
                          )}
                          
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Deadline: {new Date(training.deadline).toLocaleDateString("en-GB")}
                            </span>
                            {training.status === "overdue" && (
                              <span className="flex items-center gap-1 text-destructive">
                                <AlertTriangle className="h-3 w-3" />
                                Overdue
                              </span>
                            )}
                          </div>
                          
                          {!training.isVerciti && (
                            <p className="text-xs text-info mt-2">Click to view details and upload evidence</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="qualifications" className="mt-4 space-y-3">
              <div className="flex justify-end mb-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
              </div>
              {user.qualifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No qualifications recorded yet</p>
              ) : (
                user.qualifications.map((qual) => (
                  <div key={qual.id} className="p-4 rounded-lg bg-muted/20 border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{qual.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {qual.issuingBody} - {new Date(qual.dateObtained).toLocaleDateString("en-GB")}
                        </p>
                        {qual.expiryDate && (
                          <p className="text-xs text-muted-foreground">
                            Expires: {new Date(qual.expiryDate).toLocaleDateString("en-GB")}
                          </p>
                        )}
                      </div>
                      {qual.documentName && (
                        <Button variant="ghost" size="sm" className="gap-1 text-info hover:text-info">
                          <Download className="h-4 w-4" />
                          <span className="text-xs">{qual.documentName}</span>
                        </Button>
                      )}
                      {!qual.documentName && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Upload className="h-4 w-4" />
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="certifications" className="mt-4">
              {user.certifications.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No certifications earned yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Complete activities with 100% score to earn certifications
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {user.certifications.map((cert) => (
                    <button
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="p-4 rounded-lg bg-muted/20 border border-border flex items-start gap-3 hover:bg-muted/40 transition-colors text-left w-full"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{cert.activityName}</p>
                        <p className="text-xs text-muted-foreground">
                          Achieved {cert.score}% score
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Earned: {new Date(cert.earnedDate).toLocaleDateString("en-GB")}
                        </p>
                        <p className="text-xs text-primary mt-2">
                          Click to view verification QR code
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {selectedCert && (
        <CertificationQRModal
          certification={selectedCert}
          userEmail={user.email}
          open={!!selectedCert}
          onOpenChange={(open) => !open && setSelectedCert(null)}
        />
      )}

      <AssignTrainingWizard
        open={assignTrainingOpen}
        onOpenChange={setAssignTrainingOpen}
        userEmail={user.email}
      />

      {selectedExternalTraining && (
        <ExternalTrainingDetailsModal
          training={selectedExternalTraining}
          open={!!selectedExternalTraining}
          onOpenChange={(open) => !open && setSelectedExternalTraining(null)}
          onDelete={handleDeleteTraining}
          linkedProviders={user.linkedProviders}
        />
      )}
    </>
  );
}

function UserProfileRow({ user }: { user: UserProfile }) {
  const [modalOpen, setModalOpen] = useState(false);
  const displayEmail = anonymizeEmail(user.email);

  return (
    <>
      <TableRow 
        className="border-border hover:bg-muted/20 cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <TableCell>
          <div className="flex items-center gap-3">
            <UserAvatar email={user.email} />
            <span className="text-foreground">{displayEmail}</span>
          </div>
        </TableCell>
        <TableCell className="text-muted-foreground">
          {user.department}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {user.jobTitle}
        </TableCell>
        <TableCell>
          <StatusBadge status={user.status} />
        </TableCell>
        <TableCell className="text-muted-foreground text-right">
          {user.lastLogin 
            ? new Date(user.lastLogin).toLocaleDateString("en-GB")
            : "-"
          }
        </TableCell>
      </TableRow>

      <UserProfileModal user={user} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}

export function UserProfilesTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground">User Profiles</h3>
        <p className="text-sm text-muted-foreground">
          View all users in your organisation with their status
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-normal">User</TableHead>
            <TableHead className="text-muted-foreground font-normal">Department</TableHead>
            <TableHead className="text-muted-foreground font-normal">Job Title</TableHead>
            <TableHead className="text-muted-foreground font-normal">Status</TableHead>
            <TableHead className="text-muted-foreground font-normal text-right">Last Login</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userProfiles.map((user) => (
            <UserProfileRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
