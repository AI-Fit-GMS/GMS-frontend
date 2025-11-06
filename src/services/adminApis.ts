import axiosInstance from './axiosInstance';
import { AdminStats, MemberGrowthData, ClassAttendanceData } from '../features/admin/types/admin.types';

export interface AdminStatsResponse {
  success: boolean;
  data: AdminStats;
  message: string;
}

export interface MemberGrowthResponse {
  success: boolean;
  data: {
    growth: MemberGrowthData[];
  };
  message: string;
}

export interface ClassAttendanceResponse {
  success: boolean;
  data: {
    attendance: ClassAttendanceData[];
  };
  message: string;
}

// Get Admin Statistics
export const getAdminStatsApi = async (): Promise<AdminStatsResponse> => {
  try {
    const response = await axiosInstance.get('/admin/stats');
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      return {
        success: true,
        data: {
          totalMembers: 250,
          activeMembers: 210,
          inactiveMembers: 40,
          activeTrainers: 15,
          classesToday: 10,
          totalMemberships: 200,
          avgAttendance: 75,
          dietComplianceRate: 82,
          workoutComplianceRate: 76,
          avgSessionRating: 4.6,
          scheduleAdherence: 88,
        },
        message: 'Admin stats retrieved (mock)',
      };
    }
    throw error;
  }
};

// Get Member Growth
export const getMemberGrowthApi = async (): Promise<MemberGrowthResponse> => {
  try {
    const response = await axiosInstance.get('/admin/member-growth');
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      let total = 200;
      return {
        success: true,
        data: {
          growth: months.map((month) => {
            total += Math.floor(Math.random() * 10);
            return {
              month,
              totalMembers: total,
            };
          }),
        },
        message: 'Member growth retrieved (mock)',
      };
    }
    throw error;
  }
};

// Get Class Attendance
export const getClassAttendanceApi = async (): Promise<ClassAttendanceResponse> => {
  try {
    const response = await axiosInstance.get('/admin/class-attendance');
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      return {
        success: true,
        data: {
          attendance: [
            { classId: '1', className: 'Yoga', attendance: 20, capacity: 25, date: '2024-01-15' },
            { classId: '2', className: 'Cardio', attendance: 18, capacity: 20, date: '2024-01-15' },
            { classId: '3', className: 'Strength', attendance: 15, capacity: 20, date: '2024-01-15' },
            { classId: '4', className: 'Pilates', attendance: 12, capacity: 15, date: '2024-01-15' },
          ],
        },
        message: 'Class attendance retrieved (mock)',
      };
    }
    throw error;
  }
};

