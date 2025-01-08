'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [currentIcon, setCurrentIcon] = useState(0);
  const { isDarkMode } = useTheme();

  const icons = [
    'fas fa-code',
    'fas fa-laptop-code',
    'fas fa-rocket'
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearInterval(iconInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode ? 'bg-[#0B1120]' : 'bg-white'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {/* Outer circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full border-3 border-gray-200">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-3 border-[var(--primary-color)] border-t-transparent"
              />
            </div>
          </motion.div>

          {/* Animated Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <i className={`${icons[currentIcon]} loading-icon animate-color text-xl`}></i>
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className={`text-sm font-medium text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Loading
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
