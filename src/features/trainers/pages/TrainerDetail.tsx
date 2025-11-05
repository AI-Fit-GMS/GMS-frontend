import { useParams, useNavigate } from 'react-router-dom';
import { useTrainer } from '../hooks/useTrainers';
import { formatCurrency } from '../../../utils/formatters';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import Button from '../../../commonComponents/buttons/Button';
import { ArrowLeft, Edit, Trash2, Star, Calendar, Users } from 'lucide-react';
import { ROUTES } from '../../../routes';

const TrainerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trainer, isLoading, error } = useTrainer(id || '');

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading trainer details..." />;
  }

  if (error || !trainer) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Trainer not found</p>
        <Button onClick={() => navigate(ROUTES.TRAINERS)}>Back to Trainers</Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
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

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.TRAINERS)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {trainer.firstName} {trainer.lastName}
            </h1>
            <p className="text-gray-600 mt-1">Trainer Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Edit className="w-4 h-4" />}>
            Edit
          </Button>
          <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">First Name</p>
                <p className="font-medium text-gray-800">{trainer.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="font-medium text-gray-800">{trainer.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{trainer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">{trainer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-medium text-gray-800">{trainer.experience} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hourly Rate</p>
                <p className="font-medium text-gray-800">{formatCurrency(trainer.hourlyRate)}/hr</p>
              </div>
            </div>
          </div>

          {/* Specialization */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Specialization</h2>
            <div className="flex flex-wrap gap-2">
              {trainer.specialization.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {trainer.certifications.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Certifications</h2>
              <ul className="list-disc list-inside space-y-2">
                {trainer.certifications.map((cert, index) => (
                  <li key={index} className="text-gray-700">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Schedule */}
          {trainer.schedule.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule
              </h2>
              <div className="space-y-2">
                {trainer.schedule.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-800">
                      {daysOfWeek[slot.dayOfWeek]}
                    </span>
                    <span className="text-gray-600">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {trainer.bio && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Bio</h2>
              <p className="text-gray-700">{trainer.bio}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {trainer.firstName[0]}{trainer.lastName[0]}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {trainer.firstName} {trainer.lastName}
            </h3>
            <p className="text-gray-600 mt-1">{trainer.email}</p>
            <div className="mt-4">
              <span className={getStatusBadge(trainer.status)}>
                {trainer.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-600">Rating</span>
                </div>
                <span className="font-semibold text-gray-800">{trainer.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">Total Classes</span>
                </div>
                <span className="font-semibold text-gray-800">{trainer.totalClasses}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Total Members</span>
                </div>
                <span className="font-semibold text-gray-800">{trainer.totalMembers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;

