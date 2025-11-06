import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ROUTES } from '../../../routes';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Redirect based on user role
  if (user?.role === 'admin') {
    return <Navigate to={ROUTES.ADMIN_ANALYTICS} replace />;
  }
  
  if (user?.role === 'member') {
    return <Navigate to={ROUTES.CLIENT_DASHBOARD} replace />;
  }
  
  // Default to admin for now (trainer can see admin analytics)
  return <Navigate to={ROUTES.ADMIN_ANALYTICS} replace />;
};

export default Dashboard;
