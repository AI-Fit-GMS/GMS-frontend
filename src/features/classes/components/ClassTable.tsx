import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Table, Column, Pagination } from '../../../commonComponents/table/Table';
import { Class } from '../types/class.types';
import { ROUTES, generateRoute } from '../../../routes';
import Button from '../../../commonComponents/buttons/Button';
import { Eye, Edit, Trash2, Users } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface ClassTableProps {
  classes: Class[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

const ClassTable: React.FC<ClassTableProps> = ({
  classes,
  loading = false,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded text-xs font-medium';
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'completed':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = 'px-2 py-1 rounded text-xs font-medium';
    switch (type) {
      case 'yoga':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'cardio':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'strength':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'crossfit':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const columns: Column<Class>[] = [
    {
      key: 'name',
      header: 'Class Name',
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-gray-800">{row.name}</p>
          <p className="text-sm text-gray-500">{row.description.substring(0, 50)}...</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      render: (row) => (
        <span className={getTypeBadge(row.type)}>
          {row.type.toUpperCase()}
        </span>
      ),
    },
    {
      key: 'trainer',
      header: 'Trainer',
      sortable: true,
      render: (row) => (
        <span className="text-gray-700">{row.trainer.name}</span>
      ),
    },
    {
      key: 'schedule',
      header: 'Schedule',
      render: (row) => (
        <div className="text-sm">
          <p className="text-gray-700">{daysOfWeek[row.schedule.dayOfWeek]}</p>
          <p className="text-gray-500">{row.schedule.startTime} - {row.schedule.endTime}</p>
        </div>
      ),
    },
    {
      key: 'capacity',
      header: 'Enrollment',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700">
            {row.enrolled}/{row.capacity}
          </span>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      render: (row) => (
        <span className="text-gray-700">{formatCurrency(row.price)}</span>
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
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              navigate(generateRoute(ROUTES.CLASS_DETAIL, { id: row.id }));
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Handle edit
            }}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete && window.confirm('Are you sure you want to delete this class?')) {
                onDelete(row.id);
              }
            }}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        data={classes}
        columns={columns}
        loading={loading}
        onRowClick={(row) => navigate(generateRoute(ROUTES.CLASS_DETAIL, { id: row.id }))}
        emptyMessage="No classes found"
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

export default ClassTable;

