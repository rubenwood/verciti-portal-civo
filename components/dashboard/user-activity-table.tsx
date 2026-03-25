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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Monitor,
  Bell,
  Activity,
} from "lucide-react";
import { userActivityData, type UserActivity, type Attempt } from "@/lib/mock-data";
import { NotificationDialog } from "./notification-dialog";
import { cn } from "@/lib/utils";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateTime(dateString: string) {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
}

function StatusBadge({ status }: { status: Attempt["completionStatus"] }) {
  const variants = {
    completed: "bg-success/20 text-success border-success/30",
    "in-progress": "bg-warning/20 text-warning border-warning/30",
    abandoned: "bg-destructive/20 text-destructive border-destructive/30",
  };

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", variants[status])}
    >
      {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function AttemptDetails({ attempt }: { attempt: Attempt }) {
  const [showStages, setShowStages] = useState(false);

  return (
    <div className="rounded-md border border-border bg-muted/30 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowStages(!showStages)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showStages ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <div>
            <p className="text-sm font-medium text-card-foreground">
              {formatDateTime(attempt.timestamp)}
            </p>
            <p className="text-xs text-muted-foreground">
              {attempt.stages.length} stage{attempt.stages.length !== 1 ? "s" : ""} viewed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {attempt.score !== undefined && (
            <span className="text-sm font-medium text-card-foreground">
              Score: {attempt.score}%
            </span>
          )}
          <StatusBadge status={attempt.completionStatus} />
        </div>
      </div>

      {showStages && (
        <div className="mt-3 space-y-2 pl-7">
          {attempt.stages.map((stage) => (
            <div
              key={stage.id}
              className="flex items-center justify-between rounded-md bg-background p-2 text-sm"
            >
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-chart-1" />
                <span className="text-card-foreground">{stage.name}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{formatTime(stage.viewedAt)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {stage.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityDetails({ activity }: { activity: UserActivity["activities"][0] }) {
  const [showAttempts, setShowAttempts] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAttempts(!showAttempts)}
          className="flex items-center gap-2 text-sm font-medium text-card-foreground hover:text-primary"
        >
          {showAttempts ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          {activity.name}
        </button>
        <Badge variant="outline" className="text-xs border-border text-muted-foreground">
          {activity.module}
        </Badge>
      </div>
      <p className="pl-6 text-xs text-muted-foreground">
        {activity.attempts.length} attempt{activity.attempts.length !== 1 ? "s" : ""}
      </p>

      {showAttempts && (
        <div className="space-y-2 pl-6">
          {activity.attempts.map((attempt) => (
            <AttemptDetails key={attempt.id} attempt={attempt} />
          ))}
        </div>
      )}
    </div>
  );
}

function UserRow({ user }: { user: UserActivity }) {
  const [expanded, setExpanded] = useState(false);
  const [showLogins, setShowLogins] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <TableRow className="border-border hover:bg-muted/30">
          <TableCell>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                {expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </TableCell>
          <TableCell className="font-medium text-card-foreground">
            {user.anonymizedName}
          </TableCell>
          <TableCell className="text-muted-foreground font-mono text-sm">
            {user.userId}
          </TableCell>
          <TableCell className="text-muted-foreground">
            {user.anonymizedEmail}
          </TableCell>
          <TableCell className="text-muted-foreground">
            {formatDateTime(user.lastActive)}
          </TableCell>
          <TableCell className="text-center text-card-foreground">
            {user.totalLogins}
          </TableCell>
          <TableCell className="text-center text-card-foreground">
            {user.activitiesCompleted}
          </TableCell>
          <TableCell>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNotificationOpen(true)}
              className="border-border hover:bg-primary hover:text-primary-foreground"
            >
              <Bell className="mr-2 h-3 w-3" />
              Notify
            </Button>
          </TableCell>
        </TableRow>

        <CollapsibleContent asChild>
          <TableRow className="border-border bg-muted/10 hover:bg-muted/10">
            <TableCell colSpan={8} className="p-0">
              <div className="p-4 space-y-4">
                {/* Login Sessions */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <button
                    onClick={() => setShowLogins(!showLogins)}
                    className="flex w-full items-center justify-between"
                  >
                    <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-chart-2" />
                      Login Sessions
                    </h4>
                    {showLogins ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>

                  {showLogins && (
                    <div className="mt-3 space-y-2">
                      {user.loginSessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between rounded-md bg-muted/50 p-3 text-sm"
                        >
                          <div>
                            <p className="font-medium text-card-foreground">
                              {formatDateTime(session.timestamp)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {session.device}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-card-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {session.duration}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {session.ipAddress}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Activities */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <button
                    onClick={() => setShowActivities(!showActivities)}
                    className="flex w-full items-center justify-between"
                  >
                    <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                      <Activity className="h-4 w-4 text-chart-1" />
                      Activities Completed ({user.activities.length})
                    </h4>
                    {showActivities ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>

                  {showActivities && (
                    <div className="mt-3 space-y-3">
                      {user.activities.map((activity) => (
                        <ActivityDetails key={activity.id} activity={activity} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TableCell>
          </TableRow>
        </CollapsibleContent>
      </Collapsible>

      <NotificationDialog
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
        userName={user.anonymizedName}
        userEmail={user.anonymizedEmail}
        userId={user.userId}
      />
    </>
  );
}

export function UserActivityTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="text-lg font-semibold text-card-foreground">User Activity</h3>
        <p className="text-sm text-muted-foreground">
          Track user logins, activities, and learning progress (GDPR anonymized)
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-10"></TableHead>
            <TableHead className="text-muted-foreground">Name</TableHead>
            <TableHead className="text-muted-foreground">User ID</TableHead>
            <TableHead className="text-muted-foreground">Email</TableHead>
            <TableHead className="text-muted-foreground">Last Active</TableHead>
            <TableHead className="text-center text-muted-foreground">Logins</TableHead>
            <TableHead className="text-center text-muted-foreground">Activities</TableHead>
            <TableHead className="text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userActivityData.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
