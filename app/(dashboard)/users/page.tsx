import { Header } from "@/components/dashboard/header";
import { UserActivityTable } from "@/components/dashboard/user-activity-table";

export default function UsersPage() {
  return (
    <div className="flex flex-col">
      <Header 
        title="User Activity" 
        subtitle="Track individual learner progress and engagement"
      />
      
      <div className="flex-1 p-6">
        <UserActivityTable />
      </div>
    </div>
  );
}
