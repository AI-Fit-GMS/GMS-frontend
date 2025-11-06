import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import { UserCog, Calendar, Users, TrendingUp, Clock, Award, LayoutDashboard } from 'lucide-react';

const ClientDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const quickActions = [
    {
      title: 'My Trainers',
      description: 'View and manage your trainers',
      icon: UserCog,
      link: ROUTES.TRAINERS,
      color: 'blue',
    },
    {
      title: 'My Classes',
      description: 'Browse and enroll in classes',
      icon: Calendar,
      link: ROUTES.CLASSES,
      color: 'green',
    },
    {
      title: 'Community',
      description: 'Connect with other members',
      icon: Users,
      link: '/community',
      color: 'purple',
    },
    {
      title: 'Progress',
      description: 'Track your fitness journey',
      icon: TrendingUp,
      link: '/progress',
      color: 'orange',
    },
  ];

  const recentActivities = [
    { type: 'class', message: 'Attended Yoga Class', time: '2 hours ago' },
    { type: 'trainer', message: 'Session with John Doe', time: '1 day ago' },
    { type: 'achievement', message: 'Completed 10 workouts this week', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Ready to continue your fitness journey? Let's get started!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600 border-blue-200',
              green: 'bg-green-50 text-green-600 border-green-200',
              purple: 'bg-purple-50 text-purple-600 border-purple-200',
              orange: 'bg-orange-50 text-orange-600 border-orange-200',
            };
            return (
              <Link
                key={index}
                to={action.link}
                className={`p-6 rounded-xl border-2 ${colorClasses[action.color as keyof typeof colorClasses]} hover-lift card-hover transition-all duration-200`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 rounded-lg bg-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                <p className="text-sm opacity-75">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Classes This Week</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">5</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Workout Streak</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">7 days</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">12</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

