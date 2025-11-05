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
  // TODO: Replace with actual API call
  // For now, using mock response for development
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

// Signup API
export const signupApi = async (data: SignupData): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/signup', data);
  return response.data;
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
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

// Logout
export const logoutApi = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

// Google OAuth Login
export const googleLoginApi = async (accessToken: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/google', { accessToken });
  return response.data;
};

