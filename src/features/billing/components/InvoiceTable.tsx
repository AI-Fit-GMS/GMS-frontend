import { useTranslation } from 'react-i18next';
import { Table, Column, Pagination } from '../../../commonComponents/table/Table';
import { Invoice } from '../types/billing.types';
import { formatDate } from '../../../utils/dateUtils';
import { formatCurrency } from '../../../utils/formatters';
import Button from '../../../commonComponents/buttons/Button';
import { Eye, Download } from 'lucide-react';

interface InvoiceTableProps {
  invoices: Invoice[];
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  loading = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}) => {
  const { t } = useTranslation();

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded text-xs font-medium';
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'cancelled':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const columns: Column<Invoice>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      sortable: true,
      render: (row) => (
        <span className="font-medium text-gray-800">{row.invoiceNumber}</span>
      ),
    },
    {
      key: 'memberName',
      header: 'Member',
      sortable: true,
      render: (row) => (
        <span className="text-gray-700">{row.memberName}</span>
      ),
    },
    {
      key: 'total',
      header: 'Amount',
      sortable: true,
      render: (row) => (
        <span className="font-medium text-gray-800">{formatCurrency(row.total)}</span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (row) => (
        <span className="text-gray-700">{formatDate(row.dueDate)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={getStatusBadge(row.status)}>
          {row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('common.actions'),
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        data={invoices}
        columns={columns}
        loading={loading}
        emptyMessage="No invoices found"
      />
      {onPageChange && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={10}
          totalItems={totalItems}
        />
      )}
    </div>
  );
};

export default InvoiceTable;

