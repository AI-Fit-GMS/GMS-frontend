import { useParams, useNavigate } from 'react-router-dom';
import { useMember } from '../hooks/useMembers';
import { formatDate } from '../../../utils/dateUtils';
import { formatPhoneNumber } from '../../../utils/formatters';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import Button from '../../../commonComponents/buttons/Button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { ROUTES, generateRoute } from '../../../routes';

const MemberDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { member, isLoading, error } = useMember(id || '');

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading member details..." />;
  }

  if (error || !member) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Member not found</p>
        <Button onClick={() => navigate(ROUTES.MEMBERS)}>Back to Members</Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(ROUTES.MEMBERS)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {member.firstName} {member.lastName}
            </h1>
            <p className="text-gray-600 mt-1">Member Details</p>
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
                <p className="font-medium text-gray-800">{member.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="font-medium text-gray-800">{member.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{member.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">{formatPhoneNumber(member.phone)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium text-gray-800">{formatDate(member.dateOfBirth)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-medium text-gray-800 capitalize">{member.gender}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Address</h2>
            <div className="space-y-2">
              <p className="text-gray-800">{member.address.street}</p>
              <p className="text-gray-800">
                {member.address.city}, {member.address.state} {member.address.zipCode}
              </p>
              <p className="text-gray-800">{member.address.country}</p>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Membership</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium text-gray-800 capitalize">{member.membership.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={getStatusBadge(member.membership.status)}>
                  {member.membership.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium text-gray-800">{formatDate(member.membership.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">End Date</p>
                <p className="font-medium text-gray-800">{formatDate(member.membership.endDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Auto Renew</p>
                <p className="font-medium text-gray-800">
                  {member.membership.autoRenew ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {member.firstName[0]}{member.lastName[0]}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {member.firstName} {member.lastName}
            </h3>
            <p className="text-gray-600 mt-1">{member.email}</p>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-800">{member.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">
                  {formatPhoneNumber(member.emergencyContact.phone)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Relationship</p>
                <p className="font-medium text-gray-800">{member.emergencyContact.relationship}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
