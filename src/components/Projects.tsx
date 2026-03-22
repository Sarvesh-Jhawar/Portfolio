import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projects';
import { languageColors } from '../hooks/useGitHub';

const Projects: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section id="projects" className="relative">
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
            Space Stations
          </h2>
          <p className={`font-body text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {"// projects deployed across the cosmos"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-xl p-5 sm:p-6 transition-all duration-300 will-change-transform ${
                isDark
                  ? 'glass-dark hover:shadow-xl hover:shadow-purple-500/20'
                  : 'glass-light hover:shadow-xl hover:shadow-violet-500/20'
              } ${
                project.featured
                  ? isDark
                    ? 'border border-cosmos-pink/40 shadow-lg shadow-pink-500/10'
                    : 'border border-cosmos-rose/40 shadow-lg shadow-rose-500/10'
                  : isDark
                  ? 'neon-border'
                  : 'neon-border-light'
              }`}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div
                  className={`absolute -top-3 left-4 px-3 py-1 rounded-full text-xs font-body font-semibold ${
                    isDark
                      ? 'bg-cosmos-pink/20 text-cosmos-pink border border-cosmos-pink/30'
                      : 'bg-cosmos-rose/20 text-cosmos-rose border border-cosmos-rose/30'
                  }`}
                >
                  ⭐ FEATURED MISSION
                </div>
              )}

              {/* Project Name & GitHub Link */}
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={`font-heading font-semibold text-lg sm:text-xl pr-2 transition-colors duration-300 ${
                    isDark
                      ? 'text-white group-hover:text-cosmos-purple'
                      : 'text-gray-900 group-hover:text-cosmos-deepViolet'
                  }`}
                >
                  {project.name}
                </h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`flex-shrink-0 mt-1 p-1 rounded-md transition-all duration-300 hover:scale-110 ${
                    isDark
                      ? 'text-gray-500 hover:text-cosmos-purple hover:bg-cosmos-purple/10'
                      : 'text-gray-400 hover:text-cosmos-deepViolet hover:bg-cosmos-deepViolet/10'
                  }`}
                  title="View on GitHub"
                >
                  <FiExternalLink size={16} />
                </a>
              </div>

              {/* Description */}
              <p
                className={`font-body text-sm mb-4 line-clamp-2 min-h-[40px] ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {project.shortDescription}
              </p>

              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-body font-medium ${
                    isDark
                      ? 'bg-cosmos-purple/15 text-cosmos-purple border border-cosmos-purple/20'
                      : 'bg-cosmos-deepViolet/10 text-cosmos-deepViolet border border-cosmos-deepViolet/20'
                  }`}
                >
                  {project.category}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  {/* Language */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          languageColors[project.language] || '#8b8b8b',
                      }}
                    />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {project.language}
                    </span>
                  </div>

                  {/* Tech count */}
                  <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                    {project.techStack.length} techs
                  </span>
                </div>

                {/* View Details Link */}
                <Link
                  to={`/project/${project.id}`}
                  className={`inline-flex items-center gap-1 text-xs font-body font-medium transition-all duration-300 group/link ${
                    isDark
                      ? 'text-cosmos-purple hover:text-cosmos-blue'
                      : 'text-cosmos-deepViolet hover:text-cosmos-skyBlue'
                  }`}
                >
                  Details
                  <FiArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
