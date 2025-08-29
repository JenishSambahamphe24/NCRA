import { createFileRoute } from "@tanstack/react-router";
import { useDashboardData } from "@/hooks/useDashboardData";
import { StatCard } from "@/components/dashboard/stat-card";
import { MemberDistributionPieChart } from "@/components/dashboard/member-distribution-pie-chart";
import { RegistrationTrendBarChart } from "@/components/dashboard/registration-trend-bar-chart";
import { Building2, Users, CreditCard, Briefcase, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading dashboard data. Please try again.
      </div>
    );
  }

  const totalCooperatives = data?.totalCooperatives || 0;
  const totalMembers = data?.totalMembers || 0;
  const totalShares = data?.totalShares || 0;
  const totalShareAmount = data?.totalShareAmount || 0;
  const maleMembers = data?.maleMembers || 0;
  const femaleMembers = data?.femaleMembers || 0;
  const registrationTrend = data?.registrationTrend || [];

  const otherMembers =
    (totalMembers || 0) - (maleMembers || 0) - (femaleMembers || 0) || 0;

  const memberDistribution = [
    { name: "Male", value: maleMembers || 0, color: "#022B69" },
    { name: "Female", value: femaleMembers || 0, color: "#EC4899" },
    { name: "Others", value: otherMembers, color: "#10B981" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8`}
        >
          <StatCard
            icon={Building2}
            title="Total Cooperatives"
            value={totalCooperatives || 0}
            gradient="bg-primary from-blue-600 to-blue-800"
            iconBg="bg-primary bg-opacity-30"
          />

          <StatCard
            icon={Users}
            title="Total Members"
            value={totalMembers || 0}
            gradient="bg-gradient-to-br from-purple-600 to-purple-800"
            iconBg="bg-purple-500 bg-opacity-30"
          />

          <StatCard
            icon={Briefcase}
            title="Total Shares"
            value={totalShares || 0}
            gradient="bg-gradient-to-br from-emerald-600 to-emerald-800"
            iconBg="bg-emerald-500 bg-opacity-30"
          />

          <StatCard
            icon={CreditCard}
            title="Total Share Amount(NRs)"
            value={totalShareAmount || 0}
            gradient="bg-gradient-to-br from-orange-600 to-orange-800"
            iconBg="bg-orange-500 bg-opacity-30"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Member Distribution
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                {totalMembers} Total
              </div>
            </div>
            <MemberDistributionPieChart data={memberDistribution} />
          </div>
          {/* Growth Trend Bar Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900">
              Last 10 year Cooperative Registration Trend
            </h3>
            <RegistrationTrendBarChart
              data={
                registrationTrend?.map((item) => ({
                  year: item.year,
                  value: item.count,
                })) || []
              }
            />
          </div>
          {/* END Growth Trend Bar Chart */}
        </div>

        {/* Detailed Member Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Male Members */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-primary hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Male Members
                </h4>
                <p className="text-3xl font-bold text-primary mt-2">
                  {maleMembers || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors duration-200">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-full bg-gray-200 rounded-full h-3 mr-3 overflow-hidden">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${totalMembers > 0 ? ((maleMembers || 0) / totalMembers) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="font-medium">
                {totalMembers > 0
                  ? (((maleMembers || 0) / totalMembers) * 100).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>

          {/* Female Members */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-pink-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Female Members
                </h4>
                <p className="text-3xl font-bold text-pink-600 mt-2">
                  {femaleMembers || 0}
                </p>
              </div>
              <div className="bg-pink-100 p-3 rounded-full hover:bg-pink-200 transition-colors duration-200">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-full bg-gray-200 rounded-full h-3 mr-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${totalMembers > 0 ? ((femaleMembers || 0) / totalMembers) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="font-medium">
                {totalMembers > 0
                  ? (((femaleMembers || 0) / totalMembers) * 100).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>

          {/* Other Members */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-emerald-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Other Members
                </h4>
                <p className="text-3xl font-bold text-emerald-600 mt-2">
                  {otherMembers}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full hover:bg-emerald-200 transition-colors duration-200">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-full bg-gray-200 rounded-full h-3 mr-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${totalMembers > 0 ? (otherMembers / totalMembers) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="font-medium">
                {totalMembers > 0
                  ? ((otherMembers / totalMembers) * 100).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {(
                  ((totalShareAmount || 0) /
                    (totalMembers > 0 ? totalMembers : 1)) *
                  100
                ).toFixed(2)}
                %
              </div>
              <div className="text-sm text-gray-600">Average Assets/Member</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {totalCooperatives > 0
                  ? ((totalMembers || 0) / totalCooperatives).toFixed(0)
                  : 0}
              </div>
              <div className="text-sm text-gray-600">Avg Members/Coop</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                RS.
                {totalMembers > 0
                  ? ((totalShares || 0) / totalMembers).toFixed(2)
                  : 0}
              </div>
              <div className="text-sm text-gray-600">Avg Share/Member</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {totalMembers > 0
                  ? (((totalShareAmount || 0) / totalMembers) * 100).toFixed(1)
                  : 0}
                %
              </div>
              <div className="text-sm text-gray-600">
                Average Liability/Member
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
