export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  healthInfo?: {
    medicalConditions: string[];
    allergies: string[];
    medications: string[];
    fitnessGoals: string[];
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  healthInfo?: {
    medicalConditions: string[];
    allergies: string[];
    medications: string[];
    fitnessGoals: string[];
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    language: string;
  };
}

