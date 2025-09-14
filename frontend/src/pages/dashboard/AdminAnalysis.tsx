import { useAdminAnalysisQuery } from "@/redux/features/admin/admin.api";
import { ChartAreaInteractive } from "../../components/modules/dashboard/InteractiveChartArea";
import { SectionCards } from "../../components/modules/dashboard/SectionCards";

export default function AdminAnalysis() {
  const { data: adminAnalysisData } = useAdminAnalysisQuery(null);

  return (
    <>
      <SectionCards
        totals={adminAnalysisData?.data.totals}
        today={adminAnalysisData?.data.today}
      />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive
          allDonorsBloodGroup={adminAnalysisData?.data.bloodGroups.users || []}
        />
      </div>
    </>
  );
}
