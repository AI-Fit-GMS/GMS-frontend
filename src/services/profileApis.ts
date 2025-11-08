import axiosInstance from './axiosInstance';
import { UserProfile, UpdateProfileData, ChangePasswordData, UpdatePreferencesData } from '../features/profile/types/profile.types';

export interface ProfileResponse {
  success: boolean;
  data: {
    user: UserProfile;
  };
  message: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  data: {
    user: UserProfile;
  };
  message: string;
}

// Get User Profile
export const getProfileApi = async (): Promise<ProfileResponse> => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      const token = localStorage.getItem('authToken');
      if (token && token.startsWith('mock-jwt-token-')) {
        const storedUser = localStorage.getItem('mockUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        const now = new Date().toISOString();

        const mockProfile: UserProfile = {
          id: parsedUser?.id || 'mock-user',
          firstName: parsedUser?.firstName || 'AI',
          lastName: parsedUser?.lastName || 'Fit',
          email: parsedUser?.email || 'member@ai-fit.com',
          phone: parsedUser?.phone || '+1234567890',
          dateOfBirth: '1990-01-01',
          gender: 'other',
          address: {
            street: '123 Innovation Way',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94107',
            country: 'USA',
          },
          avatar: parsedUser?.avatar,
          bio:
            parsedUser?.role === 'admin'
              ? 'AI-Fit admin overseeing member success and operational excellence.'
              : 'Dedicated AI-Fit member focused on consistent progress.',
          preferences: {
            emailNotifications: true,
            pushNotifications: true,
            smsNotifications: parsedUser?.role === 'admin',
            language: 'en',
            theme: 'auto',
          },
          createdAt: now,
          updatedAt: now,
        };

        return {
          success: true,
          data: {
            user: mockProfile,
          },
          message: 'Profile retrieved (mock)',
        };
      }
    }
    throw error;
  }
};

// Update User Profile
export const updateProfileApi = async (data: UpdateProfileData): Promise<UpdateProfileResponse> => {
  try {
    const response = await axiosInstance.put('/profile', data);
    return response.data;
  } catch (error: any) {
    // Mock response for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      const currentProfile = await getProfileApi();
      const updatedUser = {
        ...currentProfile.data.user,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        localStorage.setItem(
          'mockUser',
          JSON.stringify({
            ...parsed,
            firstName: updatedUser.firstName ?? parsed.firstName,
            lastName: updatedUser.lastName ?? parsed.lastName,
            phone: updatedUser.phone ?? parsed.phone,
          })
        );
      }

      return {
        success: true,
        data: {
          user: updatedUser,
        },
        message: 'Profile updated (mock)',
      };
    }
    throw error;
  }
};

// Change Password
export const changePasswordApi = async (data: ChangePasswordData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.post('/profile/change-password', data);
    return response.data;
  } catch (error: any) {
    // Mock response for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      return {
        success: true,
        message: 'Password changed successfully (mock)',
      };
    }
    throw error;
  }
};

// Update Preferences
export const updatePreferencesApi = async (data: UpdatePreferencesData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.put('/profile/preferences', data);
    return response.data;
  } catch (error: any) {
    // Mock response for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        localStorage.setItem(
          'mockUser',
          JSON.stringify({
            ...parsed,
            preferences: {
              ...parsed.preferences,
              ...data,
            },
          })
        );
      }

      return {
        success: true,
        message: 'Preferences updated (mock)',
      };
    }
    throw error;
  }
};

// Upload Avatar
export const uploadAvatarApi = async (file: File): Promise<{ success: boolean; data: { avatar: string }; message: string }> => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axiosInstance.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    // Mock response for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      const avatarUrl = URL.createObjectURL(file);

      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        localStorage.setItem(
          'mockUser',
          JSON.stringify({
            ...parsed,
            avatar: avatarUrl,
          })
        );
      }

      return {
        success: true,
        data: {
          avatar: avatarUrl,
        },
        message: 'Avatar uploaded (mock)',
      };
    }
    throw error;
  }
};

