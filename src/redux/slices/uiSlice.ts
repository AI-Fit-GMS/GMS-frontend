import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  themeMode: 'light' | 'dark' | 'auto';
  resolvedTheme: 'light' | 'dark';
  loading: boolean;
  toast: {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  };
}

const initialState: UIState = {
  sidebarOpen: true,
  themeMode: 'auto',
  resolvedTheme: 'light',
  loading: false,
  toast: {
    open: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      const nextTheme = state.resolvedTheme === 'light' ? 'dark' : 'light';
      state.themeMode = nextTheme;
      state.resolvedTheme = nextTheme;
    },
    setThemeMode: (state, action: PayloadAction<UIState['themeMode']>) => {
      state.themeMode = action.payload;
    },
    setResolvedTheme: (state, action: PayloadAction<UIState['resolvedTheme']>) => {
      state.resolvedTheme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: UIState['toast']['type'] }>) => {
      state.toast = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setThemeMode,
  setResolvedTheme,
  setLoading,
  showToast,
  hideToast,
} = uiSlice.actions;
export default uiSlice.reducer;

