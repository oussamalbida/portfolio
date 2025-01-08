'use client';

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { changeColor, themeColors } = useTheme();

  return (
    <div className="fixed right-4 top-20 z-50">
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Theme Colors</p>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(themeColors).map(([color, values]) => (
                <button
                  key={color}
                  onClick={() => changeColor(color)}
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
  );
}
