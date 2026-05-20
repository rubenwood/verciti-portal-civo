"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityTable } from "@/components/dashboard/activity-table";
import { AssessmentTable } from "@/components/dashboard/assessment-table";
import { UserProfilesTable } from "@/components/dashboard/user-profiles-table";
import { WorkforceStats } from "@/components/dashboard/workforce-stats";
import { SkillsMap } from "@/components/dashboard/skills-map";
import { DigitalCompetencePassport } from "@/components/dashboard/digital-competence-passport";
import { WorkforceReadinessNetwork } from "@/components/dashboard/workforce-readiness-network";
import { MissionControl } from "@/components/dashboard/mission-control";
import { ActionQueue } from "@/components/dashboard/action-queue";
import { type UserProfile } from "@/lib/mock-data";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"mission-control" | "supply-chain" | "action-queue" | "workforce" | "skills-map">("mission-control");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // Handle viewing a user's Digital Competence Passport
  const handleViewUserPassport = (user: UserProfile) => {
    setSelectedUser(user);
  };

  // Handle going back to the workforce list
  const handleBackToWorkforce = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setSelectedUser(null); // Clear selected user when changing tabs
      }} />
      <div className="flex-1 space-y-6 p-6">
        {activeTab === "mission-control" && (
          <MissionControl />
        )}
        {activeTab === "supply-chain" && (
          <WorkforceReadinessNetwork />
        )}
        {activeTab === "action-queue" && (
          <ActionQueue />
        )}
        {activeTab === "workforce" && (
          <>
            {selectedUser ? (
              <DigitalCompetencePassport 
                user={selectedUser} 
                onBack={handleBackToWorkforce} 
              />
            ) : (
              <>
                <WorkforceStats />
                <UserProfilesTable onViewUser={handleViewUserPassport} />
              </>
            )}
          </>
        )}
        {activeTab === "skills-map" && (
          <SkillsMap />
        )}
      </div>
    </div>
  );
}
