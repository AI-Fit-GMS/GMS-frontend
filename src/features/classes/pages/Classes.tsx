import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Calendar, Filter } from 'lucide-react';
import { useClasses } from '../hooks/useClasses';
import { useDebounce } from '../../../hooks/useDebounce';
import Button from '../../../commonComponents/buttons/Button';
import ClassTable from '../components/ClassTable';
import ClassScheduleCalendar from '../components/ClassScheduleCalendar';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { useClassSchedule } from '../hooks/useClasses';
import { format } from 'date-fns';

const Classes = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all' as const, type: 'all' as const });
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    classes,
    totalClasses,
    totalPages,
    currentPage,
    isLoading,
    deleteClass,
  } = useClasses({
    page,
    search: debouncedSearch,
    ...filters,
  });

  const { schedule } = useClassSchedule(format(selectedDate, 'yyyy-MM-dd'));

  if (isLoading && classes.length === 0 && viewMode === 'list') {
    return <LoadingSpinner fullScreen message="Loading classes..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t('sidebar.classes')}</h1>
          <p className="text-gray-600 mt-1">Manage fitness classes and schedules</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'calendar' ? 'primary' : 'outline'}
            onClick={() => setViewMode('calendar')}
            leftIcon={<Calendar className="w-4 h-4" />}
          >
            Calendar
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Add Class
          </Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <>
          {/* Actions Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4">
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
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="yoga">Yoga</option>
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="crossfit">CrossFit</option>
                  <option value="pilates">Pilates</option>
                </select>
                <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
                  More Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-600 text-sm">Total Classes</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalClasses}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {classes.filter((c) => c.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-600 text-sm">Today's Classes</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {schedule.length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-600 text-sm">Total Enrollment</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {classes.reduce((sum, c) => sum + c.enrolled, 0)}
              </p>
            </div>
          </div>

          {/* Classes Table */}
          <div className="bg-white rounded-xl shadow-sm">
            <ClassTable
              classes={classes}
              loading={isLoading}
              onDelete={deleteClass}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalClasses}
              onPageChange={setPage}
            />
          </div>
        </>
      ) : (
        <ClassScheduleCalendar
          schedule={schedule}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      )}
    </div>
  );
};

export default Classes;
