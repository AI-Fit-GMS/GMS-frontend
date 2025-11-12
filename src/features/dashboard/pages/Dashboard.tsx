import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Users, UserCog, Calendar, TrendingUp, Activity, Bell, MessageCircle, Heart, CheckCircle2, Package } from 'lucide-react';
import { getDashboardStatsApi, getMemberGrowthApi, getClassAttendanceApi, getRecentActivitiesApi } from '../../../services/dashboardApis';
import { MemberGrowthData } from '../../admin/types/admin.types';
import MemberGrowthChart from '../components/MemberGrowthChart';
import ClassAttendanceChart from '../components/ClassAttendanceChart';
import RecentActivities from '../components/RecentActivities';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { RootState } from '../../../redux/store';
import { ROUTES } from '../../../routes';
import ClientProgressChart from '../components/ClientProgressChart';
import EquipmentList from '../../equipment/components/EquipmentList';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStatsApi,
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

  if (user?.role === 'admin') {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
  }

  // Default stats if API returns no data
  const defaultStats = {
    totalMembers: 156,
    activeTrainers: 12,
    classesToday: 8,
    newMembersThisMonth: 24,
    wellnessStreak: 7,
    programsCompleted: 3,
  };

  const statsData = stats?.data || defaultStats;

  const progressData = [
    { week: 'Week 1', weight: 185, calories: 2400, attendance: 2 },
    { week: 'Week 2', weight: 182, calories: 2300, attendance: 3 },
    { week: 'Week 3', weight: 180, calories: 2200, attendance: 3 },
    { week: 'Week 4', weight: 178, calories: 2150, attendance: 4 },
    { week: 'Week 5', weight: 176, calories: 2100, attendance: 4 },
  ];

  const planNotifications = [
    { id: 1, title: 'Leg Day Session', description: 'Scheduled with Trainer Alex tomorrow at 7:00 AM' },
    { id: 2, title: 'Meal Plan Update', description: 'New high-protein meal plan added for this week' },
    { id: 3, title: 'Recovery Reminder', description: 'Remember to log your sleep hours for better tracking' },
  ];

  const paymentReminder = {
    dueDate: 'July 15, 2024',
    amount: '$129.00',
    status: 'Due in 3 days',
  };

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
      icon: Heart,
      label: 'Wellness Streak',
      value: `${statsData.wellnessStreak || 7} days`,
      change: 'Great consistency!',
      color: 'bg-pink-500',
      trend: 'up',
    },
    {
      icon: CheckCircle2,
      label: 'Programs Completed',
      value: statsData.programsCompleted || 3,
      change: 'Keep exploring new plans',
      color: 'bg-yellow-500',
      trend: 'neutral',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {user?.role === 'trainer' ? 'Trainer Headquarters' : t('sidebar.dashboard')}
        </h1>
        <p className="text-gray-600 mt-1">
          {user?.role === 'trainer'
            ? 'Manage your scheduled sessions and member performance.'
            : "Track your fitness journey, upcoming plans, and progress insights."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Find Trainers',
            description: 'Browse and connect with certified AI-Fit trainers.',
            icon: <UserCog className="w-6 h-6 text-blue-600" />,
            to: ROUTES.TRAINERS,
            color: 'bg-blue-50 text-blue-700',
          },
          {
            title: 'Explore Classes',
            description: 'View upcoming sessions and reserve your spot.',
            icon: <Calendar className="w-6 h-6 text-green-600" />,
            to: ROUTES.CLASSES,
            color: 'bg-green-50 text-green-700',
          },
          {
            title: 'Join Community',
            description: 'Share progress, get tips, and stay motivated.',
            icon: <MessageCircle className="w-6 h-6 text-purple-600" />,
            to: ROUTES.COMMUNITY,
            color: 'bg-purple-50 text-purple-700',
          },
        ].map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex gap-4"
          >
            <div className={`p-3 rounded-lg ${action.color.replace('text', 'border').replace('bg', 'border')} bg-white`}>
              {action.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{action.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{action.description}</p>
            </div>
          </Link>
        ))}
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

      {/* Client Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Progress Overview</h2>
            <select className="text-sm border border-gray-300 rounded px-3 py-1">
              <option>Last 5 weeks</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <ClientProgressChart data={progressData} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Plans</h2>
            </div>
            <div className="space-y-3">
              {planNotifications.map((plan) => (
                <div key={plan.id} className="border border-gray-100 rounded-lg p-3 hover:border-blue-200 transition-colors">
                  <p className="text-sm font-medium text-gray-800">{plan.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Available Equipment</h2>
            </div>
            <EquipmentList />
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-1">Payment Reminder</h2>
            <p className="text-sm text-blue-100 mb-4">Keep your membership active to retain access to all programs.</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Amount Due</span>
                <span className="font-semibold">{paymentReminder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Due Date</span>
                <span className="font-semibold">{paymentReminder.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-semibold text-yellow-200">{paymentReminder.status}</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-lg text-sm font-medium">
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Momentum Tracker */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Momentum Tracker</h2>
          <select className="text-sm border border-gray-300 rounded px-3 py-1">
            <option>Last 6 weeks</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <MemberGrowthChart
          data={
            memberGrowthData?.data?.growth?.map((item: MemberGrowthData) => ({
              month: item.month,
              members: item.totalMembers,
            })) || []
          }
        />
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
