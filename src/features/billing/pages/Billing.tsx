import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DollarSign, FileText, CreditCard, Users, Calendar, TrendingUp, Wallet } from 'lucide-react';
import { format } from 'date-fns';
import { useInvoices, usePayments, useSubscriptions, useBillingStats } from '../hooks/useBilling';
import InvoiceTable from '../components/InvoiceTable';
import { formatCurrency } from '../../../utils/formatters';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { RootState } from '../../../redux/store';

const Billing = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'subscriptions'>('invoices');
  const [page, setPage] = useState(1);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';

  const { invoices, totalInvoices, totalPages, isLoading: invoicesLoading } = useInvoices({ page });
  const { payments, isLoading: paymentsLoading } = usePayments({ page });
  const { subscriptions, isLoading: subscriptionsLoading } = useSubscriptions({ page });
  const { stats } = useBillingStats();

  const defaultAdminStats = useMemo(
    () => ({
      totalRevenue: 124500,
      paidAmount: 98000,
      pendingAmount: 15000,
      overdueAmount: 11500,
      churnRate: 2.8,
    }),
    []
  );

  const defaultMemberStats = useMemo(
    () => ({
      nextDueDate: '2024-11-15',
      upcomingAmount: 89,
      planName: 'Hybrid Performance Plan',
      lastPaymentAmount: 89,
      lastPaymentDate: '2024-10-15',
      paymentMethod: 'Visa •••• 4242',
      sessionsRemaining: 3,
    }),
    []
  );

  const statsData = useMemo(() => {
    if (isAdmin) {
      return { ...defaultAdminStats, ...stats };
    }
    return { ...defaultMemberStats, ...stats };
  }, [defaultAdminStats, defaultMemberStats, isAdmin, stats]);

  const tabs = [
    { id: 'invoices' as const, label: 'Invoices', icon: FileText },
    { id: 'payments' as const, label: 'Payments', icon: CreditCard },
    { id: 'subscriptions' as const, label: 'Subscriptions', icon: Users },
  ];

  const isLoading = invoicesLoading || paymentsLoading || subscriptionsLoading;
  const formattedNextDueDate = statsData.nextDueDate
    ? format(new Date(statsData.nextDueDate), 'MMMM d, yyyy')
    : 'Not scheduled';
  const formattedLastPaymentDate = statsData.lastPaymentDate
    ? format(new Date(statsData.lastPaymentDate), 'MMMM d, yyyy')
    : 'Not available';

  if (isLoading && invoices.length === 0) {
    return <LoadingSpinner fullScreen message="Loading billing data..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{t('sidebar.billing')}</h1>
        <p className="text-gray-600 mt-1">
          {isAdmin
            ? 'Monitor billing health across the organisation'
            : 'Keep track of your membership payments and invoices'}
        </p>
      </div>

      {/* Stats Cards */}
      {isAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {formatCurrency(statsData.totalRevenue || 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Includes all membership and add-on plans
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Paid</p>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(statsData.paidAmount || 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Collected in the last 30 days</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Pending</p>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {formatCurrency(statsData.pendingAmount || 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Awaiting clearance</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Overdue</p>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-bold text-red-600">
              {formatCurrency(statsData.overdueAmount || 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Follow up with members today</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm">Next payment</p>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-lg text-gray-500">{formattedNextDueDate}</p>
            <p className="text-2xl font-semibold text-gray-800">
              {formatCurrency(statsData.upcomingAmount || 0)}
            </p>
            <p className="mt-2 rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              {statsData.planName}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm">Last payment</p>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-lg text-gray-500">{formattedLastPaymentDate}</p>
            <p className="text-2xl font-semibold text-emerald-600">
              {formatCurrency(statsData.lastPaymentAmount || 0)}
            </p>
            <p className="mt-2 text-xs text-gray-500">{statsData.paymentMethod}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm">Sessions remaining</p>
              <Wallet className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-4xl font-semibold text-purple-600">
              {statsData.sessionsRemaining ?? 0}
            </p>
            <p className="mt-2 text-xs text-gray-500">Book ahead to keep your streak alive</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-md p-6 text-white">
            <p className="text-sm opacity-80">Membership status</p>
            <p className="text-2xl font-semibold mt-2">Active</p>
            <p className="text-xs opacity-80 mt-3">
              You’re on track. Need to pause or upgrade? Reach out to your coach.
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
                    ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'invoices' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Invoices</h2>
                {isAdmin ? (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create Invoice
                  </button>
                ) : (
                  <button className="px-4 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50">
                    Download statement
                  </button>
                )}
              </div>
              <InvoiceTable
                invoices={invoices}
                loading={invoicesLoading}
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalInvoices}
                onPageChange={setPage}
              />
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Payments</h2>
                {isAdmin ? (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Record Payment
                  </button>
                ) : (
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Auto-pay active
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-center py-8">
                Payment table will be implemented here. This is a placeholder.
              </p>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Subscriptions</h2>
              </div>
              <p className="text-gray-500 text-center py-8">
                Subscriptions table will be implemented here. This is a placeholder.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
