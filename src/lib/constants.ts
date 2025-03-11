export const THEME = {
  colors: {
    primary: {
      DEFAULT: '#2E7D32', // Forest green
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      DEFAULT: '#E8F5E9', // Light mint
      light: '#F1F8E9',
      dark: '#C8E6C9',
    },
    accent: {
      DEFAULT: '#81C784', // Soft green
      light: '#A5D6A7',
      dark: '#66BB6A',
    },
    text: {
      primary: '#1C2833',
      secondary: '#566573',
      light: '#F8F9F9',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F6FA',
      dark: '#2C3E50',
    },
    status: {
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
};

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
  INVENTORY: '/api/inventory',
  ANALYTICS: '/api/analytics',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  INVENTORY: '/inventory',
  ORDERS: '/orders',
  ANALYTICS: '/analytics',
  SALES: '/sales',
  SETTINGS: '/settings',
};