import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Table, Column, Pagination } from '../../../commonComponents/table/Table';
import { Trainer } from '../types/trainer.types';
import { ROUTES, generateRoute } from '../../../routes';
import Button from '../../../commonComponents/buttons/Button';
import { Eye, Edit, Trash2, Star } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface TrainerTableProps {
  trainers: Trainer[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

const TrainerTable: React.FC<TrainerTableProps> = ({
  trainers,
  loading = false,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded text-xs font-medium';
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'on_leave':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const columns: Column<Trainer>[] = [
    {
      key: 'firstName',
      header: 'Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {row.firstName[0]}{row.lastName[0]}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {row.firstName} {row.lastName}
            </p>
            <p className="text-sm text-gray-500">{row.specialization.join(', ')}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'experience',
      header: 'Experience',
      sortable: true,
      render: (row) => (
        <span className="text-gray-700">{row.experience} years</span>
      ),
    },
    {
      key: 'hourlyRate',
      header: 'Rate',
      sortable: true,
      render: (row) => (
        <span className="text-gray-700">{formatCurrency(row.hourlyRate)}/hr</span>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-gray-700">{row.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={getStatusBadge(row.status)}>
          {row.status.replace('_', ' ')}
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
              navigate(generateRoute(ROUTES.TRAINER_DETAIL, { id: row.id }));
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
              if (onDelete && window.confirm('Are you sure you want to delete this trainer?')) {
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
        data={trainers}
        columns={columns}
        loading={loading}
        onRowClick={(row) => navigate(generateRoute(ROUTES.TRAINER_DETAIL, { id: row.id }))}
        emptyMessage="No trainers found"
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

export default TrainerTable;

