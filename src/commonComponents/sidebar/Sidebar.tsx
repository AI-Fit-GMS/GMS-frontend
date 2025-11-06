import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ROUTES } from '../../routes';
import {
  LayoutDashboard,
  UserCog,
  Calendar,
  DollarSign,
  LogOut,
  User,
  Share2,
  Sparkles,
  BadgeCheck,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
    { icon: UserCog, label: 'Trainers', path: ROUTES.TRAINERS },
    { icon: Calendar, label: 'Classes', path: ROUTES.CLASSES },
    { icon: Share2, label: 'Community', path: ROUTES.COMMUNITY },
    { icon: DollarSign, label: 'Billing', path: ROUTES.BILLING },
    { icon: User, label: 'Profile', path: ROUTES.PROFILE },
  ];

  const initials = `${(user?.firstName?.[0] || 'A').toUpperCase()}${(user?.lastName?.[0] || 'F').toUpperCase()}`;
  const roleName = user?.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : 'Member';
  const dashboardLink = ROUTES.DASHBOARD;

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/90 backdrop-blur border-r border-gray-200 shadow-xl">
      {/* Brand + User Card */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-br from-white via-white to-blue-50">
        <Link
          to={dashboardLink}
          className="flex items-center gap-3 text-gray-900"
          onClick={handleLinkClick}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold flex items-center justify-center shadow-md">
            AI
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight">AI-Fit</span>
            <p className="text-xs uppercase tracking-widest text-blue-500/80 font-semibold">Fitness Intelligence</p>
          </div>
        </Link>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-white/80 px-4 py-3 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </p>
            <p className="flex items-center gap-1 text-xs text-blue-600">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span className="capitalize">{roleName}</span>
            </p>
          </div>
          <Sparkles className="ml-auto hidden text-blue-500 lg:block" />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Experience Navigation
          </p>
          <div className="mt-3 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + '/');

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`
                    group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-medium transition-all
                    ${
                      isActive
                        ? 'border-blue-200 bg-gradient-to-r from-blue-50 via-white to-indigo-50 text-blue-700 shadow-sm'
                        : 'border-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-50 hover:text-blue-600'
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-lg transition-all
                      ${
                        isActive
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow'
                      }
                    `}
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6 space-y-4 border-t border-gray-200 bg-white/85">
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-white p-2 text-blue-600 shadow-sm">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Need support?</p>
              <p className="mt-1 text-xs text-gray-500">
                We're here to keep your AI-Fit journey on track.
              </p>
              <a
                href="mailto:support@ai-fit.com"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Contact support
                <Sparkles className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            handleLinkClick();
          }}
          className="flex items-center gap-3 w-full rounded-xl border border-red-100 bg-red-50/70 px-4 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-100 hover:border-red-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

