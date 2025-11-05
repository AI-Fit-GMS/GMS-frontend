import axiosInstance from './axiosInstance';

// Get all classes
export const getClassesApi = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}) => {
  const response = await axiosInstance.get('/classes', { params });
  return response.data;
};

// Get single class
export const getClassByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/classes/${id}`);
  return response.data;
};

// Create class
export const createClassApi = async (data: any) => {
  const response = await axiosInstance.post('/classes', data);
  return response.data;
};

// Update class
export const updateClassApi = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/classes/${id}`, data);
  return response.data;
};

// Delete class
export const deleteClassApi = async (id: string) => {
  const response = await axiosInstance.delete(`/classes/${id}`);
  return response.data;
};

// Get class schedule
export const getClassScheduleApi = async (date?: string) => {
  const response = await axiosInstance.get('/classes/schedule', {
    params: { date },
  });
  return response.data;
};

// Enroll in class
export const enrollInClassApi = async (classId: string, memberId: string) => {
  const response = await axiosInstance.post(`/classes/${classId}/enroll`, { memberId });
  return response.data;
};

// Get class statistics
export const getClassStatsApi = async () => {
  const response = await axiosInstance.get('/classes/stats');
  return response.data;
};

