import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Table, Column, Pagination } from '../../../commonComponents/table/Table';
import { Member } from '../types/member.types';
import { ROUTES, generateRoute } from '../../../routes';
import { formatDate } from '../../../utils/dateUtils';
import Button from '../../../commonComponents/buttons/Button';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface MemberTableProps {
  members: Member[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({
  members,
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
      case 'expired':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'suspended':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getMembershipTypeBadge = (type: string) => {
    const baseClasses = 'px-2 py-1 rounded text-xs font-medium';
    switch (type) {
      case 'vip':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'premium':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'basic':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const columns: Column<Member>[] = [
    {
      key: 'firstName',
      header: 'Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {row.firstName[0]}{row.lastName[0]}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {row.firstName} {row.lastName}
            </p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      sortable: true,
      render: (row) => <span className="text-gray-700">{row.phone}</span>,
    },
    {
      key: 'membership.type',
      header: 'Membership',
      sortable: true,
      render: (row) => (
        <span className={getMembershipTypeBadge(row.membership.type)}>
          {row.membership.type.toUpperCase()}
        </span>
      ),
    },
    {
      key: 'membership.status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={getStatusBadge(row.membership.status)}>
          {row.membership.status}
        </span>
      ),
    },
    {
      key: 'membership.endDate',
      header: 'Expires',
      sortable: true,
      render: (row) => (
        <span className="text-gray-700">{formatDate(row.membership.endDate)}</span>
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
              navigate(generateRoute(ROUTES.MEMBER_DETAIL, { id: row.id }));
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
              if (onDelete && window.confirm('Are you sure you want to delete this member?')) {
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
        data={members}
        columns={columns}
        loading={loading}
        onRowClick={(row) => navigate(generateRoute(ROUTES.MEMBER_DETAIL, { id: row.id }))}
        emptyMessage="No members found"
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

export default MemberTable;

