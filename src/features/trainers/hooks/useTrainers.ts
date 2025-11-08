import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  getTrainersApi,
  getTrainerByIdApi,
  createTrainerApi,
  updateTrainerApi,
  deleteTrainerApi,
} from '../../../services/trainerApis';
import { showToast } from '../../../redux/slices/uiSlice';
import { buildTrainerMockResponse } from '../data/mockTrainers';

export const useTrainers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: trainersResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['trainers', params],
    queryFn: async () => {
      try {
        return await getTrainersApi(params);
      } catch (err: any) {
        if (!err?.response) {
          console.warn('Falling back to trainer mock data due to network issue.', err);
          return buildTrainerMockResponse(params);
        }
        throw err;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createTrainerApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      dispatch(showToast({ message: 'Trainer created successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create trainer';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTrainerApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      dispatch(showToast({ message: 'Trainer updated successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update trainer';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTrainerApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      dispatch(showToast({ message: 'Trainer deleted successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete trainer';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  return {
    trainers: trainersResponse?.data || [],
    totalTrainers: trainersResponse?.pagination?.total || 0,
    totalPages: trainersResponse?.pagination?.totalPages || 0,
    currentPage: trainersResponse?.pagination?.page || 1,
    isLoading,
    error,
    refetch,
    createTrainer: createMutation.mutate,
    updateTrainer: updateMutation.mutate,
    deleteTrainer: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export const useTrainer = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trainer', id],
    queryFn: () => getTrainerByIdApi(id),
    enabled: !!id,
  });

  return {
    trainer: data?.data,
    isLoading,
    error,
  };
};

