import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Users, UserCog, Calendar, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { getDashboardStatsApi, getRevenueDataApi, getMemberGrowthApi, getClassAttendanceApi, getRecentActivitiesApi } from '../../../services/dashboardApis';
import RevenueChart from '../components/RevenueChart';
import MemberGrowthChart from '../components/MemberGrowthChart';
import ClassAttendanceChart from '../components/ClassAttendanceChart';
import RecentActivities from '../components/RecentActivities';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatters';

const Dashboard = () => {
  const { t } = useTranslation();

  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStatsApi,
  });

  const { data: revenueData } = useQuery({
    queryKey: ['dashboard', 'revenue'],
    queryFn: getRevenueDataApi,
  });

  const { data: memberGrowthData } = useQuery({
    queryKey: ['dashboard', 'member-growth'],
    queryFn: getMemberGrowthApi,
  });

  const { data: classAttendanceData } = useQuery({
    queryKey: ['dashboard', 'class-attendance'],
    queryFn: getClassAttendanceApi,
  });

  const { data: recentActivities } = useQuery({
    queryKey: ['dashboard', 'recent-activities'],
    queryFn: getRecentActivitiesApi,
  });

  // Default stats if API returns no data
  const defaultStats = {
    totalMembers: 156,
    activeTrainers: 12,
    classesToday: 8,
    monthlyRevenue: 12450,
    newMembersThisMonth: 24,
    revenueGrowth: 12.5,
  };

  const statsData = stats?.data || defaultStats;

  if (statsLoading) {
    return <LoadingSpinner fullScreen message="Loading dashboard..." />;
  }

  const statCards = [
    {
      icon: Users,
      label: 'Total Members',
      value: statsData.totalMembers || 156,
      change: `+${statsData.newMembersThisMonth || 24} this month`,
      color: 'bg-blue-500',
      trend: 'up',
    },
    {
      icon: UserCog,
      label: 'Active Trainers',
      value: statsData.activeTrainers || 12,
      change: 'All active',
      color: 'bg-green-500',
      trend: 'neutral',
    },
    {
      icon: Calendar,
      label: 'Classes Today',
      value: statsData.classesToday || 8,
      change: '3 more scheduled',
      color: 'bg-purple-500',
      trend: 'up',
    },
    {
      icon: DollarSign,
      label: 'Monthly Revenue',
      value: formatCurrency(statsData.monthlyRevenue || 12450),
      change: `${statsData.revenueGrowth || 12.5}% from last month`,
      color: 'bg-yellow-500',
      trend: 'up',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{t('sidebar.dashboard')}</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.trend === 'up' && (
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium">↑</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
            <select className="text-sm border border-gray-300 rounded px-3 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <RevenueChart data={revenueData?.data} />
        </div>

        {/* Member Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Member Growth</h2>
            <select className="text-sm border border-gray-300 rounded px-3 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <MemberGrowthChart data={memberGrowthData?.data} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Attendance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Class Attendance</h2>
          <ClassAttendanceChart data={classAttendanceData?.data} />
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activities
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
          <RecentActivities activities={recentActivities?.data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
