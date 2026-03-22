import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { achievements } from '../data/resume';

const Achievements: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="achievements" className="relative">
      <div className="section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className={`font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-3 ${
              isDark ? 'shimmer-text' : 'shimmer-text-light'
            }`}
          >
            Hall of Fame
          </h2>
          <p className={`font-body text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {"// achievements unlocked"}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5 }}
              className={`rounded-xl p-5 sm:p-6 transition-all duration-300 will-change-transform ${
                isDark
                  ? 'glass-dark neon-border hover:shadow-lg hover:shadow-purple-500/20'
                  : 'glass-light neon-border-light hover:shadow-lg hover:shadow-violet-500/20'
              }`}
            >
              {/* Icon */}
              <div className="text-3xl sm:text-4xl mb-3">
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className={`font-heading font-semibold text-base sm:text-lg mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className={`font-body text-xs sm:text-sm mb-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {item.description}
              </p>

              {/* XP Bar for applicable items */}
              {item.type === 'xp' && item.value && item.max && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span
                      className={`font-body font-medium ${
                        isDark ? 'text-cosmos-blue' : 'text-cosmos-skyBlue'
                      }`}
                    >
                      XP: {item.value}
                    </span>
                    <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                      / {item.max}
                    </span>
                  </div>
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-white/10' : 'bg-black/10'
                    }`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.value / item.max) * 100}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className={`h-full rounded-full ${
                        isDark
                          ? 'bg-gradient-to-r from-cosmos-purple to-cosmos-blue shadow-sm shadow-purple-500/50'
                          : 'bg-gradient-to-r from-cosmos-deepViolet to-cosmos-skyBlue shadow-sm shadow-violet-500/50'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Medal shimmer for trophy items */}
              {item.type === 'medal' && (
                <div
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-body font-semibold ${
                    isDark
                      ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
                  }`}
                >
                  🥈 Silver Medal
                </div>
              )}

              {/* Achievement badge */}
              {item.type === 'achievement' && (
                <div
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-body font-semibold ${
                    isDark
                      ? 'bg-cosmos-purple/10 text-cosmos-purple border border-cosmos-purple/20'
                      : 'bg-cosmos-deepViolet/10 text-cosmos-deepViolet border border-cosmos-deepViolet/20'
                  }`}
                >
                  🏅 Achievement Unlocked
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
