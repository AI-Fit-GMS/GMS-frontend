import { Users, UserPlus, Filter, Search, BadgeCheck, Activity } from 'lucide-react';
import { useAdminStats } from '../hooks/useAdminStats';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { useMemo, useState } from 'react';

const mockMembers = [
  { id: 'M-201', name: 'Emily Carter', status: 'active', plan: 'Elite Coaching', coach: 'Alex Morgan', checkIns: 5 },
  { id: 'M-156', name: 'Michael Lee', status: 'active', plan: 'Strength Builder', coach: 'Sarah Chen', checkIns: 3 },
  { id: 'M-142', name: 'Sophia Brown', status: 'inactive', plan: 'Mobility Reset', coach: 'Alex Morgan', checkIns: 0 },
  { id: 'M-099', name: 'Daniel Smith', status: 'active', plan: 'Hybrid Performance', coach: 'Liam Patel', checkIns: 4 },
  { id: 'M-087', name: 'Isabella Martinez', status: 'paused', plan: 'Recovery Focus', coach: 'Mia Johnson', checkIns: 1 },
];

const AdminManageMembers = () => {
  const { data, isLoading } = useAdminStats();
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'paused'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = data?.data;

  const filteredMembers = useMemo(() => {
    return mockMembers.filter((member) => {
      const matchesStatus = filter === 'all' ? true : member.status === filter;
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filter, searchTerm]);

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading members overview..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Member Lifecycle</h1>
            <p className="text-gray-600 mt-1">Track onboarding, engagement, and retention signals in real time.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Active Members',
            value: stats?.activeMembers ?? 210,
            accent: 'bg-green-100 text-green-700',
            trend: '+8 this week',
          },
          {
            label: 'At-Risk Members',
            value: stats?.inactiveMembers ?? 40,
            accent: 'bg-amber-100 text-amber-700',
            trend: 'Improvements needed',
          },
          {
            label: 'Average Check-ins',
            value: '3.6 / week',
            accent: 'bg-blue-100 text-blue-700',
            trend: 'High engagement',
          },
          {
            label: 'Coaching Capacity',
            value: `${stats?.activeTrainers ?? 15} coaches`,
            accent: 'bg-purple-100 text-purple-700',
            trend: 'Balanced workload',
          },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-semibold ${card.accent}`}>
              <BadgeCheck className="w-4 h-4" />
              {card.trend}
            </div>
            <p className="mt-4 text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Member Directory</h2>
            <p className="text-sm text-gray-500">Deep dive into cohorts, coaches, and program touch points.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search member or ID..."
                className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
              {(['all', 'active', 'inactive', 'paused'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-all ${
                    filter === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow">
              <UserPlus className="w-4 h-4" />
              Add Member
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredMembers.map((member) => (
            <div key={member.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center">
                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{member.name}</p>
                  <p className="text-xs text-gray-500">ID: {member.id} • Coach: {member.coach}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 items-center text-sm">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : member.status === 'inactive'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600">
                  {member.plan}
                </span>
                <span className="text-gray-500">Weekly Check-ins: {member.checkIns}</span>
                <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100">
                  View Timeline
                </button>
              </div>
            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-gray-500">
              No members found matching your filters. Try a different search or reset filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManageMembers;

