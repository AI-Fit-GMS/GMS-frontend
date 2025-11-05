export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  membership: {
    id: string;
    type: 'basic' | 'premium' | 'vip';
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'suspended';
    autoRenew: boolean;
  };
  healthInfo: {
    weight?: number;
    height?: number;
    bloodGroup?: string;
    medicalConditions: string[];
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemberData extends Omit<Member, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateMemberData extends Partial<CreateMemberData> {}

