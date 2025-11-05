import { useParams, useNavigate } from 'react-router-dom';
import { useClass } from '../hooks/useClasses';
import { formatCurrency } from '../../../utils/formatters';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import Button from '../../../commonComponents/buttons/Button';
import { ArrowLeft, Edit, Trash2, Users, Clock, MapPin, DollarSign } from 'lucide-react';
import { ROUTES } from '../../../routes';

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { class: classData, isLoading, error } = useClass(id || '');

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading class details..." />;
  }

  if (error || !classData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Class not found</p>
        <Button onClick={() => navigate(ROUTES.CLASSES)}>Back to Classes</Button>
      </div>
    );
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
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

  const getLevelBadge = (level: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (level) {
      case 'beginner':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'intermediate':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'advanced':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.CLASSES)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{classData.name}</h1>
            <p className="text-gray-600 mt-1">Class Details</p>
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
          {/* Class Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Class Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Description</p>
                <p className="text-gray-800">{classData.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <p className="font-medium text-gray-800 capitalize">{classData.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Level</p>
                  <span className={getLevelBadge(classData.level)}>
                    {classData.level}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={getStatusBadge(classData.status)}>
                    {classData.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="font-medium text-gray-800">{formatCurrency(classData.price)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Schedule
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">
                    {daysOfWeek[classData.schedule.dayOfWeek]}
                  </p>
                  <p className="text-sm text-gray-600">
                    {classData.schedule.startTime} - {classData.schedule.endTime}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  {classData.schedule.duration} minutes
                </div>
              </div>
            </div>
          </div>

          {/* Location & Equipment */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location & Equipment
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-medium text-gray-800">{classData.location}</p>
              </div>
              {classData.equipment.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Required Equipment</p>
                  <div className="flex flex-wrap gap-2">
                    {classData.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trainer Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Trainer</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {classData.trainer.name[0]}
              </div>
              <div>
                <p className="font-medium text-gray-800">{classData.trainer.name}</p>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Enrollment
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Enrolled</span>
                  <span className="font-semibold text-gray-800">
                    {classData.enrolled}/{classData.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(classData.enrolled / classData.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Spots</p>
                <p className="text-2xl font-bold text-green-600">{classData.available}</p>
              </div>
              <Button fullWidth className="mt-4">
                Enroll Member
              </Button>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing
            </h3>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">{formatCurrency(classData.price)}</p>
              <p className="text-sm text-gray-600 mt-1">Per session</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;

