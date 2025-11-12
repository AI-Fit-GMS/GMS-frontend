export type EquipmentCondition = 'New' | 'Good' | 'In Maintenance';

export interface Equipment {
  id: string;
  name: string;
  condition: EquipmentCondition;
  purchaseDate: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEquipmentData {
  name: string;
  condition: EquipmentCondition;
  purchaseDate: string;
  image?: string;
}

export interface UpdateEquipmentData {
  condition?: EquipmentCondition;
  image?: string;
}

export interface EquipmentResponse {
  success: boolean;
  data: Equipment;
  message: string;
}

export interface EquipmentListResponse {
  success: boolean;
  data: Equipment[];
  message: string;
}

