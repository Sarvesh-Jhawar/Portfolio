import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/resume';

const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link as fallback
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socials = [
    { icon: FiGithub, label: 'GitHub', href: personalInfo.github },
    { icon: FiLinkedin, label: 'LinkedIn', href: personalInfo.linkedin },
    { icon: FiMail, label: 'Email', href: `mailto:${personalInfo.email}` },
  ];

  return (
    <section id="contact" className="relative">
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
            Hail Frequency
          </h2>
          <p className={`font-body text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {"// open a channel"}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`rounded-2xl p-6 sm:p-8 md:p-10 mb-10 transition-all duration-400 ${
              isDark ? 'glass-dark neon-border' : 'glass-light neon-border-light'
            }`}
          >
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className={`block font-body text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Callsign (Name)
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Commander..."
                  className={`w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all duration-300 ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cosmos-purple focus:shadow-lg focus:shadow-purple-500/10'
                      : 'bg-black/5 border border-black/10 text-gray-900 placeholder-gray-400 focus:border-cosmos-deepViolet focus:shadow-lg focus:shadow-violet-500/10'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className={`block font-body text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Frequency (Email)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@signal.com"
                  className={`w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all duration-300 ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cosmos-purple focus:shadow-lg focus:shadow-purple-500/10'
                      : 'bg-black/5 border border-black/10 text-gray-900 placeholder-gray-400 focus:border-cosmos-deepViolet focus:shadow-lg focus:shadow-violet-500/10'
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className={`block font-body text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Transmission (Message)
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Begin transmission..."
                  className={`w-full px-4 py-3 rounded-xl font-body text-sm outline-none resize-none transition-all duration-300 ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cosmos-purple focus:shadow-lg focus:shadow-purple-500/10'
                      : 'bg-black/5 border border-black/10 text-gray-900 placeholder-gray-400 focus:border-cosmos-deepViolet focus:shadow-lg focus:shadow-violet-500/10'
                  }`}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-body font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : isDark
                    ? 'bg-cosmos-purple text-white hover:shadow-lg hover:shadow-purple-500/30'
                    : 'bg-cosmos-deepViolet text-white hover:shadow-lg hover:shadow-violet-500/30'
                }`}
              >
                {submitted ? (
                  '✅ Transmission Sent!'
                ) : (
                  <>
                    Send Transmission 📡
                    <FiSend />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 sm:gap-6"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-4 rounded-xl transition-all duration-300 ${
                  isDark
                    ? 'glass-dark neon-border hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110'
                    : 'glass-light neon-border-light hover:shadow-lg hover:shadow-violet-500/20 hover:scale-110'
                }`}
                aria-label={social.label}
              >
                <social.icon
                  size={24}
                  className={`transition-colors duration-300 ${
                    isDark
                      ? 'text-gray-400 group-hover:text-cosmos-purple'
                      : 'text-gray-500 group-hover:text-cosmos-deepViolet'
                  }`}
                />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
