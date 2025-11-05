import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  toast: {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  };
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'light',
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
      state.theme = state.theme === 'light' ? 'dark' : 'light';
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

export const { toggleSidebar, setSidebarOpen, toggleTheme, setLoading, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;

