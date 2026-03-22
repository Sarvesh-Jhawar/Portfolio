import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { skills } from '../data/resume';

const categoryIcons: Record<string, string> = {
  Languages: '💻',
  Backend: '⚙️',
  Frontend: '🎨',
  Databases: '🗄️',
  Concepts: '🧠',
};

const Skills: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="skills" className="relative">
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
            Crew Manifest
          </h2>
          <p className={`font-body text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {"// skills & technologies"}
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`group rounded-xl p-5 sm:p-6 transition-all duration-300 hover:scale-[1.02] ${
                isDark
                  ? 'glass-dark neon-border hover:shadow-lg hover:shadow-purple-500/20'
                  : 'glass-light neon-border-light hover:shadow-lg hover:shadow-violet-500/20'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl sm:text-3xl">{categoryIcons[category] || '📦'}</span>
                <h3
                  className={`font-heading font-semibold text-lg sm:text-xl ${
                    isDark ? 'text-cosmos-purple' : 'text-cosmos-deepViolet'
                  }`}
                >
                  {category}
                </h3>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: Math.random() > 0.5 ? 2 : -2 }}
                    className={`px-3 py-1.5 rounded-full font-body text-xs sm:text-sm font-medium transition-all duration-300 cursor-default ${
                      isDark
                        ? 'bg-white/5 text-gray-300 border border-white/10 hover:border-cosmos-purple/50 hover:text-cosmos-purple hover:bg-cosmos-purple/10'
                        : 'bg-black/5 text-gray-600 border border-black/10 hover:border-cosmos-deepViolet/50 hover:text-cosmos-deepViolet hover:bg-cosmos-deepViolet/10'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
