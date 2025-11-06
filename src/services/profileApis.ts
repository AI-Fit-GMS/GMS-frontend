import axiosInstance from './axiosInstance';
import { Profile, UpdateProfileData } from '../features/profile/types/profile.types';

export interface ProfileResponse {
  success: boolean;
  data: {
    profile: Profile;
  };
  message: string;
}

// Get user profile
export const getProfileApi = async (): Promise<ProfileResponse> => {
  const response = await axiosInstance.get('/profile');
  return response.data;
};

// Update user profile
export const updateProfileApi = async (data: UpdateProfileData): Promise<ProfileResponse> => {
  const response = await axiosInstance.put('/profile', data);
  return response.data;
};

// Upload avatar
export const uploadAvatarApi = async (file: File): Promise<ProfileResponse> => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await axiosInstance.post('/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Change password
export const changePasswordApi = async (currentPassword: string, newPassword: string) => {
  const response = await axiosInstance.post('/profile/change-password', {
    currentPassword,
    newPassword,
  });
  return response.data;
};

