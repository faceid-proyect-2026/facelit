import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppTheme, darkTheme, lightTheme } from '@/constants/theme';

interface ThemeContextType {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'facelit-theme';

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

function readSavedTheme() {
  if (typeof globalThis.localStorage === 'undefined') return null;
  const savedTheme = globalThis.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
}

function saveTheme(isDark: boolean) {
  if (typeof globalThis.localStorage === 'undefined') return;
  globalThis.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
   const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = readSavedTheme();
    if (savedTheme) setIsDark(savedTheme === 'dark');
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark((previous) => {
      const next = !previous;
      saveTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}