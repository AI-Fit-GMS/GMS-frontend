export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',

  // Dashboard (Admin - legacy, will redirect based on role)
  DASHBOARD: '/dashboard',

  // Members
  MEMBERS: '/members',
  MEMBER_DETAIL: '/members/:id',
  ADD_MEMBER: '/members/add',

  // Trainers
  TRAINERS: '/trainers',
  TRAINER_DETAIL: '/trainers/:id',
  ADD_TRAINER: '/trainers/add',

  // Classes
  CLASSES: '/classes',
  CLASS_DETAIL: '/classes/:id',
  ADD_CLASS: '/classes/add',
  CLASS_SCHEDULE: '/classes/schedule',

  // Billing
  BILLING: '/billing',
  INVOICES: '/billing/invoices',
  PAYMENTS: '/billing/payments',
  SUBSCRIPTIONS: '/billing/subscriptions',

  // Admin
  ADMIN: '/admin',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_REPORTS: '/admin/reports',

  // Client Dashboard
  CLIENT_DASHBOARD: '/client/dashboard',

  // Community
  COMMUNITY: '/community',

  // Profile
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

// Helper function to generate dynamic routes
export const generateRoute = (route: string, params: Record<string, string>) => {
  let path = route;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  return path;
};

