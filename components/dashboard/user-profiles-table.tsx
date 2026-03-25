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
import {
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Upload,
  Award,
  FileText,
  X,
} from "lucide-react";
import { userProfiles, type UserProfile, type UserStatus, type Certification } from "@/lib/mock-data";
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

// Generate QR code SVG using a simple pattern based on verification code
function QRCodeDisplay({ verificationCode, activityName, userEmail }: { 
  verificationCode: string; 
  activityName: string;
  userEmail: string;
}) {
  // Generate a deterministic pattern based on the verification code
  const generatePattern = (code: string) => {
    const cells: boolean[][] = [];
    const size = 21; // Standard QR code size
    
    // Create a hash-like pattern from the code
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = ((hash << 5) - hash) + code.charCodeAt(i);
      hash = hash & hash;
    }
    
    for (let row = 0; row < size; row++) {
      cells[row] = [];
      for (let col = 0; col < size; col++) {
        // Position detection patterns (corners)
        const isTopLeft = row < 7 && col < 7;
        const isTopRight = row < 7 && col >= size - 7;
        const isBottomLeft = row >= size - 7 && col < 7;
        
        if (isTopLeft || isTopRight || isBottomLeft) {
          // Create finder patterns
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
          // Generate data pattern based on hash
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

function UserProfileModal({ user, open, onOpenChange }: { 
  user: UserProfile; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const displayEmail = anonymizeEmail(user.email);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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

          <Tabs defaultValue="qualifications" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

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
                          {qual.verified && (
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                              Verified
                            </Badge>
                          )}
                          {!qual.verified && (
                            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {qual.issuingBody} - {new Date(qual.dateObtained).toLocaleDateString("en-GB")}
                        </p>
                        {qual.expiryDate && (
                          <p className="text-xs text-muted-foreground">
                            Expires: {new Date(qual.expiryDate).toLocaleDateString("en-GB")}
                          </p>
                        )}
                        {qual.isExternal && (
                          <Badge variant="outline" className="mt-2 text-xs">External</Badge>
                        )}
                      </div>
                      {qual.documentName && (
                        <Button variant="ghost" size="sm" className="gap-1 text-info hover:text-info">
                          <Download className="h-4 w-4" />
                          <span className="text-xs">{qual.documentName}</span>
                        </Button>
                      )}
                      {!qual.documentName && qual.isExternal && (
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
