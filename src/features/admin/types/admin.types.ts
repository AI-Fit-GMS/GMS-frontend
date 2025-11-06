export interface AdminStats {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  activeTrainers: number;
  classesToday: number;
  totalMemberships: number;
  avgAttendance: number;
  dietComplianceRate: number;
  workoutComplianceRate: number;
  avgSessionRating: number;
  scheduleAdherence: number;
}

export interface MemberGrowthData {
  month: string;
  totalMembers: number;
}

export interface ClassAttendanceData {
  classId: string;
  className: string;
  attendance: number;
  capacity: number;
  date: string;
}

