import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Plus,
  Search,
  UserCog,
  Clock4,
  Sparkles,
  Activity,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useTrainers } from '../hooks/useTrainers';
import { useDebounce } from '../../../hooks/useDebounce';
import Button from '../../../commonComponents/buttons/Button';
import TrainerTable from '../components/TrainerTable';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { Trainer } from '../types/trainer.types';
import { RootState } from '../../../redux/store';

const Trainers = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';

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
    status: 'all',
  });

  const dayLabels = useMemo(
    () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    []
  );

  const trainerCards = useMemo(() => {
    return trainers.slice(0, 8).map((trainer: Trainer) => {
      const nextAvailability = trainer.schedule
        .slice()
        .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
        .map((slot) => `${dayLabels[slot.dayOfWeek]} ${slot.startTime} - ${slot.endTime}`)
        .slice(0, 3);

      const signaturePrograms = trainer.signaturePrograms?.slice(0, 2) || [];

      return {
        trainer,
        nextAvailability,
        signaturePrograms,
      };
    });
  }, [dayLabels, trainers]);

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
              <p className="text-gray-600 mt-1">
                {isAdmin
                  ? 'Assign programs, review coaching schedules, and monitor trainer impact'
                  : 'Meet the coaching team shaping your personalised training journey'}
              </p>
            </div>
          </div>
          {isAdmin && (
            <Button 
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Trainer
            </Button>
          )}
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
            {trainers.filter((t: Trainer) => t.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow hover:-translate-y-1">
          <p className="text-gray-600 text-sm font-medium">On Leave</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {trainers.filter((t: Trainer) => t.status === 'on_leave').length}
          </p>
        </div>
      </div>

      {/* Trainer Spotlight Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Trainer Spotlight</h2>
            <p className="text-sm text-gray-500">
              Signature programs, nutrition philosophy, and upcoming availability.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-blue-600">
            <Sparkles className="w-4 h-4" />
            Updated live from training logs
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {trainerCards.map(({ trainer, nextAvailability, signaturePrograms }) => (
            <div
              key={trainer.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-gray-900">
                        {trainer.firstName} {trainer.lastName}
                      </p>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-sm text-gray-500">
                      {trainer.specialization.slice(0, 2).join(' • ')}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {trainer.rating.toFixed(2)} rating
                  </div>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Signature programs</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {signaturePrograms.map((program) => (
                      <li key={program.name}>
                        <span className="font-semibold text-gray-800">{program.name}</span>
                        <span className="block text-xs text-gray-500">
                          {program.focus} • {program.durationWeeks} weeks
                        </span>
                      </li>
                    ))}
                    {signaturePrograms.length === 0 && (
                      <li className="text-xs text-gray-500 italic">
                        Program library syncing with coach dashboard…
                      </li>
                    )}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-gray-200 p-3">
                    <p className="text-xs text-gray-500">Nutrition approach</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {trainer.nutritionApproach || 'Sync with coach'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-3">
                    <p className="text-xs text-gray-500">Focus areas</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {(trainer.focusAreas || trainer.specialization).slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-500">
                    <Clock4 className="w-4 h-4 text-gray-400" />
                    Upcoming availability
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    {nextAvailability.map((slot) => (
                      <li key={slot} className="flex items-center justify-between">
                        <span>{slot}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
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
