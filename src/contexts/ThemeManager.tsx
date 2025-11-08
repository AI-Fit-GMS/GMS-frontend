import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setResolvedTheme, setThemeMode } from '../redux/slices/uiSlice';

const THEME_STORAGE_KEY = 'ai-fit-theme-mode';

const getStoredTheme = (): 'light' | 'dark' | 'auto' => {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }

  return 'auto';
};

const ThemeManager = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.ui.themeMode);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const storedTheme = getStoredTheme();
      dispatch(setThemeMode(storedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const systemMedia = window.matchMedia('(prefers-color-scheme: dark)');

    const resolveTheme = (mode: 'light' | 'dark' | 'auto'): 'light' | 'dark' => {
      if (mode === 'auto') {
        return systemMedia.matches ? 'dark' : 'light';
      }
      return mode;
    };

    const applyTheme = (mode: 'light' | 'dark' | 'auto') => {
      const resolved = resolveTheme(mode);
      root.classList.toggle('dark', resolved === 'dark');
      root.dataset.theme = resolved;
      root.style.colorScheme = resolved;
      localStorage.setItem(THEME_STORAGE_KEY, mode);
      dispatch(setResolvedTheme(resolved));
    };

    applyTheme(themeMode);

    if (themeMode === 'auto') {
      const listener = () => applyTheme('auto');
      systemMedia.addEventListener('change', listener);
      return () => systemMedia.removeEventListener('change', listener);
    }

    return undefined;
  }, [dispatch, themeMode]);

  return null;
};

export default ThemeManager;

