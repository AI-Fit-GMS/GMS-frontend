import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Users,
  UtensilsCrossed,
  Dumbbell,
  CalendarCheck,
  Share2,
  ClipboardList,
  Award,
  Package,
} from 'lucide-react';
import { ROUTES } from '../../../routes';

const adminNavItems = [
  { icon: BarChart3, label: 'Overview', description: 'Command center snapshot', path: ROUTES.ADMIN_DASHBOARD },
  { icon: Users, label: 'Manage Members', description: 'Lifecycle & engagement', path: ROUTES.ADMIN_MANAGE_MEMBERS },
  { icon: UtensilsCrossed, label: 'Nutrition', description: 'Diet plans & compliance', path: ROUTES.ADMIN_DIET },
  { icon: Dumbbell, label: 'Training Regime', description: 'Programs & audits', path: ROUTES.ADMIN_TRAINING_REGIME },
  { icon: CalendarCheck, label: 'Attendance', description: 'Capacity & waitlists', path: ROUTES.ADMIN_ATTENDANCE },
  { icon: Share2, label: 'Referrals', description: 'Growth & rewards', path: ROUTES.ADMIN_REFERRALS },
  { icon: ClipboardList, label: 'Workshops', description: 'Events & registrations', path: ROUTES.ADMIN_WORKSHOP_REGISTRATIONS },
  { icon: Award, label: 'Assessments', description: 'Progress & evaluations', path: ROUTES.ADMIN_ASSESSMENT_RESULTS },
  { icon: Package, label: 'Equipment', description: 'Inventory & maintenance', path: ROUTES.ADMIN_EQUIPMENT },
];

const AdminSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-gray-200 bg-white/90 backdrop-blur">
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">AI-Fit Admin</p>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Control Hub</h1>
          <p className="text-xs text-gray-500">
            Manage operations, cohorts, and engagement signals from one portal.
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  'group flex flex-col gap-1 rounded-xl border px-4 py-3 transition-all',
                  isActive
                    ? 'border-blue-200 bg-blue-50/80 text-blue-700 shadow-sm'
                    : 'border-transparent bg-white text-gray-700 hover:border-blue-100 hover:bg-blue-50/60 hover:text-blue-600',
                ].join(' ')
              }
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white p-2 shadow-sm text-blue-600 group-hover:text-blue-700">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

