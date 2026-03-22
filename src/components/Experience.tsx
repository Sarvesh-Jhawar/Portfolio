import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { experience } from '../data/resume';

const Experience: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="experience" className="relative">
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
            Mission Log
          </h2>
          <p className={`font-body text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            // experience timeline
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div
            className={`absolute left-4 sm:left-8 top-0 bottom-0 w-px ${
              isDark ? 'bg-cosmos-purple/30' : 'bg-cosmos-deepViolet/30'
            }`}
          />

          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative pl-12 sm:pl-20 pb-10 sm:pb-12 last:pb-0"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-2.5 sm:left-6.5 top-1 w-3 h-3 rounded-full ring-4 ${
                  isDark
                    ? 'bg-cosmos-purple ring-cosmos-purple/20'
                    : 'bg-cosmos-deepViolet ring-cosmos-deepViolet/20'
                }`}
              />

              {/* Mission Patch */}
              <div className="text-2xl mb-2">🛰️</div>

              {/* Stardate */}
              <p
                className={`font-body text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-cosmos-blue' : 'text-cosmos-skyBlue'
                }`}
              >
                {exp.stardate}
              </p>

              {/* Card */}
              <div
                className={`rounded-xl p-5 sm:p-6 transition-all duration-300 ${
                  isDark
                    ? 'glass-dark neon-border hover:shadow-lg hover:shadow-purple-500/15'
                    : 'glass-light neon-border-light hover:shadow-lg hover:shadow-violet-500/15'
                }`}
              >
                <h3
                  className={`font-heading font-semibold text-lg sm:text-xl mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {exp.title}
                </h3>
                <p
                  className={`font-body text-sm mb-4 ${
                    isDark ? 'text-cosmos-pink' : 'text-cosmos-rose'
                  }`}
                >
                  @ {exp.company}
                </p>

                <ul className="space-y-2">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className={`font-body text-sm flex items-start gap-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          isDark ? 'bg-cosmos-purple/60' : 'bg-cosmos-deepViolet/60'
                        }`}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
