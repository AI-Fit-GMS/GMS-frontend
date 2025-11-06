import { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ROUTES } from '../../../routes';
import AdminSidebar from '../components/AdminSidebar';
import { Menu, X, ArrowLeft, Sparkles } from 'lucide-react';

const AdminLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (user?.role !== 'admin') {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-lg lg:hidden"
        aria-label="Toggle admin navigation"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        Menu
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
          <div className="flex flex-col gap-2 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
                <Sparkles className="w-4 h-4" />
                Admin Portal
              </p>
              <h1 className="text-2xl font-bold text-gray-900">AI-Fit Operations Studio</h1>
              <p className="text-sm text-gray-500">
                Curate programs, monitor compliance, and steer growth signals in real time.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
              <div className="text-sm text-gray-500">
                Signed in as{' '}
                <span className="font-semibold text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <Link
                to={ROUTES.DASHBOARD}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-blue-200 hover:text-blue-600"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to member view
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

