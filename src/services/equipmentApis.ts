import axiosInstance from './axiosInstance';
import { Equipment, CreateEquipmentData, UpdateEquipmentData, EquipmentResponse, EquipmentListResponse } from '../features/equipment/types/equipment.types';

// Get all equipment
export const getEquipmentApi = async (): Promise<EquipmentListResponse> => {
  try {
    const response = await axiosInstance.get('/equipment');
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      return {
        success: true,
        data: [
          {
            id: '1',
            name: 'Treadmill Pro 3000',
            condition: 'Good',
            purchaseDate: '2023-01-15',
            createdAt: '2023-01-15T10:00:00Z',
            updatedAt: '2023-01-15T10:00:00Z',
          },
          {
            id: '2',
            name: 'Adjustable Bench',
            condition: 'New',
            purchaseDate: '2024-03-20',
            createdAt: '2024-03-20T10:00:00Z',
            updatedAt: '2024-03-20T10:00:00Z',
          },
          {
            id: '3',
            name: 'Dumbbell Set (5-50 lbs)',
            condition: 'Good',
            purchaseDate: '2022-11-10',
            createdAt: '2022-11-10T10:00:00Z',
            updatedAt: '2022-11-10T10:00:00Z',
          },
          {
            id: '4',
            name: 'Elliptical Machine',
            condition: 'In Maintenance',
            purchaseDate: '2021-08-05',
            createdAt: '2021-08-05T10:00:00Z',
            updatedAt: '2024-01-10T10:00:00Z',
          },
          {
            id: '5',
            name: 'Rowing Machine',
            condition: 'Good',
            purchaseDate: '2023-06-12',
            createdAt: '2023-06-12T10:00:00Z',
            updatedAt: '2023-06-12T10:00:00Z',
          },
        ],
        message: 'Equipment list retrieved (mock)',
      };
    }
    throw error;
  }
};

// Create new equipment
export const createEquipmentApi = async (data: CreateEquipmentData): Promise<EquipmentResponse> => {
  try {
    const response = await axiosInstance.post('/equipment', data);
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      const newEquipment: Equipment = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: newEquipment,
        message: 'Equipment created successfully (mock)',
      };
    }
    throw error;
  }
};

// Update equipment
export const updateEquipmentApi = async (id: string, data: UpdateEquipmentData): Promise<EquipmentResponse> => {
  try {
    const response = await axiosInstance.patch(`/equipment/${id}`, data);
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      // In a real app, we would fetch the current equipment first
      // For mock, we'll return the updated data
      const mockEquipment = {
        id,
        name: 'Equipment',
        condition: (data.condition || 'Good') as const,
        purchaseDate: '2023-01-15',
        image: data.image,
        createdAt: '2023-01-15T10:00:00Z',
        updatedAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: mockEquipment,
        message: 'Equipment updated successfully (mock)',
      };
    }
    throw error;
  }
};

// Upload equipment image
export const uploadEquipmentImageApi = async (id: string, file: File): Promise<EquipmentResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axiosInstance.post(`/equipment/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      // Create object URL for the uploaded file
      const imageUrl = URL.createObjectURL(file);
      const mockEquipment = {
        id,
        name: 'Equipment',
        condition: 'Good' as const,
        purchaseDate: '2023-01-15',
        image: imageUrl,
        createdAt: '2023-01-15T10:00:00Z',
        updatedAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: mockEquipment,
        message: 'Equipment image uploaded successfully (mock)',
      };
    }
    throw error;
  }
};

// Delete equipment
export const deleteEquipmentApi = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete(`/equipment/${id}`);
    return response.data;
  } catch (error: any) {
    // Mock data for development
    if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      return {
        success: true,
        message: 'Equipment deleted successfully (mock)',
      };
    }
    throw error;
  }
};

