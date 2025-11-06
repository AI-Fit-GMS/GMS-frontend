import { Leaf, Flame, Clock, ChefHat, UtensilsCrossed, CheckCircle2, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { useAdminStats } from '../hooks/useAdminStats';

const complianceSnapshots = [
  {
    title: 'High Compliance',
    description: 'Members consistently logging meals and meeting macro targets.',
    percentage: 68,
    accent: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Moderate Compliance',
    description: 'Occasional deviations detected, coach follow-up recommended.',
    percentage: 22,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Needs Attention',
    description: 'Members skipping logs or falling below minimum thresholds.',
    percentage: 10,
    accent: 'from-rose-500 to-red-500',
  },
];

const mealPlanQueue = [
  { id: 'DP-401', member: 'Emily Carter', focus: 'High Protein', coach: 'Alex Morgan', status: 'pending' },
  { id: 'DP-389', member: 'Daniel Smith', focus: 'Weight Loss', coach: 'Sarah Chen', status: 'review' },
  { id: 'DP-377', member: 'Sophia Brown', focus: 'Recovery', coach: 'Mia Johnson', status: 'ready' },
];

const AdminDiet = () => {
  const { data, isLoading } = useAdminStats();
  const stats = data?.data;

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading nutrition intelligence..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-50 rounded-lg">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Nutrition Intelligence</h1>
            <p className="text-gray-600 mt-1">Optimize meal plans, compliance, and coach follow-ups in one view.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Diet Compliance',
            value: `${stats?.dietComplianceRate ?? 82}%`,
            icon: <UtensilsCrossed className="w-6 h-6 text-green-600" />,
            highlight: 'Great adherence this week',
          },
          {
            title: 'Average Prep Time',
            value: '18 mins',
            icon: <Clock className="w-6 h-6 text-blue-600" />,
            highlight: 'Members prefer quick recipes',
          },
          {
            title: 'Coach Reviews Due',
            value: '12 plans',
            icon: <ChefHat className="w-6 h-6 text-purple-600" />,
            highlight: 'Focus on elite members',
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600">
              {card.icon}
              {card.highlight}
            </div>
            <p className="mt-4 text-sm text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {complianceSnapshots.map((snapshot) => (
          <div key={snapshot.title} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className={`bg-gradient-to-br ${snapshot.accent} px-6 py-5 text-white`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{snapshot.title}</h3>
                <span className="text-2xl font-bold">{snapshot.percentage}%</span>
              </div>
            </div>
            <div className="px-6 py-5 text-sm text-gray-600">{snapshot.description}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Meal Plan Workflow</h2>
            <p className="text-sm text-gray-500">Coach approvals pending before members receive plan updates.</p>
          </div>
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 shadow">
            Launch Smart Plan
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {mealPlanQueue.map((plan) => (
            <div key={plan.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray-800">{plan.member}</p>
                <p className="text-xs text-gray-500">
                  {plan.focus} • Coach {plan.coach} • ID {plan.id}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600">
                  <Flame className="w-4 h-4" />
                  Macro-aligned
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold ${
                    plan.status === 'ready'
                      ? 'bg-green-100 text-green-700'
                      : plan.status === 'review'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-sky-100 text-sky-700'
                  }`}
                >
                  {plan.status === 'ready' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                </span>
                <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDiet;

