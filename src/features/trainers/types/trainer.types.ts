export interface Trainer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string[];
  experience: number; // years
  certifications: string[];
  bio?: string;
  avatar?: string;
  hourlyRate: number;
  status: 'active' | 'inactive' | 'on_leave';
  focusAreas?: string[];
  nutritionApproach?: string;
  signaturePrograms?: {
    name: string;
    focus: string;
    durationWeeks: number;
  }[];
  preferredModalities?: string[];
  schedule: {
    dayOfWeek: number; // 0-6, 0 = Sunday
    startTime: string; // "09:00"
    endTime: string; // "17:00"
  }[];
  totalClasses: number;
  totalMembers: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTrainerData extends Omit<Trainer, 'id' | 'createdAt' | 'updatedAt' | 'totalClasses' | 'totalMembers' | 'rating'> {}

export interface UpdateTrainerData extends Partial<CreateTrainerData> {}

