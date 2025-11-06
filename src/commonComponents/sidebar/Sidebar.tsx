import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ROUTES } from '../../routes';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  DollarSign,
  LogOut,
  BarChart3,
  User,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { logout } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);

  // Admin menu items
  const adminMenuItems = [
    { icon: BarChart3, label: 'Analytics', path: ROUTES.ADMIN_ANALYTICS },
    { icon: Users, label: t('sidebar.members'), path: ROUTES.MEMBERS },
    { icon: UserCog, label: t('sidebar.trainers'), path: ROUTES.TRAINERS },
    { icon: Calendar, label: t('sidebar.classes'), path: ROUTES.CLASSES },
    { icon: DollarSign, label: t('sidebar.billing'), path: ROUTES.BILLING },
    { icon: User, label: 'Profile', path: ROUTES.PROFILE },
  ];

  // Client menu items
  const clientMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.CLIENT_DASHBOARD },
    { icon: UserCog, label: 'Trainers', path: ROUTES.TRAINERS },
    { icon: Calendar, label: 'Classes', path: ROUTES.CLASSES },
    { icon: MessageSquare, label: 'Community', path: ROUTES.COMMUNITY },
    { icon: User, label: 'Profile', path: ROUTES.PROFILE },
  ];

  // Determine menu items based on user role
  const menuItems = user?.role === 'admin' ? adminMenuItems : clientMenuItems;

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-lg">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200/50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI-Fit
        </h1>
        <p className="text-xs text-gray-500 mt-1">Fitness Management</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 hover:translate-x-1'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            logout();
            handleLinkClick();
          }}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

