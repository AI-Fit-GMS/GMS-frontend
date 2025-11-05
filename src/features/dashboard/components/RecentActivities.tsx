import { formatDistanceToNow } from 'date-fns';
import { UserPlus, UserMinus, DollarSign, Calendar } from 'lucide-react';

interface Activity {
  id: string;
  type: 'member_added' | 'member_removed' | 'payment' | 'class_scheduled';
  message: string;
  timestamp: string;
  user?: string;
}

interface RecentActivitiesProps {
  activities?: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities = [] }) => {
  // Default mock data
  const defaultActivities: Activity[] = [
    {
      id: '1',
      type: 'member_added',
      message: 'New member joined',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: 'John Doe',
    },
    {
      id: '2',
      type: 'payment',
      message: 'Payment received',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      user: '$150',
    },
    {
      id: '3',
      type: 'class_scheduled',
      message: 'New class scheduled',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      user: 'Yoga Class',
    },
    {
      id: '4',
      type: 'member_added',
      message: 'New member joined',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      user: 'Jane Smith',
    },
  ];

  const activitiesToShow = activities.length > 0 ? activities : defaultActivities;

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'member_added':
        return <UserPlus className="w-5 h-5 text-green-600" />;
      case 'member_removed':
        return <UserMinus className="w-5 h-5 text-red-600" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-blue-600" />;
      case 'class_scheduled':
        return <Calendar className="w-5 h-5 text-purple-600" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'member_added':
        return 'bg-green-50';
      case 'member_removed':
        return 'bg-red-50';
      case 'payment':
        return 'bg-blue-50';
      case 'class_scheduled':
        return 'bg-purple-50';
    }
  };

  return (
    <div className="space-y-3">
      {activitiesToShow.map((activity) => (
        <div
          key={activity.id}
          className={`flex items-start gap-3 p-3 rounded-lg ${getActivityColor(activity.type)}`}
        >
          <div className="mt-1">{getActivityIcon(activity.type)}</div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{activity.message}</p>
            <div className="flex items-center gap-2 mt-1">
              {activity.user && (
                <span className="text-xs text-gray-600">{activity.user}</span>
              )}
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivities;

