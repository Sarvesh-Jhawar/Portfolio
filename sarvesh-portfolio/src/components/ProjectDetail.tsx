import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiGithub,
  FiLayers,
  FiZap,
  FiCpu,
  FiTarget,
  FiAward,
  FiBarChart2,
  FiStar,
  FiMessageCircle,
  FiHeart,
  FiTrendingUp,
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projects';
import { languageColors } from '../hooks/useGitHub';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!project) {
    return (
      <div className="section-padding flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={`font-heading font-bold text-3xl sm:text-4xl mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            🚀 Mission Not Found
          </h2>
          <p
            className={`font-body text-base mb-8 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            This space station doesn't exist in our galaxy.
          </p>
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 ${
              isDark
                ? 'bg-cosmos-purple/20 text-cosmos-purple border border-cosmos-purple/30 hover:bg-cosmos-purple/30'
                : 'bg-cosmos-deepViolet/10 text-cosmos-deepViolet border border-cosmos-deepViolet/30 hover:bg-cosmos-deepViolet/20'
            }`}
          >
            <FiArrowLeft size={16} />
            Return to Base
          </Link>
        </motion.div>
      </div>
    );
  }

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative pt-20 sm:pt-24">
      <div className="section-padding">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-all duration-300 cursor-pointer ${
              isDark
                ? 'text-gray-400 hover:text-cosmos-purple hover:bg-cosmos-purple/10'
                : 'text-gray-500 hover:text-cosmos-deepViolet hover:bg-cosmos-deepViolet/10'
            }`}
          >
            <FiArrowLeft size={16} />
            Back to Projects
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 ${
            isDark ? 'glass-dark' : 'glass-light'
          } ${
            project.featured
              ? isDark
                ? 'border border-cosmos-pink/30 shadow-lg shadow-pink-500/10'
                : 'border border-cosmos-rose/30 shadow-lg shadow-rose-500/10'
              : isDark
              ? 'neon-border'
              : 'neon-border-light'
          }`}
        >
          {/* Featured Badge */}
          {project.featured && (
            <div
              className={`absolute -top-3 left-6 px-4 py-1 rounded-full text-xs font-body font-semibold ${
                isDark
                  ? 'bg-cosmos-pink/20 text-cosmos-pink border border-cosmos-pink/30'
                  : 'bg-cosmos-rose/20 text-cosmos-rose border border-cosmos-rose/30'
              }`}
            >
              ⭐ FEATURED MISSION
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Category + Language */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${
                    isDark
                      ? 'bg-cosmos-purple/15 text-cosmos-purple border border-cosmos-purple/20'
                      : 'bg-cosmos-deepViolet/10 text-cosmos-deepViolet border border-cosmos-deepViolet/20'
                  }`}
                >
                  {project.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        languageColors[project.language] || '#8b8b8b',
                    }}
                  />
                  <span
                    className={`text-xs font-body ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {project.language}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1
                className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 ${
                  isDark ? 'shimmer-text' : 'shimmer-text-light'
                }`}
              >
                {project.name}
              </h1>

              {/* Description */}
              <p
                className={`font-body text-base sm:text-lg leading-relaxed max-w-3xl ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {project.description}
              </p>
            </div>

            {/* GitHub CTA */}
            <div className="flex-shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-cosmos-purple/20 text-cosmos-purple border border-cosmos-purple/30 hover:bg-cosmos-purple/30 hover:shadow-lg hover:shadow-purple-500/20'
                    : 'bg-cosmos-deepViolet/10 text-cosmos-deepViolet border border-cosmos-deepViolet/30 hover:bg-cosmos-deepViolet/20 hover:shadow-lg hover:shadow-violet-500/20'
                }`}
              >
                <FiGithub size={18} />
                View on GitHub
              </a>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Section (Stats, Ratings, Testimonials) - HIGHLIGHTED AT TOP */}
        {project.socialProof && (
          <div className="space-y-8 mb-12">
            {/* Section Header */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5 }}
              className="text-center mb-4"
            >
              <h2
                className={`font-heading font-bold text-2xl sm:text-3xl lg:text-4xl mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                🌟 Student Impact & Community Feedback
              </h2>
              <p className={`font-body text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Real-world traction and feedback from the CBIT student community.
              </p>
            </motion.div>

            {/* Performance Stats */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`rounded-2xl p-6 sm:p-8 ${
                isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
              } ${
                isDark ? 'border-cosmos-blue/30' : 'border-cosmos-skyBlue/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? 'bg-cosmos-blue/15' : 'bg-cosmos-skyBlue/10'
                  }`}
                >
                  <FiBarChart2
                    size={20}
                    className={isDark ? 'text-cosmos-blue' : 'text-cosmos-skyBlue'}
                  />
                </div>
                <h2
                  className={`font-heading font-bold text-xl sm:text-2xl ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Mission Reach & Performance
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {project.socialProof.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl text-center ${
                      isDark ? 'bg-white/[0.03] border border-white/5' : 'bg-gray-50 border border-blue-100/50'
                    }`}
                  >
                    <span className="text-2xl mb-2">{stat.icon}</span>
                    <span className={`text-xl font-bold font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {stat.value}
                    </span>
                    <span className={`text-xs font-body ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials & Rating */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Rating Card */}
              <motion.div
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`rounded-2xl p-8 flex flex-col items-center justify-center text-center ${
                  isDark ? 'glass-dark neon-border shadow-lg shadow-yellow-500/5' : 'glass-light neon-border-light shadow-lg shadow-yellow-500/5'
                }`}
              >
                <div className="mb-4 relative">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-5xl text-yellow-500 mb-2 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                  >
                    <FiStar fill="currentColor" />
                  </motion.div>
                  <div className={`text-5xl font-bold font-heading ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.socialProof.rating.score.toFixed(1)}
                  </div>
                  <div className={`text-sm font-body mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Average Rating
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={20} fill="currentColor" className="text-yellow-500" />
                  ))}
                </div>
                <p className={`text-sm font-body ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Based on <strong>{project.socialProof.rating.count}</strong> student responses via Google Forms
                </p>
                {project.socialProof.linkedinPostUrl && (
                  <a
                    href={project.socialProof.linkedinPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center gap-2 text-xs font-semibold font-body transition-all duration-300 ${
                      isDark ? 'text-cosmos-purple hover:text-cosmos-pink' : 'text-cosmos-deepViolet hover:text-cosmos-rose'
                    }`}
                  >
                    View Original LinkedIn Post <FiTrendingUp size={14} />
                  </a>
                )}
              </motion.div>

              {/* Testimonials Feed */}
              <motion.div
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`lg:col-span-2 rounded-2xl p-6 sm:p-8 ${
                  isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? 'bg-cosmos-purple/15' : 'bg-cosmos-deepViolet/10'
                    }`}
                  >
                    <FiMessageCircle
                      size={20}
                      className={isDark ? 'text-cosmos-purple' : 'text-cosmos-deepViolet'}
                    />
                  </div>
                  <h2
                    className={`font-heading font-bold text-xl sm:text-2xl ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Student Feedback Feed
                  </h2>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-4"
                  >
                    {project.socialProof.testimonials.map((t, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className={`p-5 rounded-xl border ${
                          isDark 
                            ? 'bg-white/[0.02] border-white/5 hover:border-cosmos-purple/30' 
                            : 'bg-white border-gray-100 hover:border-cosmos-deepViolet/20 shadow-sm'
                        } transition-all duration-300`}
                      >
                        <p className={`text-sm font-body italic mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          "{t.comment}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                            isDark ? 'bg-cosmos-purple/20 text-cosmos-purple' : 'bg-cosmos-deepViolet/10 text-cosmos-deepViolet'
                          }`}>
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className={`text-sm font-heading font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</h4>
                            <p className={`text-[10px] font-body ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Favorite Features Tag Cloud */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`rounded-2xl p-6 sm:p-8 ${
                isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? 'bg-cosmos-pink/15' : 'bg-cosmos-rose/10'
                  }`}
                >
                  <FiHeart
                    size={20}
                    className={isDark ? 'text-cosmos-pink' : 'text-cosmos-rose'}
                  />
                </div>
                <h2
                  className={`font-heading font-bold text-xl sm:text-2xl ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Student Fan Favorites
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.socialProof.favoriteFeatures.map((feature, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
                    className={`px-4 py-2 rounded-lg text-xs font-body font-semibold transition-all duration-300 ${
                      isDark
                        ? 'bg-cosmos-pink/10 text-cosmos-pink border border-cosmos-pink/20 hover:bg-cosmos-pink/20'
                        : 'bg-cosmos-rose/5 text-cosmos-rose border border-cosmos-rose/10 hover:bg-cosmos-rose/15'
                    }`}
                  >
                    #{feature.replace(/\s+/g, '')}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Tech Stack */}
        <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
          <div
            className={`rounded-2xl p-6 sm:p-8 ${
              isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? 'bg-cosmos-blue/15' : 'bg-cosmos-skyBlue/10'
                }`}
              >
                <FiLayers
                  size={20}
                  className={isDark ? 'text-cosmos-blue' : 'text-cosmos-skyBlue'}
                />
              </div>
              <h2
                className={`font-heading font-bold text-xl sm:text-2xl ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Tech Stack
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-white/5 text-gray-300 border border-white/10 hover:border-cosmos-purple/30 hover:text-cosmos-purple'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-cosmos-deepViolet/30 hover:text-cosmos-deepViolet'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Features & Architecture - 2 column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Features */}
          <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.2 }}>
            <div
              className={`h-full rounded-2xl p-6 sm:p-8 ${
                isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? 'bg-cosmos-purple/15' : 'bg-cosmos-deepViolet/10'
                  }`}
                >
                  <FiZap
                    size={20}
                    className={
                      isDark ? 'text-cosmos-purple' : 'text-cosmos-deepViolet'
                    }
                  />
                </div>
                <h2
                  className={`font-heading font-bold text-xl sm:text-2xl ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Key Features
                </h2>
              </div>
              <ul className="space-y-3">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${
                        isDark ? 'bg-cosmos-purple' : 'bg-cosmos-deepViolet'
                      }`}
                    />
                    <span
                      className={`font-body text-sm leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Architecture */}
          <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.3 }}>
            <div
              className={`h-full rounded-2xl p-6 sm:p-8 ${
                isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? 'bg-cosmos-pink/15' : 'bg-cosmos-rose/10'
                  }`}
                >
                  <FiCpu
                    size={20}
                    className={isDark ? 'text-cosmos-pink' : 'text-cosmos-rose'}
                  />
                </div>
                <h2
                  className={`font-heading font-bold text-xl sm:text-2xl ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  System Architecture
                </h2>
              </div>
              <p
                className={`font-body text-sm leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {project.architecture}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Challenges Solved */}
        <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.4 }} className="mb-8">
          <div
            className={`rounded-2xl p-6 sm:p-8 ${
              isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? 'bg-cosmos-blue/15' : 'bg-cosmos-skyBlue/10'
                }`}
              >
                <FiTarget
                  size={20}
                  className={isDark ? 'text-cosmos-blue' : 'text-cosmos-skyBlue'}
                />
              </div>
              <h2
                className={`font-heading font-bold text-xl sm:text-2xl ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Challenges Solved
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.challengesSolved.map((challenge, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] ${
                    isDark
                      ? 'bg-white/[0.03] border border-white/5 hover:border-cosmos-purple/20'
                      : 'bg-gray-50 border border-gray-100 hover:border-cosmos-deepViolet/20'
                  }`}
                >
                  <h3
                    className={`font-heading font-semibold text-sm mb-2 ${
                      isDark ? 'text-cosmos-purple' : 'text-cosmos-deepViolet'
                    }`}
                  >
                    🔧 {challenge.problem}
                  </h3>
                  <p
                    className={`font-body text-sm leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {challenge.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.5 }} className="mb-12">
          <div
            className={`rounded-2xl p-6 sm:p-8 ${
              isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-2 rounded-lg ${
                  isDark ? 'bg-cosmos-pink/15' : 'bg-cosmos-rose/10'
                }`}
              >
                <FiAward
                  size={20}
                  className={isDark ? 'text-cosmos-pink' : 'text-cosmos-rose'}
                />
              </div>
              <h2
                className={`font-heading font-bold text-xl sm:text-2xl ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                Key Highlights
              </h2>
            </div>
            <ul className="space-y-4">
              {project.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.01] ${
                    isDark
                      ? 'bg-white/[0.03] border border-white/5 hover:border-cosmos-pink/20'
                      : 'bg-gray-50 border border-gray-100 hover:border-cosmos-rose/20'
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm ${
                      isDark
                        ? 'bg-cosmos-pink/15 text-cosmos-pink'
                        : 'bg-cosmos-rose/10 text-cosmos-rose'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`font-body text-sm leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>


        {/* Bottom CTAs */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8"
        >
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-cosmos-purple text-white hover:shadow-lg hover:shadow-purple-500/30'
                : 'bg-cosmos-deepViolet text-white hover:shadow-lg hover:shadow-violet-500/30'
            }`}
          >
            <FiGithub size={18} />
            View Source Code
          </a>
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-white/5 text-gray-300 border border-white/10 hover:border-cosmos-purple/30'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-cosmos-deepViolet/30'
            }`}
          >
            <FiArrowLeft size={16} />
            All Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
