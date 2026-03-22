import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`py-8 sm:py-10 text-center transition-all duration-400 ${
        isDark ? 'border-t border-white/5' : 'border-t border-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p
          className={`font-body text-sm ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          Made with ☕ + React somewhere in the cosmos{' '}
          <span className="inline-block animate-spin" style={{ animationDuration: '8s' }}>
            🪐
          </span>
        </p>
        <p
          className={`font-body text-xs mt-2 ${
            isDark ? 'text-gray-600' : 'text-gray-400'
          }`}
        >
          © {new Date().getFullYear()} Sarvesh Jhawar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
