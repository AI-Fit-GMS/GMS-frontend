import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, FileText, CreditCard, Users } from 'lucide-react';
import { useInvoices, usePayments, useSubscriptions, useBillingStats } from '../hooks/useBilling';
import InvoiceTable from '../components/InvoiceTable';
import { formatCurrency } from '../../../utils/formatters';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';

const Billing = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'subscriptions'>('invoices');
  const [page, setPage] = useState(1);

  const { invoices, totalInvoices, totalPages, isLoading: invoicesLoading } = useInvoices({ page });
  const { payments, isLoading: paymentsLoading } = usePayments({ page });
  const { subscriptions, isLoading: subscriptionsLoading } = useSubscriptions({ page });
  const { stats } = useBillingStats();

  const defaultStats = {
    totalRevenue: 124500,
    paidAmount: 98000,
    pendingAmount: 15000,
    overdueAmount: 11500,
  };

  const statsData = stats || defaultStats;

  const tabs = [
    { id: 'invoices' as const, label: 'Invoices', icon: FileText },
    { id: 'payments' as const, label: 'Payments', icon: CreditCard },
    { id: 'subscriptions' as const, label: 'Subscriptions', icon: Users },
  ];

  const isLoading = invoicesLoading || paymentsLoading || subscriptionsLoading;

  if (isLoading && invoices.length === 0) {
    return <LoadingSpinner fullScreen message="Loading billing data..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{t('sidebar.billing')}</h1>
        <p className="text-gray-600 mt-1">Manage invoices, payments, and subscriptions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {formatCurrency(statsData.totalRevenue || 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Paid</p>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(statsData.paidAmount || 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Pending</p>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
          <p className="text-3xl font-bold text-yellow-600">
            {formatCurrency(statsData.pendingAmount || 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Overdue</p>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <p className="text-3xl font-bold text-red-600">
            {formatCurrency(statsData.overdueAmount || 0)}
          </p>
        </div>
      </div>

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
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Invoice
                </button>
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
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Record Payment
                </button>
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
