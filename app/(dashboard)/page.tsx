import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { UserActivityTable } from "@/components/dashboard/user-activity-table";
import { AssessmentTable } from "@/components/dashboard/assessment-table";
import { UserProfilesTable } from "@/components/dashboard/user-profiles-table";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 space-y-6 p-6">
        <div>
          <StatsCards />
        </div>
        <div className="space-y-6">
          <UserActivityTable />
          <UserProfilesTable />
          <AssessmentTable />
        </div>
      </div>
    </div>
  );
}
