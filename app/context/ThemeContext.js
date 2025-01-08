'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themeColors = {
  purple: { 
    primary: '#8B5CF6', 
    secondary: '#7C3AED',
    rgb: '139, 92, 246'
  },
  red: { 
    primary: '#F43F5E', 
    secondary: '#E11D48',
    rgb: '244, 63, 94'
  },
  blue: { 
    primary: '#0EA5E9', 
    secondary: '#0284C7',
    rgb: '14, 165, 233'
  },
  green: { 
    primary: '#10B981', 
    secondary: '#059669',
    rgb: '16, 185, 129'
  },
  orange: { 
    primary: '#F97316', 
    secondary: '#EA580C',
    rgb: '249, 115, 22'
  },
  pink: { 
    primary: '#EC4899', 
    secondary: '#DB2777',
    rgb: '236, 72, 153'
  },
  yellow: { 
    primary: '#FBBF24', 
    secondary: '#F59E0B',
    rgb: '251, 191, 36'
  }
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentColor, setCurrentColor] = useState('green');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    root.style.setProperty('--primary-color', themeColors[currentColor].primary);
    root.style.setProperty('--secondary-color', themeColors[currentColor].secondary);
    root.style.setProperty('--primary-rgb', themeColors[currentColor].rgb);
  }, [isDarkMode, currentColor]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeColor = (color) => {
    setCurrentColor(color);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentColor, changeColor, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
