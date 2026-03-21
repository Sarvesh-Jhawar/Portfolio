import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? isDark
            ? 'glass-dark shadow-lg shadow-purple-500/5'
            : 'glass-light shadow-lg shadow-violet-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="#hero"
            className={`font-heading font-bold text-xl sm:text-2xl transition-colors duration-300 ${
              isDark ? 'text-cosmos-purple hover:text-cosmos-blue' : 'text-cosmos-deepViolet hover:text-cosmos-skyBlue'
            }`}
          >
            {'<SJ />'}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg font-body text-sm font-medium transition-all duration-300 ${
                  isDark
                    ? 'text-gray-300 hover:text-cosmos-purple hover:bg-white/5'
                    : 'text-gray-600 hover:text-cosmos-deepViolet hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`ml-2 p-2.5 rounded-full transition-all duration-300 text-lg ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-yellow-300'
                  : 'bg-black/5 hover:bg-black/10 text-indigo-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Hire Me CTA */}
            <a
              href="#contact"
              className={`ml-3 px-5 py-2 rounded-full font-body text-sm font-semibold transition-all duration-300 ${
                isDark
                  ? 'border border-cosmos-purple text-cosmos-purple hover:bg-cosmos-purple hover:text-white shadow-lg shadow-purple-500/20'
                  : 'border border-cosmos-deepViolet text-cosmos-deepViolet hover:bg-cosmos-deepViolet hover:text-white shadow-lg shadow-violet-500/20'
              }`}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark ? 'bg-white/5 text-yellow-300' : 'bg-black/5 text-indigo-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-black/10'
              }`}
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${isDark ? 'glass-dark' : 'glass-light'}`}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-body text-sm font-medium transition-all duration-300 ${
                    isDark
                      ? 'text-gray-300 hover:text-cosmos-purple hover:bg-white/5'
                      : 'text-gray-600 hover:text-cosmos-deepViolet hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className={`block text-center px-4 py-3 rounded-full font-body text-sm font-semibold transition-all duration-300 ${
                  isDark
                    ? 'border border-cosmos-purple text-cosmos-purple'
                    : 'border border-cosmos-deepViolet text-cosmos-deepViolet'
                }`}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
