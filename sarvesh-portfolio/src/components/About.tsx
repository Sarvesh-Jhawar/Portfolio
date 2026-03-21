import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, stats } from '../data/resume';

const About: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="about" className="relative">
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
            Mission Control
          </h2>
          <p className={`font-body text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            // about.me
          </p>
        </motion.div>

        {/* About Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`rounded-2xl p-6 sm:p-8 md:p-10 mb-12 transition-all duration-400 ${
            isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
          }`}
        >
          <p
            className={`font-body text-base sm:text-lg leading-relaxed max-w-3xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {personalInfo.about}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className={`rounded-xl p-5 sm:p-6 text-center transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'glass-dark neon-border hover:shadow-lg hover:shadow-purple-500/20'
                  : 'glass-light neon-border-light hover:shadow-lg hover:shadow-violet-500/20'
              }`}
            >
              <div
                className={`font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-2 ${
                  isDark ? 'text-cosmos-purple' : 'text-cosmos-deepViolet'
                }`}
              >
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <p className={`font-body text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
