import { useQuery } from '@tanstack/react-query';
import { getAdminStatsApi, getRevenueAnalyticsApi, getMemberGrowthApi, getClassAttendanceApi } from '../../../services/adminApis';
import { Users, UserCog, Calendar, DollarSign, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import RevenueChart from '../../dashboard/components/RevenueChart';
import MemberGrowthChart from '../../dashboard/components/MemberGrowthChart';
import ClassAttendanceChart from '../../dashboard/components/ClassAttendanceChart';

const AdminDashboard = () => {

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStatsApi,
  });

  const { data: revenueData } = useQuery({
    queryKey: ['adminRevenue'],
    queryFn: () => getRevenueAnalyticsApi(),
  });

  const { data: memberGrowthData } = useQuery({
    queryKey: ['adminMemberGrowth'],
    queryFn: getMemberGrowthApi,
  });

  const { data: attendanceData } = useQuery({
    queryKey: ['adminAttendance'],
    queryFn: getClassAttendanceApi,
  });

  const stats = statsData?.data.stats;

  if (statsLoading) {
    return <LoadingSpinner fullScreen />;
  }

  const statCards = [
    {
      title: 'Total Members',
      value: stats?.totalMembers || 0,
      icon: Users,
      color: 'blue',
      change: `+${stats?.memberGrowth || 0}%`,
    },
    {
      title: 'Total Trainers',
      value: stats?.totalTrainers || 0,
      icon: UserCog,
      color: 'green',
    },
    {
      title: 'Total Classes',
      value: stats?.totalClasses || 0,
      icon: Calendar,
      color: 'purple',
    },
    {
      title: 'Monthly Revenue',
      value: `$${(stats?.monthlyRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'orange',
      change: `+${stats?.monthlyGrowth || 0}%`,
    },
    {
      title: 'Active Memberships',
      value: stats?.activeMemberships || 0,
      icon: Activity,
      color: 'indigo',
    },
    {
      title: 'Class Attendance',
      value: `${stats?.classAttendance || 0}%`,
      icon: TrendingUp,
      color: 'pink',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive overview of your gym management</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600',
            indigo: 'bg-indigo-50 text-indigo-600',
            pink: 'bg-pink-50 text-pink-600',
          };
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  {stat.change && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]} shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Revenue Analytics</h2>
          </div>
          <RevenueChart 
            data={revenueData?.data.revenue?.map(item => ({
              month: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
              revenue: item.revenue,
            })) || []} 
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold">Member Growth</h2>
          </div>
          <MemberGrowthChart 
            data={memberGrowthData?.data.growth?.map(item => ({
              month: item.month,
              members: item.totalMembers,
            })) || []} 
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Class Attendance</h2>
        </div>
        <ClassAttendanceChart data={attendanceData?.data.attendance || []} />
      </div>
    </div>
  );
};

export default AdminDashboard;

