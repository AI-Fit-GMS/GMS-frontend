import { useQuery } from '@tanstack/react-query';
import { getAdminStatsApi, getMemberGrowthApi, getClassAttendanceApi } from '../../../services/adminApis';
import { Users, UserCog, Calendar, TrendingUp, BarChart3, Users2, Activity } from 'lucide-react';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import MemberGrowthChart from '../../dashboard/components/MemberGrowthChart';
import ClassAttendanceChart from '../../dashboard/components/ClassAttendanceChart';

const AdminDashboard = () => {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStatsApi,
  });

  const { data: memberGrowthData } = useQuery({
    queryKey: ['adminMemberGrowth'],
    queryFn: getMemberGrowthApi,
  });

  const { data: attendanceData } = useQuery({
    queryKey: ['adminClassAttendance'],
    queryFn: getClassAttendanceApi,
  });

  const defaultStats = {
    totalMembers: 250,
    activeMembers: 210,
    inactiveMembers: 40,
    activeTrainers: 15,
    classesToday: 10,
    totalMemberships: 200,
    avgAttendance: 75,
    dietComplianceRate: 82,
    workoutComplianceRate: 76,
    avgSessionRating: 4.6,
    scheduleAdherence: 88,
  };

  const stats = statsData?.data || defaultStats;
  const activeMembers = stats.activeMembers ?? Math.round(stats.totalMembers * 0.8);
  const inactiveMembers = stats.inactiveMembers ?? Math.max(stats.totalMembers - activeMembers, 0);
  const activePercentage = stats.totalMembers ? Math.round((activeMembers / stats.totalMembers) * 100) : 0;

  if (statsLoading) {
    return <LoadingSpinner fullScreen message="Loading admin dashboard..." />;
  }

  const statCards = [
    { title: 'Total Members', value: stats.totalMembers, icon: Users, color: 'blue' },
    { title: 'Active Trainers', value: stats.activeTrainers, icon: UserCog, color: 'green' },
    { title: 'Classes Today', value: stats.classesToday, icon: Calendar, color: 'purple' },
    { title: 'Total Memberships', value: stats.totalMemberships, icon: Users2, color: 'indigo' },
    { title: 'Avg. Class Attendance', value: `${stats.avgAttendance}%`, icon: TrendingUp, color: 'pink' },
    { title: 'Session Rating', value: stats.avgSessionRating ? `${stats.avgSessionRating}/5` : '4.6/5', icon: Activity, color: 'orange' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Operations Command Center</h1>
            <p className="text-gray-600 mt-1">Monitor member engagement and program performance at a glance.</p>
          </div>
        </div>
      </div>

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
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]} shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Members Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Active Members</span>
                <span className="text-gray-800">{activeMembers}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${activePercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Approximately {activePercentage}% of members are active</p>
            </div>
            <div className="flex items-center justify-between text-sm font-medium text-gray-600">
              <span>Inactive Members</span>
              <span className="text-gray-800">{inactiveMembers}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium text-gray-600">
              <span>Total Memberships</span>
              <span className="text-gray-800">{stats.totalMemberships}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Diet & Workout Compliance</h2>
          <div className="space-y-4">
            {[
              { label: 'Diet Plan Compliance', value: stats.dietComplianceRate ?? 0, color: 'bg-blue-500' },
              { label: 'Workout Plan Compliance', value: stats.workoutComplianceRate ?? 0, color: 'bg-purple-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span className="text-gray-800">{item.value}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-500">Monitor compliance to ensure members stay on track with their health goals.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Class Attendance</h2>
        </div>
        <ClassAttendanceChart data={attendanceData?.data.attendance || []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: 'Schedule Reliability',
            description: 'Percentage of sessions starting on time across all programs.',
            value: `${stats.scheduleAdherence ?? defaultStats.scheduleAdherence}%`,
            tone: 'from-blue-500 to-indigo-500',
          },
          {
            title: 'Coaching Quality Index',
            description: 'Average post-session rating gathered from member feedback loops.',
            value: `${stats.avgSessionRating ?? defaultStats.avgSessionRating}/5`,
            tone: 'from-emerald-500 to-teal-500',
          },
        ].map((signal) => (
          <div key={signal.title} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className={`bg-gradient-to-br ${signal.tone} px-6 py-5 text-white`}>
              <h3 className="text-lg font-semibold">{signal.title}</h3>
              <p className="text-3xl font-bold mt-1">{signal.value}</p>
            </div>
            <p className="px-6 py-4 text-sm text-gray-600">{signal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
