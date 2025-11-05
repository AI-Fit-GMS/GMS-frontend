import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Member } from '../types/member.types';
import { Input } from '../../../commonComponents/forms/Input';
import { Select } from '../../../commonComponents/forms/Select';
import Button from '../../../commonComponents/buttons/Button';

const memberSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  membership: z.object({
    type: z.enum(['basic', 'premium', 'vip']),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    autoRenew: z.boolean(),
  }),
  emergencyContact: z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    relationship: z.string().min(1, 'Relationship is required'),
  }),
});

type MemberFormData = z.infer<typeof memberSchema>;

interface MemberFormProps {
  member?: Member;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({
  member,
  onSubmit,
  isSubmitting = false,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: member
      ? {
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          phone: member.phone,
          dateOfBirth: member.dateOfBirth,
          gender: member.gender,
          address: member.address,
          membership: member.membership,
          emergencyContact: member.emergencyContact,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label="Last Name"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Phone"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            label="Date of Birth"
            type="date"
            {...register('dateOfBirth')}
            error={errors.dateOfBirth?.message}
          />
          <Select
            label="Gender"
            {...register('gender')}
            error={errors.gender?.message}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
        <Input
          label="Street"
          {...register('address.street')}
          error={errors.address?.street?.message}
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            label="City"
            {...register('address.city')}
            error={errors.address?.city?.message}
          />
          <Input
            label="State"
            {...register('address.state')}
            error={errors.address?.state?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            label="Zip Code"
            {...register('address.zipCode')}
            error={errors.address?.zipCode?.message}
          />
          <Input
            label="Country"
            {...register('address.country')}
            error={errors.address?.country?.message}
          />
        </div>
      </div>

      {/* Membership */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Membership</h3>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Membership Type"
            {...register('membership.type')}
            error={errors.membership?.type?.message}
            options={[
              { value: 'basic', label: 'Basic' },
              { value: 'premium', label: 'Premium' },
              { value: 'vip', label: 'VIP' },
            ]}
          />
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              {...register('membership.autoRenew')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">Auto Renew</label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            label="Start Date"
            type="date"
            {...register('membership.startDate')}
            error={errors.membership?.startDate?.message}
          />
          <Input
            label="End Date"
            type="date"
            {...register('membership.endDate')}
            error={errors.membership?.endDate?.message}
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
        <Input
          label="Contact Name"
          {...register('emergencyContact.name')}
          error={errors.emergencyContact?.name?.message}
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            label="Contact Phone"
            type="tel"
            {...register('emergencyContact.phone')}
            error={errors.emergencyContact?.phone?.message}
          />
          <Input
            label="Relationship"
            {...register('emergencyContact.relationship')}
            error={errors.emergencyContact?.relationship?.message}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          {member ? 'Update Member' : 'Add Member'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default MemberForm;

