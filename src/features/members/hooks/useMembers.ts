import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  getMembersApi,
  getMemberByIdApi,
  createMemberApi,
  updateMemberApi,
  deleteMemberApi,
} from '../../../services/memberApis';
import { showToast } from '../../../redux/slices/uiSlice';
// Using any for now - will be properly typed when API is integrated

export const useMembers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Get all members
  const {
    data: membersResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['members', params],
    queryFn: () => getMembersApi(params),
  });

  // Create member
  const createMutation = useMutation({
    mutationFn: (data: any) => createMemberApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      dispatch(showToast({ message: 'Member created successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create member';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Update member
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateMemberApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      dispatch(showToast({ message: 'Member updated successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update member';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  // Delete member
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMemberApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      dispatch(showToast({ message: 'Member deleted successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete member';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  return {
    members: membersResponse?.data || [],
    totalMembers: membersResponse?.pagination?.total || 0,
    totalPages: membersResponse?.pagination?.totalPages || 0,
    currentPage: membersResponse?.pagination?.page || 1,
    isLoading,
    error,
    refetch,
    createMember: createMutation.mutate,
    updateMember: updateMutation.mutate,
    deleteMember: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

// Hook for single member
export const useMember = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['member', id],
    queryFn: () => getMemberByIdApi(id),
    enabled: !!id,
  });

  return {
    member: data?.data,
    isLoading,
    error,
  };
};

