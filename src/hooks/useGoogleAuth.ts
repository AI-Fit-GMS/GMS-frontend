import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { googleLoginApi } from '../services/authApis';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import { ROUTES } from '../routes';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLoginMutation = useMutation({
    mutationFn: (token: string) => googleLoginApi(token),
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess({
        user: data.data.user,
        token: data.data.token,
        refreshToken: data.data.refreshToken,
      }));
      dispatch(showToast({ message: 'Google login successful!', type: 'success' }));
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: any) => {
      dispatch(loginFailure(error.response?.data?.message || 'Google login failed'));
      const message = error.response?.data?.message || 'Google login failed';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Conditionally initialize Google login hook only if client ID is configured
  let googleLoginHook: (() => void) | null = null;

  if (googleClientId) {
    try {
      // Dynamic import to avoid errors when Google OAuth is not configured
      const { useGoogleLogin } = require('@react-oauth/google');
      // eslint-disable-next-line react-hooks/rules-of-hooks
      googleLoginHook = useGoogleLogin({
        onSuccess: (tokenResponse: any) => {
          googleLoginMutation.mutate(tokenResponse.access_token);
        },
        onError: () => {
          dispatch(showToast({ message: 'Google login failed', type: 'error' }));
        },
      });
    } catch (error) {
      console.warn('Google OAuth not available:', error);
    }
  }

  const googleLogin = () => {
    if (!googleClientId) {
      dispatch(showToast({
        message: 'Google authentication is not configured. Please use email/password login.',
        type: 'error'
      }));
      return;
    }
    if (!googleLoginHook) {
      dispatch(showToast({
        message: 'Google authentication is not available. Please use email/password login.',
        type: 'error'
      }));
      return;
    }
    googleLoginHook();
  };

  return {
    googleLogin,
    isGoogleLoggingIn: googleLoginMutation.isPending,
    isGoogleEnabled: !!googleClientId && !!googleLoginHook,
  };
};

