import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { UserActivityTable } from "@/components/dashboard/user-activity-table";
import { AssessmentTable } from "@/components/dashboard/assessment-table";
import { LearningPathwayModal } from "@/components/dashboard/learning-pathway-modal";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6 space-y-6">
        {/* Stats */}
        <StatsCards />

        {/* User Activity Table */}
        <UserActivityTable />
        
        {/* Assessment Attempts Table */}
        <AssessmentTable />
      </main>
      
      {/* Learning Pathway Modal - floating button */}
      <div className="fixed bottom-6 right-6">
        <LearningPathwayModal />
      </div>
    </div>
  );
}
