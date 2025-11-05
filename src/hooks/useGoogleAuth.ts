import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { googleLoginApi } from '../services/authApis';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import { ROUTES } from '../routes';

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

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Send the access token to your backend
      googleLoginMutation.mutate(tokenResponse.access_token);
    },
    onError: () => {
      dispatch(showToast({ message: 'Google login failed', type: 'error' }));
    },
  });

  return {
    googleLogin,
    isGoogleLoggingIn: googleLoginMutation.isPending,
  };
};

