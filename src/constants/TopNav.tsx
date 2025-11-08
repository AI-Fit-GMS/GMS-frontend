import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Bell,
  Search,
  BadgeCheck,
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  LayoutDashboard,
} from 'lucide-react';
import { RootState } from '../redux/store';
import { ROUTES } from '../routes';
import { useAuth } from '../hooks/useAuth';

const TopNav = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const initials = useMemo(() => {
    if (!user) return 'AF';
    const first = user.firstName?.[0] ?? '';
    const last = user.lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase() || 'AF';
  }, [user]);

  const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  const profileActions = useMemo(() => {
    const actions = [
      {
        label: 'View profile',
        description: 'Personal details & preferences',
        icon: User,
        onSelect: () => navigate(ROUTES.PROFILE),
      },
      {
        label: 'Billing & invoices',
        description: 'Payment history & subscriptions',
        icon: CreditCard,
        onSelect: () => navigate(ROUTES.BILLING),
      },
    ];

    if (user?.role === 'admin') {
      actions.unshift({
        label: 'Go to admin suite',
        description: 'Manage members, plans & attendance',
        icon: LayoutDashboard,
        onSelect: () => navigate(ROUTES.ADMIN_DASHBOARD),
      });
    }

    return actions;
  }, [navigate, user?.role]);

  return (
    <header className="bg-white/95 border-b border-gray-100 shadow-sm backdrop-blur">
      <div className="px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search classes, trainers or plans..."
              className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-sm text-gray-700 shadow-inner focus:border-blue-500 focus:bg-white focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl border border-blue-100 bg-blue-50/60 text-sm text-blue-700">
            <BadgeCheck className="w-4 h-4 text-blue-500" />
            <span>{roleLabel} workspace</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {user?.role === 'admin' && (
            <Link
              to={ROUTES.ADMIN_DASHBOARD}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50/80 text-blue-600 text-sm font-semibold transition-all hover:bg-blue-100 hover:border-blue-300"
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
              Admin Command
            </Link>
          )}

          <button
            className="relative p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 inline-flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 transition-all hover:border-blue-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            >
              <div className="flex flex-col items-end leading-tight">
                <span className="text-sm font-semibold text-gray-800">
                  {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                </span>
                <span className="text-xs text-gray-500 capitalize">{user?.role || 'member'}</span>
              </div>
              <div className="relative">
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-sm font-semibold text-white shadow-inner">
                  {initials}
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${isMenuOpen ? 'rotate-180 text-blue-600' : ''}`}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 z-30 mt-3 w-72 rounded-2xl border border-gray-100 bg-white/95 shadow-2xl backdrop-blur">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-base font-semibold text-white shadow-inner">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role || 'member'}</p>
                    </div>
                  </div>
                  <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
                    Your AI-Fit insights update every morning at 6AM.
                  </p>
                </div>

                <div className="p-2">
                  {profileActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        onClick={() => {
                          setIsMenuOpen(false);
                          action.onSelect();
                        }}
                        className="w-full flex items-start gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-blue-50"
                      >
                        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-gray-800">{action.label}</span>
                          <span className="block text-xs text-gray-500">{action.description}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <LogOut className="w-4 h-4" />
                    </span>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;

