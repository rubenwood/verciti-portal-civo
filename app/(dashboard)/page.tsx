import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { UserActivityTable } from "@/components/dashboard/user-activity-table";
import { AssessmentTable } from "@/components/dashboard/assessment-table";
import { LearningPathwayModal } from "@/components/dashboard/learning-pathway-modal";

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Header 
        title="Dashboard Overview" 
        subtitle="Monitor learner progress and engagement across all modules"
      />
      
      <div className="flex-1 space-y-6 p-6">
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Manage courses and learning pathways</p>
          </div>
          <LearningPathwayModal />
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Tables */}
        <div className="space-y-6">
          <UserActivityTable />
          <AssessmentTable />
        </div>
      </div>
    </div>
  );
}
