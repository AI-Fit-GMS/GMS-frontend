import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Camera,
  Lock,
  Bell,
  Globe,
  Palette,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import Button from '../../../commonComponents/buttons/Button';
import { Input } from '../../../commonComponents/forms/Input';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import { showToast } from '../../../redux/slices/uiSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    profile,
    isLoading,
    updateProfile,
    isUpdating,
    changePassword,
    isChangingPassword,
    updatePreferences,
    isUpdatingPreferences,
    uploadAvatar,
    isUploadingAvatar,
  } = useProfile();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    bio: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferencesData, setPreferencesData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    language: 'en',
    theme: 'light' as 'light' | 'dark' | 'auto',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
        street: profile.address?.street || '',
        city: profile.address?.city || '',
        state: profile.address?.state || '',
        zipCode: profile.address?.zipCode || '',
        country: profile.address?.country || '',
        bio: profile.bio || '',
      });

      setPreferencesData({
        emailNotifications: profile.preferences?.emailNotifications ?? true,
        pushNotifications: profile.preferences?.pushNotifications ?? true,
        smsNotifications: profile.preferences?.smsNotifications ?? false,
        language: profile.preferences?.language || 'en',
        theme: profile.preferences?.theme || 'light',
      });
    }
  }, [profile]);

  const initials = useMemo(() => {
    const first = (profile?.firstName || user?.firstName || 'A')[0];
    const last = (profile?.lastName || user?.lastName || 'F')[0];
    return `${first}${last}`.toUpperCase();
  }, [profile, user]);

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPreferencesData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePreferenceSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setPreferencesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      uploadAvatar(event.target.files[0]);
    }
  };

  const handleSaveProfile = () => {
    updateProfile(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'male' | 'female' | 'other',
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        bio: formData.bio,
      },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      dispatch(showToast({ message: 'Please complete all password fields.', type: 'warning' }));
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      dispatch(showToast({ message: 'New password and confirmation do not match.', type: 'error' }));
      return;
    }

    changePassword(passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSavePreferences = () => {
    updatePreferences(preferencesData);
  };

  if (isLoading || !profile) {
    return <LoadingSpinner fullScreen message="Loading profile..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="rounded-3xl border border-gray-200 bg-white/95 p-8 shadow-xl backdrop-blur-sm transition-shadow hover:shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-4xl font-bold text-white shadow-lg">
              {initials}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-3 -right-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition hover:bg-blue-50"
            >
              {isUploadingAvatar ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={isUploadingAvatar}
              />
            </label>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h1>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                <ShieldCheck className="h-4 w-4" />
                {user?.role === 'admin' ? 'Administrator' : 'Member'}
              </span>
            </div>
            <p className="text-gray-500">{profile.bio || 'Share a bit about your fitness journey and goals.'}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                {profile.email}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-500" />
                {profile.phone || 'Add phone number'}
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Member since {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="font-semibold">
                Edit profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile} isLoading={isUpdating}>
                  {isUpdating ? 'Saving...' : 'Save changes'}
                </Button>
              </div>
            )}
            <Link to="#" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
              View public profile
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="rounded-3xl border border-gray-200 bg-white/95 shadow-xl backdrop-blur-sm">
        <div className="flex overflow-x-auto border-b border-gray-100">
          {[
            { id: 'profile', label: 'Profile details' },
            { id: 'security', label: 'Security' },
            { id: 'preferences', label: 'Preferences' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-1 items-center justify-center gap-2 px-6 py-4 text-sm font-semibold transition ${
                activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Input
                  label="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<User className="h-5 w-5" />}
                />
                <Input
                  label="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<User className="h-5 w-5" />}
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  leftIcon={<Mail className="h-5 w-5" />}
                />
                <Input
                  label="Phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<Phone className="h-5 w-5" />}
                />
                <Input
                  label="Date of birth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<Calendar className="h-5 w-5" />}
                />
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-50"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Input
                  label="Street"
                  name="street"
                  value={formData.street}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<MapPin className="h-5 w-5" />}
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<MapPin className="h-5 w-5" />}
                />
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<MapPin className="h-5 w-5" />}
                />
                <Input
                  label="Postal code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<MapPin className="h-5 w-5" />}
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  leftIcon={<MapPin className="h-5 w-5" />}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
                  placeholder="Share a short introduction or your current fitness focus."
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Password security</h3>
                <p className="text-sm text-gray-500">
                  Update your password regularly to keep your AI-Fit account safe.
                </p>
              </div>
              <Input
                label="Current password"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                leftIcon={<Lock className="h-5 w-5" />}
              />
              <Input
                label="New password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                leftIcon={<Lock className="h-5 w-5" />}
              />
              <Input
                label="Confirm new password"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                leftIcon={<Lock className="h-5 w-5" />}
              />
              <Button onClick={handleChangePassword} isLoading={isChangingPassword}>
                {isChangingPassword ? 'Updating...' : 'Update password'}
              </Button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-500">
                  Choose how you want AI-Fit to keep you informed about workouts, nutrition, and community updates.
                </p>

                {[
                  {
                    id: 'emailNotifications',
                    label: 'Email notifications',
                    description: 'Receive summaries, payment reminders, and weekly progress recaps.',
                  },
                  {
                    id: 'pushNotifications',
                    label: 'Push notifications',
                    description: 'Get real-time alerts for session changes and coach feedback.',
                  },
                  {
                    id: 'smsNotifications',
                    label: 'SMS notifications',
                    description: 'Enable urgent alerts for class waitlists and time-sensitive reminders.',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    htmlFor={item.id}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3 transition hover:border-blue-200"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <input
                      id={item.id}
                      name={item.id}
                      type="checkbox"
                      checked={preferencesData[item.id as keyof typeof preferencesData] as boolean}
                      onChange={handlePreferenceToggle}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Language</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-500" />
                    <select
                      name="language"
                      value={preferencesData.language}
                      onChange={handlePreferenceSelect}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Theme</label>
                  <div className="relative">
                    <Palette className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-500" />
                    <select
                      name="theme"
                      value={preferencesData.theme}
                      onChange={handlePreferenceSelect}
                      className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSavePreferences} isLoading={isUpdatingPreferences} leftIcon={<Bell className="h-5 w-5" />}>
                {isUpdatingPreferences ? 'Saving...' : 'Save preferences'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

