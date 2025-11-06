import { CalendarCheck, Users, Clock, AlertTriangle, MapPin, Eye } from 'lucide-react';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { useClassAttendance, useAdminStats } from '../hooks/useAdminStats';

const attendanceAlerts = [
  { className: 'Morning HIIT', status: 'Over capacity', detail: '29 / 25 attendees', severity: 'high' },
  { className: 'Yoga Foundations', status: 'Low engagement', detail: '11 / 25 attendees', severity: 'medium' },
  { className: 'Strength 101', status: 'Coach feedback pending', detail: 'Submit session review', severity: 'low' },
];

const locationBreakdown = [
  { location: 'Studio A', occupancy: 92 },
  { location: 'Studio B', occupancy: 78 },
  { location: 'Outdoor Arena', occupancy: 54 },
];

const AdminAttendance = () => {
  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: attendanceData, isLoading: attendanceLoading } = useClassAttendance();

  if (statsLoading || attendanceLoading) {
    return <LoadingSpinner fullScreen message="Loading attendance pulse..." />;
  }

  const stats = statsData?.data;
  const attendance = attendanceData?.data?.attendance ?? [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-50 rounded-lg">
            <CalendarCheck className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Attendance Pulse</h1>
            <p className="text-gray-600 mt-1">Stay ahead of capacity, waitlists, and underperforming classes.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Average Occupancy',
            value: `${stats?.avgAttendance ?? 75}%`,
            subtext: 'Across all scheduled sessions',
            icon: <Users className="w-6 h-6 text-purple-600" />,
          },
          {
            title: 'Waitlisted Members',
            value: '37 members',
            subtext: 'High demand classes today',
            icon: <Clock className="w-6 h-6 text-blue-600" />,
          },
          {
            title: 'Retention Risk',
            value: '5 classes',
            subtext: 'Flagged for poor attendance',
            icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              {card.icon}
              {card.subtext}
            </div>
            <p className="mt-4 text-sm text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Class-Level Insights</h2>
          <p className="text-sm text-gray-500">Monitor attendance vs capacity and coach for success.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {attendance.map((item) => {
            const fill = Math.min(Math.round((item.attendance / item.capacity) * 100), 100);
            return (
              <div key={item.classId} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800">{item.className}</p>
                  <p className="text-xs text-gray-500">
                    Attendance {item.attendance} / {item.capacity} • {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex-1 md:px-6">
                  <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full ${fill > 90 ? 'bg-rose-500' : fill > 70 ? 'bg-green-500' : 'bg-amber-400'}`}
                      style={{ width: `${fill}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {fill}% capacity • {fill > 90 ? 'Consider opening an extra slot' : fill < 60 ? 'Coach follow-up suggested' : 'Healthy demand'}
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100">
                  <Eye className="w-4 h-4" />
                  Session Report
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 lg:col-span-2">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Attention Required</h2>
            <p className="text-sm text-gray-500">Resolve over-capacity, under-booked, or pending feedback items.</p>
          </div>
          <div className="divide-y divide-gray-100">
            {attendanceAlerts.map((alert) => (
              <div key={alert.className} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800">{alert.className}</p>
                  <p className="text-xs text-gray-500">{alert.detail}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    alert.severity === 'high'
                      ? 'bg-rose-100 text-rose-700'
                      : alert.severity === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-sky-100 text-sky-700'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Location Utilization</h2>
            <p className="text-sm text-gray-500">Balance classes across training zones.</p>
          </div>
          <div className="px-6 py-6 space-y-4">
            {locationBreakdown.map((location) => (
              <div key={location.location}>
                <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    {location.location}
                  </span>
                  <span className="text-gray-800">{location.occupancy}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${location.occupancy}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;

