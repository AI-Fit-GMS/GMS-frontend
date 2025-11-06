import { useQuery } from '@tanstack/react-query';
import { getAdminStatsApi, getMemberGrowthApi, getClassAttendanceApi } from '../../../services/adminApis';

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStatsApi,
  });
};

export const useMemberGrowth = () => {
  return useQuery({
    queryKey: ['adminMemberGrowth'],
    queryFn: getMemberGrowthApi,
  });
};

export const useClassAttendance = () => {
  return useQuery({
    queryKey: ['adminClassAttendance'],
    queryFn: getClassAttendanceApi,
  });
};

