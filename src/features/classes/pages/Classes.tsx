import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Calendar, Filter } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useClasses } from '../hooks/useClasses';
import { useDebounce } from '../../../hooks/useDebounce';
import Button from '../../../commonComponents/buttons/Button';
import ClassTable from '../components/ClassTable';
import ClassScheduleCalendar from '../components/ClassScheduleCalendar';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { useClassSchedule } from '../hooks/useClasses';
import { format } from 'date-fns';
import { RootState } from '../../../redux/store';

const Classes = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all' as const, type: 'all' as const });
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';

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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{t('sidebar.classes')}</h1>
              <p className="text-gray-600 mt-1">
                {isAdmin
                  ? 'Manage programming, capacity, and instructor assignments'
                  : 'Discover classes curated for your goals and availability'}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
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
          {isAdmin && (
            <Button 
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Class
            </Button>
          )}
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <>
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
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
              <p className="text-gray-600 text-sm font-medium">Total Classes</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalClasses}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
              <p className="text-gray-600 text-sm font-medium">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {classes.filter((c: any) => c.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
              <p className="text-gray-600 text-sm font-medium">Today's Classes</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {schedule.length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
              <p className="text-gray-600 text-sm font-medium">Total Enrollment</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {classes.reduce((sum: number, c: any) => sum + (c.enrolled || 0), 0)}
              </p>
            </div>
          </div>

          {/* Classes Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
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
