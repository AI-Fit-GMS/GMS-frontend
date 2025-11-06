import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { useGoogleAuth } from '../../../hooks/useGoogleAuth';
import { ROUTES } from '../../../routes';
import { Input } from '../../../commonComponents/forms/Input';
import Button from '../../../commonComponents/buttons/Button';
import { Mail, Lock, ShieldCheck, User2, ChevronRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { t } = useTranslation();
  const { login, isLoggingIn } = useAuth();
  const { googleLoginMutation } = useGoogleAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Only initialize Google login hook if client ID is provided
  const googleLogin = googleClientId
    ? useGoogleLogin({
        onSuccess: (tokenResponse) => {
          googleLoginMutation.mutate(tokenResponse.access_token);
        },
        onError: () => {
          // Error handled by mutation
        },
      })
    : null;

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      login({ email, password });
    }
  };

  const quickAccounts = [
    {
      key: 'admin',
      title: 'Admin Access',
      description: 'Explore the admin control center and advanced dashboards.',
      email: 'admin@ai-fit.com',
      password: 'admin123',
      accent: 'from-blue-500 to-indigo-500',
      icon: ShieldCheck,
    },
    {
      key: 'member',
      title: 'Member Access',
      description: 'Experience the member journey, progress tracking, and classes.',
      email: 'member@ai-fit.com',
      password: 'member123',
      accent: 'from-emerald-500 to-teal-500',
      icon: User2,
    },
  ] as const;

  const handleQuickFill = (account: typeof quickAccounts[number]) => {
    setEmail(account.email);
    setPassword(account.password);
    setErrors({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 border border-gray-100">
        <div>
          <div className="text-left mb-8 space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              AI-Fit Access Portal
            </p>
            <h1 className="text-3xl font-bold text-gray-800">
              {t('auth.login')}
            </h1>
            <p className="text-gray-600">
              Sign in to continue your AI-led fitness journey. Choose a test account or use your own credentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={t('auth.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-5 h-5" />}
              placeholder="you@example.com"
            />

            <Input
              label={t('auth.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              leftIcon={<Lock className="w-5 h-5" />}
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between text-sm">
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={isLoggingIn}
              isLoading={isLoggingIn}
              className="h-12 text-base font-semibold"
            >
              {isLoggingIn ? t('common.loading') : t('auth.loginButton')}
            </Button>
          </form>

          {googleClientId && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                fullWidth
                className="mt-4 h-12 text-base font-semibold"
                onClick={() => googleLogin?.()}
                disabled={googleLoginMutation.isPending}
                isLoading={googleLoginMutation.isPending}
                leftIcon={<FcGoogle className="w-5 h-5" />}
              >
                {googleLoginMutation.isPending ? 'Signing in...' : 'Sign in with Google'}
              </Button>
            </div>
          )}

          <p className="text-center mt-8 text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to={ROUTES.SIGNUP} className="text-blue-600 hover:text-blue-800 font-semibold">
              {t('auth.signup')}
            </Link>
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Instant Test Accounts</h2>
            <p className="text-sm text-gray-500 mt-1">
              Autofill credentials to experience AI-Fit as an admin or member. Passwords are pre-generated for quick testing.
            </p>
          </div>

          <div className="space-y-4">
            {quickAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <button
                  key={account.key}
                  type="button"
                  onClick={() => handleQuickFill(account)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-4 border border-transparent shadow-sm transition-all group-hover:border-blue-200 group-hover:shadow-md">
                    <div className={`rounded-xl bg-gradient-to-br ${account.accent} text-white p-3 shadow`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{account.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{account.description}</p>
                      <div className="mt-3 inline-flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-1 text-xs text-gray-600">
                        <span>{account.email}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span>{account.password}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-700">
            <p className="font-semibold mb-1">Tip</p>
            <p>
              Admin access mirrors the member experience plus an admin button in the top navigation, which opens the dedicated admin portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

