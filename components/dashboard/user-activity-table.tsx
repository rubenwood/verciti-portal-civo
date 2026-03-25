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
import {
  ChevronRight,
  Bell,
  Clock,
} from "lucide-react";
import { userActivityData, type UserActivity } from "@/lib/mock-data";
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

function UserAvatar() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a5d23] text-xs font-medium text-white shrink-0">
      AV
    </div>
  );
}

function UserRow({ user }: { user: UserActivity }) {
  const [loginsExpanded, setLoginsExpanded] = useState(false);
  const [activitiesExpanded, setActivitiesExpanded] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <>
      <TableRow className="border-border hover:bg-muted/20">
        <TableCell>
          <div className="flex items-center gap-3">
            <UserAvatar />
            <span className="text-foreground">{user.anonymizedEmail}</span>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <button 
              onClick={() => setLoginsExpanded(!loginsExpanded)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                loginsExpanded && "rotate-90"
              )} />
              <span>{user.totalLogins} logins</span>
            </button>
            {loginsExpanded && (
              <div className="mt-2 ml-6 space-y-1 border-l border-border pl-3">
                {user.loginSessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex items-center justify-between text-sm text-muted-foreground py-1">
                    <span>{formatDate(session.timestamp)} at {formatTime(session.timestamp)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.duration}
                    </span>
                  </div>
                ))}
                {user.loginSessions.length > 5 && (
                  <p className="text-xs text-muted-foreground">
                    +{user.loginSessions.length - 5} more sessions
                  </p>
                )}
              </div>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div>
            <button 
              onClick={() => setActivitiesExpanded(!activitiesExpanded)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                activitiesExpanded && "rotate-90"
              )} />
              <span>{user.activitiesCompleted} modules</span>
            </button>
            {activitiesExpanded && (
              <div className="mt-2 ml-6 space-y-1 border-l border-border pl-3">
                {user.activities.map((activity) => (
                  <div key={activity.id} className="text-sm text-muted-foreground py-1">
                    <p className="text-foreground">{activity.name}</p>
                    <p className="text-xs">{activity.module} - {activity.attempts.length} attempt(s)</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNotificationOpen(true)}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

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
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground">User Activity</h3>
        <p className="text-sm text-muted-foreground">
          Track user logins, activity and detailed attempt data
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-normal">User</TableHead>
            <TableHead className="text-muted-foreground font-normal">Logins</TableHead>
            <TableHead className="text-muted-foreground font-normal">Activity</TableHead>
            <TableHead className="text-muted-foreground font-normal text-right">Actions</TableHead>
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
