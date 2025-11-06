import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, UserCog } from 'lucide-react';
import { useTrainers } from '../hooks/useTrainers';
import { useDebounce } from '../../../hooks/useDebounce';
import Button from '../../../commonComponents/buttons/Button';
import TrainerTable from '../components/TrainerTable';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';

const Trainers = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all' as const });
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    trainers,
    totalTrainers,
    totalPages,
    currentPage,
    isLoading,
    deleteTrainer,
  } = useTrainers({
    page,
    search: debouncedSearch,
    ...filters,
  });

  if (isLoading && trainers.length === 0) {
    return <LoadingSpinner fullScreen message="Loading trainers..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserCog className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{t('sidebar.trainers')}</h1>
              <p className="text-gray-600 mt-1">Manage your gym trainers</p>
            </div>
          </div>
          <Button 
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Trainer
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
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
          <p className="text-gray-600 text-sm font-medium">Total Trainers</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalTrainers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
          <p className="text-gray-600 text-sm font-medium">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {trainers.filter((t: any) => t.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
          <p className="text-gray-600 text-sm font-medium">On Leave</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {trainers.filter((t: any) => t.status === 'on_leave').length}
          </p>
        </div>
      </div>

      {/* Trainers Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <TrainerTable
          trainers={trainers}
          loading={isLoading}
          onDelete={deleteTrainer}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalTrainers}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Trainers;
