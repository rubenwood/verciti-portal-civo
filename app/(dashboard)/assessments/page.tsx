import { Header } from "@/components/dashboard/header";
import { AssessmentTable } from "@/components/dashboard/assessment-table";

export default function AssessmentsPage() {
  return (
    <div className="flex flex-col">
      <Header 
        title="Assessment Attempts" 
        subtitle="Review detailed assessment results and learner performance"
      />
      
      <div className="flex-1 p-6">
        <AssessmentTable />
      </div>
    </div>
  );
}
