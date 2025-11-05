import axiosInstance from './axiosInstance';

// Get dashboard statistics
export const getDashboardStatsApi = async () => {
  const response = await axiosInstance.get('/dashboard/stats');
  return response.data;
};

// Get revenue data
export const getRevenueDataApi = async (startDate?: string, endDate?: string) => {
  const response = await axiosInstance.get('/dashboard/revenue', {
    params: { startDate, endDate },
  });
  return response.data;
};

// Get member growth data
export const getMemberGrowthApi = async () => {
  const response = await axiosInstance.get('/dashboard/member-growth');
  return response.data;
};

// Get class attendance data
export const getClassAttendanceApi = async () => {
  const response = await axiosInstance.get('/dashboard/class-attendance');
  return response.data;
};

// Get recent activities
export const getRecentActivitiesApi = async () => {
  const response = await axiosInstance.get('/dashboard/recent-activities');
  return response.data;
};

