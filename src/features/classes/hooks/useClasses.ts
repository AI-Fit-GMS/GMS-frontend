import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  getClassesApi,
  getClassByIdApi,
  createClassApi,
  updateClassApi,
  deleteClassApi,
  getClassScheduleApi,
  enrollInClassApi,
} from '../../../services/classApis';
import { showToast } from '../../../redux/slices/uiSlice';

export const useClasses = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: classesResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['classes', params],
    queryFn: () => getClassesApi(params),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createClassApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      dispatch(showToast({ message: 'Class created successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create class';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateClassApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      dispatch(showToast({ message: 'Class updated successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update class';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteClassApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      dispatch(showToast({ message: 'Class deleted successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete class';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  const enrollMutation = useMutation({
    mutationFn: ({ classId, memberId }: { classId: string; memberId: string }) =>
      enrollInClassApi(classId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      dispatch(showToast({ message: 'Enrolled in class successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to enroll in class';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  return {
    classes: classesResponse?.data || [],
    totalClasses: classesResponse?.pagination?.total || 0,
    totalPages: classesResponse?.pagination?.totalPages || 0,
    currentPage: classesResponse?.pagination?.page || 1,
    isLoading,
    error,
    refetch,
    createClass: createMutation.mutate,
    updateClass: updateMutation.mutate,
    deleteClass: deleteMutation.mutate,
    enrollInClass: enrollMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isEnrolling: enrollMutation.isPending,
  };
};

export const useClass = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['class', id],
    queryFn: () => getClassByIdApi(id),
    enabled: !!id,
  });

  return {
    class: data?.data,
    isLoading,
    error,
  };
};

export const useClassSchedule = (date?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['class-schedule', date],
    queryFn: () => getClassScheduleApi(date),
  });

  return {
    schedule: data?.data || [],
    isLoading,
    error,
  };
};

