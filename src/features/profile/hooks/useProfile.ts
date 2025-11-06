import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfileApi, updateProfileApi, changePasswordApi, updatePreferencesApi, uploadAvatarApi } from '../../../services/profileApis';
import { UpdateProfileData, ChangePasswordData, UpdatePreferencesData } from '../types/profile.types';
import { showToast } from '../../../redux/slices/uiSlice';
import { useDispatch } from 'react-redux';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileApi,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfileApi(data),
    onSuccess: (response) => {
      queryClient.setQueryData(['profile'], response);
      dispatch(showToast({ message: 'Profile updated successfully', type: 'success' }));
    },
    onError: (error: any) => {
      dispatch(showToast({ message: error.response?.data?.message || 'Failed to update profile', type: 'error' }));
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordData) => changePasswordApi(data),
    onSuccess: () => {
      dispatch(showToast({ message: 'Password changed successfully', type: 'success' }));
    },
    onError: (error: any) => {
      dispatch(showToast({ message: error.response?.data?.message || 'Failed to change password', type: 'error' }));
    },
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: UpdatePreferencesData) => updatePreferencesApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      dispatch(showToast({ message: 'Preferences updated successfully', type: 'success' }));
    },
    onError: (error: any) => {
      dispatch(showToast({ message: error.response?.data?.message || 'Failed to update preferences', type: 'error' }));
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatarApi(file),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      dispatch(showToast({ message: 'Avatar uploaded successfully', type: 'success' }));
    },
    onError: (error: any) => {
      dispatch(showToast({ message: error.response?.data?.message || 'Failed to upload avatar', type: 'error' }));
    },
  });

  const updateProfile = (data: UpdateProfileData, options?: { onSuccess?: () => void }) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        options?.onSuccess?.();
      },
    });
  };

  return {
    profile: data?.data.user,
    isLoading,
    error,
    updateProfile,
    changePassword: changePasswordMutation.mutate,
    updatePreferences: updatePreferencesMutation.mutate,
    uploadAvatar: uploadAvatarMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isUpdatingPreferences: updatePreferencesMutation.isPending,
    isUploadingAvatar: uploadAvatarMutation.isPending,
  };
};

