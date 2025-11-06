export interface AdminStats {
  totalMembers: number;
  totalTrainers: number;
  totalClasses: number;
  activeMemberships: number;
  monthlyRevenue: number;
  monthlyGrowth: number;
  memberGrowth: number;
  classAttendance: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  members: number;
}

export interface MemberGrowthData {
  month: string;
  newMembers: number;
  totalMembers: number;
}

export interface ClassAttendanceData {
  className: string;
  attendance: number;
  capacity: number;
}

