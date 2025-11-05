import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { loginApi, signupApi, getCurrentUserApi, logoutApi, LoginCredentials, SignupData } from '../services/authApis';
import { loginStart, loginSuccess, loginFailure, logout, setUser } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import { RootState } from '../redux/store';
import { ROUTES } from '../routes';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess({
        user: data.data.user,
        token: data.data.token,
        refreshToken: data.data.refreshToken,
      }));
      dispatch(showToast({ message: 'Login successful!', type: 'success' }));
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: any) => {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
      const message = error.response?.data?.message || 'Login failed';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => signupApi(data),
    onSuccess: (data) => {
      dispatch(loginSuccess({
        user: data.data.user,
        token: data.data.token,
        refreshToken: data.data.refreshToken,
      }));
      dispatch(showToast({ message: 'Account created successfully!', type: 'success' }));
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Signup failed';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Get current user query
  const { data: currentUser, refetch: refetchUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserApi,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      dispatch(setUser(data.data.user));
    },
  });

  // Logout function
  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      dispatch(showToast({ message: 'Logged out successfully', type: 'success' }));
      navigate(ROUTES.LOGIN);
    } catch (error) {
      dispatch(logout());
      navigate(ROUTES.LOGIN);
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: handleLogout,
    refetchUser,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
  };
};

