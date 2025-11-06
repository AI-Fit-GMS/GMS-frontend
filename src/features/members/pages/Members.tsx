import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Filter } from 'lucide-react';
import { useMembers } from '../hooks/useMembers';
import { useDebounce } from '../../../hooks/useDebounce';
import Button from '../../../commonComponents/buttons/Button';
import Modal from '../../../commonComponents/modals/Modal';
import MemberTable from '../components/MemberTable';
import MemberForm from '../components/MemberForm';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
// Remove this import as we'll use the form data directly

const Members = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all' as const });
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    members,
    totalMembers,
    totalPages,
    currentPage,
    isLoading,
    createMember,
    deleteMember,
    isCreating,
  } = useMembers({
    page,
    search: debouncedSearch,
    ...filters,
  });

  const handleCreateMember = (data: any) => {
    createMember(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  if (isLoading && members.length === 0) {
    return <LoadingSpinner fullScreen message="Loading members..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{t('sidebar.members')}</h1>
              <p className="text-gray-600 mt-1">Manage your gym members</p>
            </div>
          </div>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Member
          </Button>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Total Members</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalMembers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {members.filter((m) => m.membership.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Expired</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {members.filter((m) => m.membership.status === 'expired').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-600 text-sm">Suspended</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {members.filter((m) => m.membership.status === 'suspended').length}
          </p>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <MemberTable
          members={members}
          loading={isLoading}
          onDelete={deleteMember}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalMembers}
          onPageChange={setPage}
        />
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Member"
        size="lg"
      >
        <MemberForm
          onSubmit={handleCreateMember}
          isSubmitting={isCreating}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Members;
