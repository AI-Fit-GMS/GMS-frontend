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

  const googleLogin = () => {
    if (!googleClientId) {
      dispatch(showToast({ 
        message: 'Google authentication is not configured. Please use email/password login.', 
        type: 'error' 
      }));
      return;
    }
    
    // Dynamically import and use Google login only when needed and client ID exists
    import('@react-oauth/google').then(({ useGoogleLogin }) => {
      // This will be handled by the component that has GoogleOAuthProvider
      // For now, show error if provider is not available
      dispatch(showToast({ 
        message: 'Google authentication is not available. Please ensure GoogleOAuthProvider is configured.', 
        type: 'error' 
      }));
    }).catch(() => {
      dispatch(showToast({ 
        message: 'Google authentication is not available. Please use email/password login.', 
        type: 'error' 
      }));
    });
  };

  return {
    googleLogin,
    isGoogleLoggingIn: googleLoginMutation.isPending,
    isGoogleEnabled: !!googleClientId,
  };
};

