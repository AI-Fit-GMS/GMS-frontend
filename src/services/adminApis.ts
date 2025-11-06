import axiosInstance from './axiosInstance';
import { AdminStats, RevenueData, MemberGrowthData, ClassAttendanceData } from '../features/admin/types/admin.types';

export interface AdminStatsResponse {
  success: boolean;
  data: {
    stats: AdminStats;
  };
}

export interface RevenueResponse {
  success: boolean;
  data: {
    revenue: RevenueData[];
  };
}

export interface MemberGrowthResponse {
  success: boolean;
  data: {
    growth: MemberGrowthData[];
  };
}

export interface ClassAttendanceResponse {
  success: boolean;
  data: {
    attendance: ClassAttendanceData[];
  };
}

// Get admin dashboard stats
export const getAdminStatsApi = async (): Promise<AdminStatsResponse> => {
  const response = await axiosInstance.get('/admin/stats');
  return response.data;
};

// Get revenue analytics
export const getRevenueAnalyticsApi = async (startDate?: string, endDate?: string): Promise<RevenueResponse> => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  const response = await axiosInstance.get(`/admin/revenue?${params.toString()}`);
  return response.data;
};

// Get member growth analytics
export const getMemberGrowthApi = async (): Promise<MemberGrowthResponse> => {
  const response = await axiosInstance.get('/admin/member-growth');
  return response.data;
};

// Get class attendance analytics
export const getClassAttendanceApi = async (): Promise<ClassAttendanceResponse> => {
  const response = await axiosInstance.get('/admin/class-attendance');
  return response.data;
};

