import { Dumbbell, Timer, BarChart3, ClipboardList, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { useAdminStats } from '../hooks/useAdminStats';

const programBlueprints = [
  {
    id: 'TR-501',
    title: 'Hybrid Strength',
    focus: 'Strength & Conditioning',
    sessions: 24,
    adoption: 78,
    coachLead: 'Alex Morgan',
  },
  {
    id: 'TR-476',
    title: 'Mobility Reset',
    focus: 'Flexibility & Recovery',
    sessions: 18,
    adoption: 64,
    coachLead: 'Mia Johnson',
  },
  {
    id: 'TR-468',
    title: 'Metabolic Ignite',
    focus: 'Metabolic Conditioning',
    sessions: 20,
    adoption: 71,
    coachLead: 'Liam Patel',
  },
];

const upcomingAudits = [
  { program: 'Elite Coaching', focus: 'Performance Readiness', due: 'Today • 4:00 PM', owner: 'Coach Sarah' },
  { program: 'Hybrid Strength', focus: 'Load Progression', due: 'Tomorrow • 11:45 AM', owner: 'Coach Liam' },
  { program: 'Mobility Reset', focus: 'Session Flow', due: 'Friday • 9:30 AM', owner: 'Coach Mia' },
];

const AdminTrainingRegime = () => {
  const { data, isLoading } = useAdminStats();
  const stats = data?.data;

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading training regime..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Dumbbell className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Training Regime</h1>
            <p className="text-gray-600 mt-1">Curate sessions, monitor intensity, and maximize program impact.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Schedule Adherence',
            value: `${stats?.scheduleAdherence ?? 88}%`,
            icon: <Timer className="w-6 h-6 text-indigo-600" />,
            note: 'Members hitting planned sessions',
          },
          {
            title: 'Average Attendance',
            value: `${stats?.avgAttendance ?? 75}%`,
            icon: <BarChart3 className="w-6 h-6 text-green-600" />,
            note: 'Tracked across all classes',
          },
          {
            title: 'Active Programs',
            value: '14 live',
            icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
            note: 'Across trainers and cohorts',
          },
          {
            title: 'Goal Completion',
            value: '62%',
            icon: <Target className="w-6 h-6 text-rose-600" />,
            note: 'Members on target this month',
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              {card.icon}
              {card.note}
            </div>
            <p className="mt-4 text-sm text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Program Blueprints</h2>
            <p className="text-sm text-gray-500">Clone, customize, and launch curated sessions at scale.</p>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 shadow">
            Build New Program
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {programBlueprints.map((program) => (
            <div key={program.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 font-semibold flex items-center justify-center">
                  {program.sessions}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{program.title}</p>
                  <p className="text-xs text-gray-500">
                    {program.focus} • Lead coach: {program.coachLead} • ID {program.id}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600">
                  Adoption {program.adoption}%
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
                  <CheckCircle2 className="w-4 h-4" />
                  Ready
                </span>
                <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100">
                  Launch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Session Audits</h2>
          <p className="text-sm text-gray-500">Ensure coaching quality across every delivery.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-6">
          {upcomingAudits.map((audit) => (
            <div key={audit.program} className="rounded-xl border border-gray-200 bg-gray-50 p-4 hover:border-indigo-200 transition-colors">
              <p className="text-sm font-semibold text-gray-800">{audit.program}</p>
              <p className="text-xs text-gray-500 mt-1">{audit.focus}</p>
              <p className="text-xs text-gray-500 mt-2">{audit.due}</p>
              <p className="text-xs text-indigo-600 font-semibold mt-3 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                {audit.owner}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTrainingRegime;

