"use client";

import { useState } from "react";
import { Sidebar, type SidebarPage } from "@/components/dashboard/sidebar";
import { Brandbar } from "@/components/dashboard/brandbar";
import { MissionControl } from "@/components/dashboard/mission-control";
import { WorkforceReadinessNetwork } from "@/components/dashboard/workforce-readiness-network";
import { ActionQueue } from "@/components/dashboard/action-queue";
import { UserProfilesTable } from "@/components/dashboard/user-profiles-table";
import { WorkforceStats } from "@/components/dashboard/workforce-stats";
import { SkillsMap } from "@/components/dashboard/skills-map";
import { DigitalCompetencePassport } from "@/components/dashboard/digital-competence-passport";
import { ReadinessRules } from "@/components/dashboard/readiness-rules";
import { AssurancePack } from "@/components/dashboard/assurance-pack";
import { CompetencyVerification } from "@/components/dashboard/competency-verification";
import { IntegrationsModal } from "@/components/dashboard/integrations-modal";
import { Programmes } from "@/components/dashboard/programmes";
import { Learning } from "@/components/dashboard/learning";
import { Timeline } from "@/components/dashboard/timeline";
import { Reports } from "@/components/dashboard/reports";
import { SupplierDiscovery } from "@/components/dashboard/supplier-discovery";
import { StakeholderAccess } from "@/components/dashboard/stakeholder-access";
import { Workforce } from "@/components/dashboard/workforce";
import { AccessGovernance } from "@/components/dashboard/access-governance";
import { ReadinessAssistant } from "@/components/dashboard/readiness-assistant";
import { TrainingModules } from "@/components/dashboard/training-modules";
import { WorkerReadinessProfile } from "@/components/dashboard/worker-readiness-profile";
import { SupplierReadinessProfile } from "@/components/dashboard/supplier-readiness-profile";
import { MobilisationMap } from "@/components/dashboard/mobilisation-map";
import { RoleReadiness } from "@/components/dashboard/role-readiness";
import { WorkforceReadinessSimple } from "@/components/dashboard/workforce-readiness-simple";
import { type UserProfile } from "@/lib/mock-data";

// Placeholder components for pages we haven't built yet
function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-xl font-semibold text-[#e8efe9] mb-2">{title}</h2>
      <p className="text-sm text-[#6e7a70] max-w-md">{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [activePage, setActivePage] = useState<SidebarPage>("overview");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // If viewing a user's DCP, show that instead
  if (selectedUser) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Brandbar />
          <main className="flex-1 overflow-y-auto p-6 relative z-[1]">
            <DigitalCompetencePassport user={selectedUser} onBack={() => setSelectedUser(null)} />
          </main>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "overview":
        return <MissionControl />;
      case "ecosystem":
        return <WorkforceReadinessNetwork />;
      case "programmes":
        return <Programmes />;
      case "mobilisation-map":
        return <MobilisationMap />;
      case "mobilisation-timeline":
        return <Timeline />;
      case "workforce-readiness":
        return <WorkforceReadinessSimple />;
      case "supplier-readiness":
        return <WorkforceReadinessNetwork />;
      case "supplier-discovery":
        return <SupplierDiscovery />;
      case "role-readiness":
        return <RoleReadiness />;
      case "safety-critical":
        return <CompetencyVerification />;
      case "evidence":
        return <CompetencyVerification />;
      case "interventions":
        return <ActionQueue />;
      case "learning":
        return <TrainingModules />;
      case "reports":
        return <Reports />;
      case "readiness-pack":
        return <AssurancePack />;
      case "readiness-assistant":
        return <ReadinessAssistant />;
      case "alerts":
        return <PlaceholderPage title="Alerts" description="Real-time notifications for expiring certifications, compliance risks, and intervention deadlines." />;
      case "integrations":
        return (
          <div className="max-w-4xl">
            <h1 className="text-2xl font-semibold text-[#e8efe9] mb-2">Integrations</h1>
            <p className="text-sm text-[#6e7a70] mb-6">Connect external systems, LMS platforms, and data sources.</p>
            <IntegrationsModal />
          </div>
        );
      case "readiness-rules":
        return <ReadinessRules />;
      case "stakeholder-access":
        return <StakeholderAccess />;
      case "access-governance":
        return <AccessGovernance />;
      default:
        return <MissionControl />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Brandbar />
        <main className="flex-1 overflow-y-auto p-6 relative z-[1]">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
