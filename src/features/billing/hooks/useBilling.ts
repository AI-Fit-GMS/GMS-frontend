import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  getInvoicesApi,
  getInvoiceByIdApi,
  createInvoiceApi,
  updateInvoiceApi,
  getPaymentsApi,
  createPaymentApi,
  getSubscriptionsApi,
  getRevenueDataApi,
  getBillingStatsApi,
} from '../../../services/billingApis';
import { showToast } from '../../../redux/slices/uiSlice';

// Invoices
export const useInvoices = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: invoicesResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['invoices', params],
    queryFn: () => getInvoicesApi(params),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createInvoiceApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      dispatch(showToast({ message: 'Invoice created successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create invoice';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateInvoiceApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      dispatch(showToast({ message: 'Invoice updated successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update invoice';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  return {
    invoices: invoicesResponse?.data || [],
    totalInvoices: invoicesResponse?.pagination?.total || 0,
    totalPages: invoicesResponse?.pagination?.totalPages || 0,
    currentPage: invoicesResponse?.pagination?.page || 1,
    isLoading,
    error,
    refetch,
    createInvoice: createMutation.mutate,
    updateInvoice: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};

export const useInvoice = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => getInvoiceByIdApi(id),
    enabled: !!id,
  });

  return {
    invoice: data?.data,
    isLoading,
    error,
  };
};

// Payments
export const usePayments = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: paymentsResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['payments', params],
    queryFn: () => getPaymentsApi(params),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => createPaymentApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      dispatch(showToast({ message: 'Payment recorded successfully', type: 'success' }));
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to record payment';
      dispatch(showToast({ message, type: 'error' }));
    },
  });

  return {
    payments: paymentsResponse?.data || [],
    totalPayments: paymentsResponse?.pagination?.total || 0,
    totalPages: paymentsResponse?.pagination?.totalPages || 0,
    currentPage: paymentsResponse?.pagination?.page || 1,
    isLoading,
    error,
    refetch,
    createPayment: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};

// Subscriptions
export const useSubscriptions = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  const {
    data: subscriptionsResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['subscriptions', params],
    queryFn: () => getSubscriptionsApi(params),
  });

  return {
    subscriptions: subscriptionsResponse?.data || [],
    totalSubscriptions: subscriptionsResponse?.pagination?.total || 0,
    totalPages: subscriptionsResponse?.pagination?.totalPages || 0,
    currentPage: subscriptionsResponse?.pagination?.page || 1,
    isLoading,
    error,
    refetch,
  };
};

// Revenue
export const useRevenue = (startDate?: string, endDate?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['revenue', startDate, endDate],
    queryFn: () => getRevenueDataApi(startDate, endDate),
  });

  return {
    revenue: data?.data,
    isLoading,
    error,
  };
};

// Stats
export const useBillingStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['billing-stats'],
    queryFn: getBillingStatsApi,
  });

  return {
    stats: data?.data,
    isLoading,
    error,
  };
};

