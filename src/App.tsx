import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import { RootState } from './redux/store';
import { ROUTES } from './routes';
import LoadingSpinner from './commonComponents/loading-spinner/LoadingSpinner';
import ErrorBoundary from './hocs/ErrorBoundary';
import DashboardLayout from './components/layouts/DashboardLayout';
import './App.css';

// Lazy load pages for code splitting
const Login = lazy(() => import('./features/auth/pages/Login'));
const Signup = lazy(() => import('./features/auth/pages/Signup'));
const Dashboard = lazy(() => import('./features/dashboard/pages/Dashboard'));
const Members = lazy(() => import('./features/members/pages/Members'));
const MemberDetail = lazy(() => import('./features/members/pages/MemberDetail'));
const Trainers = lazy(() => import('./features/trainers/pages/Trainers'));
const TrainerDetail = lazy(() => import('./features/trainers/pages/TrainerDetail'));
const Classes = lazy(() => import('./features/classes/pages/Classes'));
const ClassDetail = lazy(() => import('./features/classes/pages/ClassDetail'));
const Billing = lazy(() => import('./features/billing/pages/Billing'));

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />

            {/* Protected Routes with Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.MEMBERS} element={<Members />} />
              <Route path={ROUTES.MEMBER_DETAIL} element={<MemberDetail />} />
              <Route path={ROUTES.TRAINERS} element={<Trainers />} />
              <Route path={ROUTES.TRAINER_DETAIL} element={<TrainerDetail />} />
              <Route path={ROUTES.CLASSES} element={<Classes />} />
              <Route path={ROUTES.CLASS_DETAIL} element={<ClassDetail />} />
              <Route path={ROUTES.BILLING} element={<Billing />} />
            </Route>

            {/* Redirect root to dashboard or login */}
            <Route
              path={ROUTES.HOME}
              element={<Navigate to={ROUTES.DASHBOARD} replace />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
