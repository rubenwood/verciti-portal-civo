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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Upload,
  Award,
  BookOpen,
  FileText,
  Shield,
  Star,
  Zap,
  Wind,
  Trophy,
  User,
} from "lucide-react";
import { userProfiles, type UserProfile, type UserStatus } from "@/lib/mock-data";
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

function SkillLevelBadge({ level }: { level: string }) {
  const colors = {
    beginner: "bg-info/10 text-info",
    intermediate: "bg-warning/10 text-warning",
    advanced: "bg-primary/10 text-primary",
    expert: "bg-success/10 text-success",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded text-xs capitalize", colors[level as keyof typeof colors])}>
      {level}
    </span>
  );
}

function BadgeIcon({ iconName }: { iconName: string }) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    hydrogen: Zap,
    star: Star,
    wind: Wind,
    trophy: Trophy,
    zap: Zap,
    shield: Shield,
  };
  const Icon = icons[iconName] || Award;
  return <Icon className="h-8 w-8 text-primary" />;
}

function UserProfileModal({ user, open, onOpenChange }: { 
  user: UserProfile; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const displayEmail = anonymizeEmail(user.email);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <UserAvatar email={user.email} size="lg" />
            <div>
              <DialogTitle className="text-xl">{user.fullName}</DialogTitle>
              <p className="text-sm text-muted-foreground">{displayEmail}</p>
              <p className="text-sm text-muted-foreground">{user.jobTitle} - {user.department}</p>
              <div className="mt-2">
                <StatusBadge status={user.status} />
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Progress Overview */}
        <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-primary font-semibold">{user.overallProgress}%</span>
          </div>
          <Progress value={user.overallProgress} className="h-2" />
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>Total Time: {user.totalTimeSpent}</span>
            <span>{user.completedActivities.length} activities completed</span>
          </div>
        </div>

        <Tabs defaultValue="skills" className="mt-4">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="mt-4 space-y-3">
            {user.skills.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No skills recorded yet</p>
            ) : (
              user.skills.map((skill) => (
                <div key={skill.id} className="p-3 rounded-lg bg-muted/20 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <SkillLevelBadge level={skill.level} />
                    </div>
                    <span className="text-sm text-primary">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-1.5" />
                </div>
              ))
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

          <TabsContent value="badges" className="mt-4">
            {user.badges.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No badges earned yet</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="p-4 rounded-lg bg-muted/20 border border-border flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BadgeIcon iconName={badge.icon} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Earned: {new Date(badge.earnedDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activities" className="mt-4">
            {user.completedActivities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No activities completed yet</p>
            ) : (
              <div className="space-y-2">
                {user.completedActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border">
                    <div className="p-2 rounded-full bg-success/10">
                      <BookOpen className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-sm">{activity}</span>
                    <CheckCircle className="h-4 w-4 text-success ml-auto" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
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
            <div>
              <p className="font-medium text-foreground">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">{displayEmail}</p>
            </div>
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
        <TableCell>
          <div className="flex items-center gap-2">
            <Progress value={user.overallProgress} className="h-1.5 w-20" />
            <span className="text-xs text-muted-foreground">{user.overallProgress}%</span>
          </div>
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
          View all users in your organisation with their status and progress
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-normal">User</TableHead>
            <TableHead className="text-muted-foreground font-normal">Department</TableHead>
            <TableHead className="text-muted-foreground font-normal">Job Title</TableHead>
            <TableHead className="text-muted-foreground font-normal">Status</TableHead>
            <TableHead className="text-muted-foreground font-normal">Progress</TableHead>
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
