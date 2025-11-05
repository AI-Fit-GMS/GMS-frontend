export interface Class {
  id: string;
  name: string;
  description: string;
  type: 'yoga' | 'cardio' | 'strength' | 'crossfit' | 'pilates' | 'other';
  trainer: {
    id: string;
    name: string;
    avatar?: string;
  };
  schedule: {
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
    startTime: string; // "09:00"
    endTime: string; // "10:00"
    duration: number; // minutes
  };
  capacity: number;
  enrolled: number;
  available: number;
  location: string;
  equipment: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  status: 'active' | 'cancelled' | 'completed';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassSchedule {
  date: string;
  classId: string;
  trainerId: string;
  startTime: string;
  endTime: string;
  enrolled: number;
  capacity: number;
}

export interface CreateClassData extends Omit<Class, 'id' | 'createdAt' | 'updatedAt' | 'enrolled' | 'available'> {}

export interface UpdateClassData extends Partial<CreateClassData> {}

