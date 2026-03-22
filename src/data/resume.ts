export const personalInfo = {
  name: 'Sarvesh Jhawar',
  title: 'Software Engineering Student',
  email: 'sarveshjhawar121@gmail.com',
  github: 'https://github.com/Sarvesh-Jhawar',
  linkedin: 'https://linkedin.com/in/sarvesh-jhawar',
  location: 'India',
  about:
    'Passionate software engineering student building robust backend systems, AI-powered applications, and scalable web platforms. I love turning complex problems into elegant, efficient solutions.',
};

export const stats = [
  { label: 'DSA Problems', value: 590, suffix: '+' },
  { label: 'Users Served', value: 7300, suffix: '+' },
  { label: 'ML Accuracy', value: 95, suffix: '%' },
  { label: 'Page Views', value: 31000, suffix: '+' },
];

export const skills = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'SQL'],
  Backend: ['Node.js', 'Express.js', 'FastAPI', 'Django', 'REST APIs', 'GraphQL'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
  Databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  Concepts: ['Data Structures', 'System Design', 'Machine Learning', 'CI/CD', 'Docker', 'Git'],
};

export const experience = [
  {
    title: 'Software Engineering Intern',
    company: 'Tech Startup',
    date: 'Aug 2025 — Present',
    stardate: 'STARDATE: Aug 2025',
    bullets: [
      'Built and optimized backend APIs serving 7,300+ users with 99.9% uptime',
      'Implemented ML pipelines achieving 95% prediction accuracy',
      'Designed microservices architecture reducing response times by 40%',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Freelance',
    date: 'Jan 2024 — Jul 2025',
    stardate: 'STARDATE: Jan 2024',
    bullets: [
      'Developed web applications generating 31,000+ page views',
      'Integrated AI chatbot systems for automated customer support',
      'Deployed scalable solutions on AWS and Vercel',
    ],
  },
  {
    title: 'Open Source Contributor',
    company: 'GitHub',
    date: 'Jun 2023 — Present',
    stardate: 'STARDATE: Jun 2023',
    bullets: [
      'Contributed to multiple open-source projects with 50+ PRs merged',
      'Maintained personal projects with combined 100+ GitHub stars',
      'Built community tools used by developers worldwide',
    ],
  },
];

export const achievements = [
  {
    title: 'NPTEL Silver Medal',
    description: 'Awarded Silver Medal for outstanding performance in NPTEL certification course',
    icon: '🏆',
    type: 'medal' as const,
  },
  {
    title: 'LeetCode 369 Problems',
    description: 'Solved 369 problems on LeetCode across easy, medium, and hard categories',
    icon: '💻',
    type: 'xp' as const,
    value: 369,
    max: 500,
  },
  {
    title: 'GeeksForGeeks 223 Problems',
    description: 'Solved 223 problems on GeeksForGeeks platform',
    icon: '🧩',
    type: 'xp' as const,
    value: 223,
    max: 500,
  },
  {
    title: 'Smart India Hackathon — Top 30',
    description: 'Selected among Top 30 teams in the Smart India Hackathon national competition',
    icon: '🚀',
    type: 'achievement' as const,
  },
  {
    title: 'Football Runner-Up',
    description: 'Runner-up in inter-college football championship',
    icon: '⚽',
    type: 'achievement' as const,
  },
];

export const education = {
  degree: 'B.Tech in Computer Science',
  university: 'University Name',
  year: '2022 — 2026',
  gpa: '8.5 / 10',
};


