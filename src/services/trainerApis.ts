import axiosInstance from './axiosInstance';

// Get all trainers
export const getTrainersApi = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const response = await axiosInstance.get('/trainers', { params });
  return response.data;
};

// Get single trainer
export const getTrainerByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/trainers/${id}`);
  return response.data;
};

// Create trainer
export const createTrainerApi = async (data: any) => {
  const response = await axiosInstance.post('/trainers', data);
  return response.data;
};

// Update trainer
export const updateTrainerApi = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/trainers/${id}`, data);
  return response.data;
};

// Delete trainer
export const deleteTrainerApi = async (id: string) => {
  const response = await axiosInstance.delete(`/trainers/${id}`);
  return response.data;
};

// Get trainer statistics
export const getTrainerStatsApi = async () => {
  const response = await axiosInstance.get('/trainers/stats');
  return response.data;
};

