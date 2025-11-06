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
export const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Mock authentication for development/testing when backend is not available
  const MOCK_EMAIL = 'test@example.com';
  const MOCK_PASSWORD = 'password123';
  
  // Check if using mock credentials
  if (credentials.email === MOCK_EMAIL && credentials.password === MOCK_PASSWORD) {
    // Instant response for mock authentication
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return mock response
    return {
      success: true,
      data: {
        user: {
          id: '1',
          firstName: 'Test',
          lastName: 'User',
          email: MOCK_EMAIL,
          phone: '+1234567890',
          role: 'admin',
          avatar: null,
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
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
      throw new Error('Backend server is not available. Please use mock credentials: test@example.com / password123');
    }
    throw error;
  }
};

// Signup API
export const signupApi = async (data: SignupData): Promise<AuthResponse> => {
  // Try real API call
  try {
    const response = await axiosInstance.post('/auth/signup', data);
    return response.data;
  } catch (error: any) {
    // If API call fails, check if it's a network error (backend not available)
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      // Instant response for mock signup
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Return mock response for development
      return {
        success: true,
        data: {
          user: {
            id: Date.now().toString(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            role: 'member',
            avatar: null,
            emailVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
        },
        message: 'Account created successfully (mock)',
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
    // If API call fails, return mock user if token exists
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      const token = localStorage.getItem('authToken');
      if (token && token.startsWith('mock-jwt-token-')) {
        // Return mock user data
        return {
          success: true,
          data: {
            user: {
              id: '1',
              firstName: 'Test',
              lastName: 'User',
              email: 'test@example.com',
              phone: '+1234567890',
              role: 'admin',
              avatar: null,
              emailVerified: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          },
        };
      }
    }
    throw error;
  }
};

// Logout
export const logoutApi = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error: any) {
    // If API call fails, still allow logout (for mock auth)
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
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

