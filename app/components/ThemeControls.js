'use client';

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeControls() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme, changeColor, themeColors } = useTheme();

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 p-3 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-l-xl">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="w-10 h-10 bg-gray-800 dark:bg-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      {/* Theme Color Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bg-gray-800 dark:bg-white/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Open color theme settings"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7.75 7.75h8.5v8.5h-8.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2v2M12 20v2M2 12h2M20 12h2M17.657 6.343l-1.414 1.414M7.757 16.243l-1.414 1.414M6.343 6.343l1.414 1.414M16.243 16.243l1.414 1.414"
            />
          </svg>
        </button>

        {/* Color Palette Popup */}
        {isOpen && (
          <div className="absolute right-full bottom-0 mr-3 mb-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Theme Colors</p>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(themeColors).map(([color, values]) => (
                  <button
                    key={color}
                    onClick={() => {
                      changeColor(color);
                      setIsOpen(false);
                    }}
                    className="w-6 h-6 rounded-full hover:scale-110 transition-transform"
                    style={{ backgroundColor: values.primary }}
                    aria-label={`Switch to ${color} theme`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
