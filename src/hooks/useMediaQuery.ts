import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }

    // Legacy browsers
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

// Predefined breakpoint hooks
export const useIsMobile = () => useMediaQuery(`(max-width: ${BREAKPOINTS.md})`);
export const useIsTablet = () => useMediaQuery(`(min-width: ${BREAKPOINTS.md}) and (max-width: ${BREAKPOINTS.lg})`);
export const useIsDesktop = () => useMediaQuery(`(min-width: ${BREAKPOINTS.lg})`);

