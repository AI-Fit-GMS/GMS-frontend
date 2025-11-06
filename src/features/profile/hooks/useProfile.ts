import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfileApi, updateProfileApi, uploadAvatarApi, changePasswordApi, UpdateProfileData } from '../../../services/profileApis';
import { showToast } from '../../../redux/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/authSlice';

export const useProfile = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Get profile query
  const { data: profileData, isLoading, error, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileApi,
  });

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfileApi(data),
    onSuccess: (data) => {
      dispatch(setUser(data.data.profile as any));
      dispatch(showToast({ message: 'Profile updated successfully', type: 'success' }));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update profile';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Upload avatar mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatarApi(file),
    onSuccess: (data) => {
      dispatch(setUser(data.data.profile as any));
      dispatch(showToast({ message: 'Avatar updated successfully', type: 'success' }));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to upload avatar';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      changePasswordApi(currentPassword, newPassword),
    onSuccess: () => {
      dispatch(showToast({ message: 'Password changed successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to change password';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  return {
    profile: profileData?.data.profile,
    isLoading,
    error,
    refetch,
    updateProfile: updateMutation.mutate,
    uploadAvatar: uploadAvatarMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    isUpdating: updateMutation.isPending,
    isUploadingAvatar: uploadAvatarMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
  };
};

