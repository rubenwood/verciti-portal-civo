"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityTable } from "@/components/dashboard/activity-table";
import { AssessmentTable } from "@/components/dashboard/assessment-table";
import { UserProfilesTable } from "@/components/dashboard/user-profiles-table";
import { WorkforceStats } from "@/components/dashboard/workforce-stats";
import { SkillsMap } from "@/components/dashboard/skills-map";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "workforce" | "skills-map">("analytics");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 space-y-6 p-6">
        {activeTab === "analytics" && (
          <>
            <div>
              <StatsCards />
            </div>
            <div className="space-y-6">
              <ActivityTable />
              <AssessmentTable />
            </div>
          </>
        )}
        {activeTab === "workforce" && (
          <>
            <WorkforceStats />
            <UserProfilesTable />
          </>
        )}
        {activeTab === "skills-map" && (
          <SkillsMap />
        )}
      </div>
    </div>
  );
}
