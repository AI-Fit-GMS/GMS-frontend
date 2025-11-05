import axiosInstance from './axiosInstance';
import { Member } from '../features/members/types/member.types';

// Get all members
export const getMembersApi = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const response = await axiosInstance.get('/members', { params });
  return response.data;
};

// Get single member
export const getMemberByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/members/${id}`);
  return response.data;
};

// Create member
export const createMemberApi = async (data: any) => {
  const response = await axiosInstance.post('/members', data);
  return response.data;
};

// Update member
export const updateMemberApi = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/members/${id}`, data);
  return response.data;
};

// Delete member
export const deleteMemberApi = async (id: string) => {
  const response = await axiosInstance.delete(`/members/${id}`);
  return response.data;
};

// Get member statistics
export const getMemberStatsApi = async () => {
  const response = await axiosInstance.get('/members/stats');
  return response.data;
};

