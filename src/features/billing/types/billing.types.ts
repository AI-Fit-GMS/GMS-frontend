export interface Invoice {
  id: string;
  invoiceNumber: string;
  memberId: string;
  memberName: string;
  amount: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
  paymentMethod?: string;
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  memberId: string;
  memberName: string;
  amount: number;
  method: 'cash' | 'card' | 'upi' | 'bank_transfer';
  transactionId?: string;
  status: 'completed' | 'pending' | 'failed';
  notes?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  memberId: string;
  memberName: string;
  planType: 'basic' | 'premium' | 'vip';
  startDate: string;
  endDate: string;
  amount: number;
  status: 'active' | 'expired' | 'cancelled';
  autoRenew: boolean;
  nextBillingDate?: string;
  createdAt: string;
}

export interface CreateInvoiceData extends Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'> {}

export interface CreatePaymentData {
  invoiceId: string;
  amount: number;
  method: 'cash' | 'card' | 'upi' | 'bank_transfer';
  transactionId?: string;
  notes?: string;
}

