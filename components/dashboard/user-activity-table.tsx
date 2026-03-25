"use client";

// UserActivityTable - uses native HTML table elements only (no shadcn Table)
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bell, Clock, Layers } from "lucide-react";
import { userActivityData, type UserActivity, type Activity } from "@/lib/mock-data";
import { NotificationDialog } from "./notification-dialog";
import { cn, anonymizeEmail, getAvatarInitials } from "@/lib/utils";

function formatLoginString(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAttemptDate(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function UserAvatar({ email }: { email: string }) {
  const initials = getAvatarInitials(email);
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a5d23] text-xs font-medium text-white shrink-0 uppercase">
      {initials}
    </div>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  const [expanded, setExpanded] = useState(false);
  const [expandedAttempts, setExpandedAttempts] = useState<Record<string, boolean>>({});

  const toggleAttempt = (attemptId: string) => {
    setExpandedAttempts((prev) => ({
      ...prev,
      [attemptId]: !prev[attemptId],
    }));
  };

  return (
    <div className="bg-secondary/50 rounded-md">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-secondary/70 transition-colors rounded-md"
      >
        <span className="text-sm text-foreground">{activity.name}</span>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{activity.attempts.length} attempt{activity.attempts.length !== 1 ? "s" : ""}</span>
          <ChevronRight
            className={cn(
              "h-3 w-3 transition-transform",
              expanded && "rotate-90"
            )}
          />
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          {activity.attempts.map((attempt, attemptIndex) => (
            <div key={attempt.id} className="bg-background rounded-md">
              <button
                onClick={() => toggleAttempt(attempt.id)}
                className="w-full flex items-center justify-between p-2 hover:bg-muted/50 transition-colors rounded-md"
              >
                <span className="flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Attempt {attemptIndex + 1}:</span>
                  <span className="text-foreground">{formatAttemptDate(attempt.timestamp)}</span>
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Layers className="h-3 w-3" />
                  <span>{attempt.stages.length} stage{attempt.stages.length !== 1 ? "s" : ""}</span>
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 transition-transform",
                      expandedAttempts[attempt.id] && "rotate-90"
                    )}
                  />
                </span>
              </button>

              {expandedAttempts[attempt.id] && (
                <div className="px-2 pb-2 space-y-1">
                  {attempt.stages.map((stage, stageIndex) => (
                    <div
                      key={stage.id}
                      className="flex items-center justify-between bg-muted/30 rounded px-3 py-2 text-xs"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-medium text-primary">
                          {stageIndex + 1}
                        </span>
                        <span className="text-foreground">{stage.name}</span>
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {stage.duration}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserRow({ 
  user, 
  onNotify 
}: { 
  user: UserActivity;
  onNotify: (user: UserActivity) => void;
}) {
  const [loginsExpanded, setLoginsExpanded] = useState(false);
  const [activitiesExpanded, setActivitiesExpanded] = useState(false);
  const displayEmail = anonymizeEmail(user.anonymizedEmail);

  return (
    <tr className="border-b border-border hover:bg-muted/20 transition-colors">
      <td className="p-2 align-top">
        <div className="flex items-center gap-3">
          <UserAvatar email={user.anonymizedEmail} />
          <span className="text-foreground">{displayEmail}</span>
        </div>
      </td>
      <td className="p-2 align-top">
        <div>
          <button
            onClick={() => setLoginsExpanded(!loginsExpanded)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                loginsExpanded && "rotate-90"
              )}
            />
            <span>{user.totalLogins} logins</span>
          </button>
          {loginsExpanded && (
            <div className="mt-3 ml-6 space-y-2">
              {user.loginSessions.slice(0, 5).map((session) => (
                <div key={session.id} className="bg-secondary/50 rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <span className="flex text-xs font-light gap-1 text-muted-foreground">
                      <Clock className="size-3" />
                      {formatLoginString(session.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              {user.loginSessions.length > 5 && (
                <p className="text-xs text-muted-foreground pl-1">
                  +{user.loginSessions.length - 5} more sessions
                </p>
              )}
            </div>
          )}
        </div>
      </td>
      <td className="p-2 align-top">
        <div>
          <button
            onClick={() => setActivitiesExpanded(!activitiesExpanded)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                activitiesExpanded && "rotate-90"
              )}
            />
            <span>{user.activitiesCompleted} modules</span>
          </button>
          {activitiesExpanded && (
            <div className="mt-3 ml-6 space-y-2">
              {user.activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </td>
      <td className="p-2 align-top text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNotify(user)}
          className="text-muted-foreground hover:text-foreground h-8 w-8"
        >
          <Bell className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}

export function UserActivityTable() {
  const [notificationUser, setNotificationUser] = useState<UserActivity | null>(null);

  return (
    <section id="user-activity-table">
      <div className="rounded-lg border border-border bg-card">
        <div className="p-4">
          <h3 className="text-base font-semibold text-foreground">User Activity</h3>
          <p className="text-sm text-muted-foreground">
            Track user logins, activity and detailed attempt data
          </p>
        </div>
        <div className="relative w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-muted-foreground h-10 px-2 text-left align-middle font-normal">User</th>
                <th className="text-muted-foreground h-10 px-2 text-left align-middle font-normal">Logins</th>
                <th className="text-muted-foreground h-10 px-2 text-left align-middle font-normal">Activity</th>
                <th className="text-muted-foreground h-10 px-2 text-right align-middle font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userActivityData.map((user) => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  onNotify={setNotificationUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {notificationUser && (
        <NotificationDialog
          open={!!notificationUser}
          onOpenChange={(open) => !open && setNotificationUser(null)}
          userName={notificationUser.anonymizedName}
          userEmail={notificationUser.anonymizedEmail}
          userId={notificationUser.userId}
        />
      )}
    </section>
  );
}
