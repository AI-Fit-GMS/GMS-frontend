import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../routes';
import { Input } from '../../../commonComponents/forms/Input';
import Button from '../../../commonComponents/buttons/Button';
import { Mail, Lock } from 'lucide-react';
import { GoogleLoginButton } from '../../../components/auth/GoogleLoginButton';

const Login = () => {
  const { t } = useTranslation();
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-elegant-lg w-full max-w-md animate-fade-in border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {t('auth.login')}
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftIcon={<Mail className="w-5 h-5" />}
            placeholder="Enter your email"
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

          <div className="flex justify-end">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {t('auth.forgotPassword')}
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isLoggingIn}
            isLoading={isLoggingIn}
          >
            {isLoggingIn ? t('common.loading') : t('auth.loginButton')}
          </Button>
        </form>

        {/* Google Login Button */}
        {googleClientId && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <GoogleLoginButton variant="login" />
          </div>
        )}

        <p className="text-center mt-6 text-gray-600">
          {t('auth.noAccount')}{' '}
          <Link to={ROUTES.SIGNUP} className="text-blue-600 hover:text-blue-800 font-semibold">
            {t('auth.signup')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

