import axiosInstance from './axiosInstance';

// Invoices
export const getInvoicesApi = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const response = await axiosInstance.get('/billing/invoices', { params });
  return response.data;
};

export const getInvoiceByIdApi = async (id: string) => {
  const response = await axiosInstance.get(`/billing/invoices/${id}`);
  return response.data;
};

export const createInvoiceApi = async (data: any) => {
  const response = await axiosInstance.post('/billing/invoices', data);
  return response.data;
};

export const updateInvoiceApi = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/billing/invoices/${id}`, data);
  return response.data;
};

// Payments
export const getPaymentsApi = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await axiosInstance.get('/billing/payments', { params });
  return response.data;
};

export const createPaymentApi = async (data: any) => {
  const response = await axiosInstance.post('/billing/payments', data);
  return response.data;
};

// Subscriptions
export const getSubscriptionsApi = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  const response = await axiosInstance.get('/billing/subscriptions', { params });
  return response.data;
};

// Revenue
export const getRevenueDataApi = async (startDate?: string, endDate?: string) => {
  const response = await axiosInstance.get('/billing/revenue', {
    params: { startDate, endDate },
  });
  return response.data;
};

// Statistics
export const getBillingStatsApi = async () => {
  const response = await axiosInstance.get('/billing/stats');
  return response.data;
};

