"use client";

import { useState } from "react";
import { Header, type TabId } from "@/components/dashboard/header";
import { WorkforceStats } from "@/components/dashboard/workforce-stats";
import { UserProfilesTable } from "@/components/dashboard/user-profiles-table";
import { SkillsMap } from "@/components/dashboard/skills-map";
import { DigitalCompetencePassport } from "@/components/dashboard/digital-competence-passport";
import { WorkforceReadinessNetwork } from "@/components/dashboard/workforce-readiness-network";
import { MissionControl } from "@/components/dashboard/mission-control";
import { ActionQueue } from "@/components/dashboard/action-queue";
import { ReadinessRules } from "@/components/dashboard/readiness-rules";
import { AssurancePack } from "@/components/dashboard/assurance-pack";
import { CompetencyVerification } from "@/components/dashboard/competency-verification";
import { type UserProfile } from "@/lib/mock-data";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("mission-control");
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
        {activeTab === "readiness-rules" && (
          <ReadinessRules />
        )}
        {activeTab === "verification" && (
          <CompetencyVerification />
        )}
        {activeTab === "assurance" && (
          <AssurancePack />
        )}
        {activeTab === "skills-map" && (
          <SkillsMap />
        )}
      </div>
    </div>
  );
}
