import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('focusflow_theme') || 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('focusflow_theme', theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme: () => setTheme((mode) => (mode === 'dark' ? 'light' : 'dark')) }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
