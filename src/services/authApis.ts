import axiosInstance from './axiosInstance';
import { User } from '../redux/slices/authSlice';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message: string;
}

// Login API
const MOCK_USERS = [
  {
    id: 'admin-001',
    email: 'admin@ai-fit.com',
    password: 'admin123',
    firstName: 'Avery',
    lastName: 'Admin',
    phone: '+1234567890',
    role: 'admin' as const,
  },
  {
    id: 'member-001',
    email: 'member@ai-fit.com',
    password: 'member123',
    firstName: 'Morgan',
    lastName: 'Member',
    phone: '+1098765432',
    role: 'member' as const,
  },
];

export const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const matchedMockUser = MOCK_USERS.find(
    (user) =>
      user.email.toLowerCase() === credentials.email.toLowerCase() &&
      user.password === credentials.password
  );

  if (matchedMockUser) {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const mockUserPayload = {
      id: matchedMockUser.id,
      firstName: matchedMockUser.firstName,
      lastName: matchedMockUser.lastName,
      email: matchedMockUser.email,
      phone: matchedMockUser.phone,
      role: matchedMockUser.role,
      avatar: undefined,
      emailVerified: true,
    };

    localStorage.setItem('mockUser', JSON.stringify(mockUserPayload));

    const timestamp = Date.now();

    return {
      success: true,
      data: {
        user: mockUserPayload,
        token: `mock-jwt-token-${matchedMockUser.role}-${timestamp}`,
        refreshToken: `mock-refresh-token-${matchedMockUser.role}-${timestamp}`,
      },
      message: 'Login successful (mock)',
    };
  }
  
  // Try real API call
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    // If API call fails, check if it's a network error (backend not available)
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      throw new Error(
        'Backend server is not available. Use admin@ai-fit.com / admin123 or member@ai-fit.com / member123 to continue testing.'
      );
    }
    throw error;
  }
};

// Signup API
export const signupApi = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  } catch (error: any) {
    // If API call fails, check if it's a network error (backend not available)
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      // Instant response for mock signup
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Return mock response for development
      const timestamp = Date.now();
      const mockUserPayload = {
        id: timestamp.toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        role: 'member' as const,
        avatar: undefined,
        emailVerified: false,
      };

      localStorage.setItem('mockUser', JSON.stringify(mockUserPayload));

      return {
        success: true,
        data: {
          user: mockUserPayload,
          token: 'mock-jwt-token-member-' + timestamp,
          refreshToken: 'mock-refresh-token-member-' + timestamp,
        },
        message: 'Signup successful (mock)',
      };
    }
    throw error;
  }
};

// Verify OTP
export const verifyOtpApi = async (email: string, otp: string) => {
  const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
  return response.data;
};

// Forgot Password
export const forgotPasswordApi = async (email: string) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset Password
export const resetPasswordApi = async (token: string, newPassword: string) => {
  const response = await axiosInstance.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

// Get Current User
export const getCurrentUserApi = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error: any) {
    // If API call fails, check if it's a network error (backend not available)
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      const token = localStorage.getItem('authToken');
      if (token && token.startsWith('mock-jwt-token-')) {
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
          return {
            success: true,
            data: {
              user: {
                ...JSON.parse(storedUser),
                emailVerified: true,
              },
            },
            message: 'User retrieved (mock)',
          };
        }
      }
    }
    throw error;
  }
};

// Logout
export const logoutApi = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    localStorage.removeItem('mockUser');
    return response.data;
  } catch (error: any) {
    // If API call fails, check if it's a network error (backend not available)
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      localStorage.removeItem('mockUser');
      return { success: true, message: 'Logged out successfully' };
    }
    throw error;
  }
};

// Google OAuth Login
export const googleLoginApi = async (accessToken: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/google', { accessToken });
  return response.data;
};

