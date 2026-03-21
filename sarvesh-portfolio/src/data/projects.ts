export interface Testimonial {
  name: string;
  role: string;
  comment: string;
}

export interface SocialProof {
  linkedinPostUrl?: string;
  stats: { label: string; value: string; icon: string }[];
  rating: { score: number; total: number; count: number };
  testimonials: Testimonial[];
  favoriteFeatures: string[];
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  keyFeatures: string[];
  githubUrl: string;
  language: string;
  category: string;
  featured: boolean;
  highlights: string[];
  architecture: string;
  challengesSolved: { problem: string; solution: string }[];
  socialProof?: SocialProof;
}

export const projects: Project[] = [
  {
    id: 'attendance-erp',
    name: 'Attendance ERP',
    shortDescription:
      'Full-stack web app automating attendance extraction and campus engagement for educational institutions.',
    description:
      'A specialized platform designed to automate and streamline attendance tracking and campus engagement. It eliminates manual attendance tracking errors by scraping institutional portals and consolidates disparate campus information (events, clubs, forms) into a single user interface.',
    techStack: [
      'Java 17',
      'Spring Boot 3.3',
      'Next.js 14',
      'Python 3',
      'Tailwind CSS',
      'Shadcn/UI',
      'Vercel Analytics',
    ],
    keyFeatures: [
      'Automated Attendance Extraction via Python-based scraper',
      'Interactive Student Dashboard with subject-wise attendance & timetable',
      'Campus Engagement Hub for clubs, events, and recruitment forms',
      'Streak Tracking to monitor user activity streaks',
      'JSON-driven Event Management System',
    ],
    githubUrl: 'https://github.com/Sarvesh-Jhawar/attendance-erp',
    language: 'Java',
    category: 'Full Stack',
    featured: true,
    highlights: [
      'Developed a full-stack Attendance ERP using Spring Boot and Next.js, automating data retrieval from institutional portals for over 5,000 potential campus users.',
      'Engineered a Python-based extraction engine integrated with a Java backend via ProcessBuilder to scrape and structure legacy HTML data into RESTful JSON responses.',
      'Designed a responsive campus dashboard with Next.js 14 and Tailwind CSS, centralizing attendance analytics, club directories, and event management.',
    ],
    architecture:
      'A Java Spring Boot service acts as an orchestrator, handling business logic and invoking an internal Python script (extractor.py) for specialized data extraction. The frontend is a modern Next.js 14 application using the App Router, styled with a mobile-first approach using Tailwind CSS.',
    challengesSolved: [
      {
        problem: 'Cross-Language Integration',
        solution:
          'Integrated a Python scraping engine into a Java Spring Boot environment using ProcessBuilder, leveraging Python\'s robust scraping libraries within a Java enterprise framework.',
      },
      {
        problem: 'UI/UX Consolidation',
        solution:
          'Resolved "portal fatigue" by designing a unified dashboard that combines attendance with social campus features like clubs and recruitment forms.',
      },
    ],
    socialProof: {
      linkedinPostUrl:
        'https://www.linkedin.com/posts/sarvesh-jhawar_attendancetracker-erp-cbit-activity-7352735568822218754-GCyx',
      stats: [
        { label: 'Visitors', value: '7,500+', icon: '👥' },
        { label: 'Page Views', value: '31,600+', icon: '📄' },
        { label: 'Search Clicks', value: '2.48K', icon: '🔍' },
        { label: 'Impressions', value: '46.1K', icon: '👁️' },
        { label: 'Bounce Rate', value: '28%', icon: '📊' },
        { label: 'Google Traffic', value: '81%', icon: '🌐' },
      ],
      rating: { score: 5.0, total: 5, count: 26 },
      testimonials: [
        {
          name: 'Akash Koti',
          role: 'Managing Executive, Propall · Director, Jayaraj Trust',
          comment:
            'This is such a great idea! Are you guys developing a business model for this?',
        },
        {
          name: 'Devansh Makam',
          role: 'AI Engineer | ML & Data Specialist @ Youngsoft India',
          comment:
            'Impressive work! All the Best, you are doing great already. The logic behind the skipped classes calculator is a thoughtful feature.',
        },
        {
          name: 'Varsha',
          role: 'CSE / CSM / IOT | CBIT',
          comment:
            'Its really cool kudos to uh guys!! The Attendance Analyzer is really helpful with visualization and percentage calculation. A feature for mentoring book tracking would be a great addition!',
        },
        {
          name: 'Taruna Mulugur',
          role: 'SEP Intern @JPMC | CSE CBIT \'26',
          comment:
            'Great work!! Calculator for number of classes you can skip — brilliant idea!',
        },
        {
          name: 'Tahura Tahreem',
          role: 'EEE Department | CBIT',
          comment:
            'This is best!!! Thanks for creating... I can actually plan my day accordingly.',
        },
        {
          name: 'Aisha Khan',
          role: 'Sophomore at CBIT | Joint Secretary @Chaitanya Astra',
          comment:
            'Extremely needed, this was genuinely required, thank you!!',
        },
        {
          name: 'Abdul Raheem',
          role: 'Information Technology | Amazon MLSS\'25 | CBIT\'27',
          comment:
            'Surely something everyone needed. Good work!!',
        },
        {
          name: 'Charan',
          role: 'CSE / CSM / IOT | CBIT',
          comment:
            'Plan attendance feature is great! It helps users manage breaks and still maintain required attendance.',
        },
        {
          name: 'Akshay',
          role: 'CSE / CSM / IOT | CBIT',
          comment:
            'Mark your attendance section is really useful, especially the ability to add attendance for individual subjects!',
        },
        {
          name: 'Nikhil Akkenapally',
          role: 'AI Developer Intern @VISWAM.AI | B.E. IT Student at CBIT',
          comment: 'Great work! Really inspiring and well presented.',
        },
        {
          name: 'Dikshant Singh',
          role: 'Aspiring AI & Software Engineer | Deep Learning, MERN Stack',
          comment: 'Amazing man, great work 👏',
        },
        {
          name: 'Deepthi',
          role: 'CSE / CSM / IOT | CBIT',
          comment:
            'Planning our attendance & checking all other updates directly in one website is amazing.',
        },
        {
          name: 'Ishaan Prasad',
          role: 'CSE / CSM / IOT | CBIT',
          comment: 'Plan your attendance is a great feature! Also excited for a notification system.',
        },
        {
          name: 'Yedla Sai Bhavani',
          role: 'CSE / CSM / IOT | CBIT',
          comment:
            'I like that before going to college we can check how much attendance is increasing or decreasing. And recruitment forms for clubs!',
        },
        {
          name: 'Aniruth Reddy',
          role: 'CSE / CSM / IOT | CBIT',
          comment: 'We can check our attendance for so many classes. It is already a perfect website!',
        },
        {
          name: 'Bennuri Aishwariya',
          role: 'CSE / CSM / IOT | CBIT',
          comment: 'Coloring, fast response, planning our day — everything is great!',
        },
        {
          name: 'Mohini Jangala',
          role: 'IT Department | CBIT',
          comment:
            'The visualization and design of dashboard with all equipped fields is great!',
        },
        {
          name: 'Sarvesh Jhawar',
          role: 'IT Department | CBIT',
          comment: '5 stars, very easy to use!',
        },
        {
          name: 'Srichandana',
          role: 'IT Department | CBIT',
          comment: 'Loved the website and the analyzer! No bugs and very smooth.',
        },
        {
          name: 'Manideep',
          role: 'IT Department | CBIT',
          comment: 'Annaya thop annaya nuvvu! I love the tool.',
        },
        {
          name: 'Krishna Manohar',
          role: 'IT Department | CBIT',
          comment: 'The calculator feature is excellent!',
        },
        {
          name: 'Pratick',
          role: 'AI/ML Engineer at Optum',
          comment:
            'Incredible work, this will help the students a lot.',
        },
        {
          name: 'Dasika Vishwanadh',
          role: 'MBA | CBIT',
          comment: 'Everything about the tool is great. Looking forward to frequent updates!',
        },
        {
          name: 'M Nitesh Kumar',
          role: 'Pursuing MBA at CBIT, Hyderabad',
          comment: 'Absolutely amazing work!',
        },
      ],
      favoriteFeatures: [
        'Plan Your Attendance',
        'Attendance Calculator',
        'Attendance Visualization',
        'Dashboard UI & Design',
        'Fast Response Time',
        'Check Attendance Before College',
        'Mark Your Attendance',
        'Club Recruitment Forms',
        'All Updates in One Place',
      ],
    },
  },
  {
    id: 'cyberrakshak',
    name: 'CyberRakshak',
    shortDescription:
      'Full-stack cybersecurity incident reporting and management platform with ML-based threat detection.',
    description:
      'A comprehensive cybersecurity incident reporting and management platform that integrates machine learning models for threat detection, a FastAPI backend, and a Next.js frontend dashboard to provide an end-to-end platform for cybersecurity management.',
    techStack: [
      'Python',
      'FastAPI',
      'Next.js',
      'Firebase Firestore',
      'Scikit-learn',
      'JWT',
      'Pydantic',
    ],
    keyFeatures: [
      'JWT-based Authentication & Role-Based Access Control',
      'Structured Cyber Incident Reporting with tracking',
      'ML-based Phishing Detection analyzing emails & URLs',
      'ML-based Malware Detection using system-level metrics',
      'Admin Analytics Dashboard for threat monitoring',
      'AI Chat Support for user guidance',
      'Real-time Notification System',
    ],
    githubUrl: 'https://github.com/Sarvesh-Jhawar/CyberRakshak-v.1.0',
    language: 'Python',
    category: 'Full Stack + ML',
    featured: true,
    highlights: [
      'Developed CyberRakshak, a full-stack cybersecurity incident management platform using FastAPI, Next.js, and Firebase Firestore.',
      'Integrated machine learning models (Scikit-learn) for automated phishing and malware detection within the incident analysis pipeline.',
      'Built a scalable RESTful API architecture with FastAPI, supporting incident tracking, notifications, and AI-driven assistance.',
    ],
    architecture:
      'The frontend is a Next.js App Router application with separate user and admin dashboards. The backend is a FastAPI service exposing REST APIs for authentication, incidents, notifications, and ML-powered threat analysis. Firebase Firestore provides scalable NoSQL storage.',
    challengesSolved: [
      {
        problem: 'Integrating ML Models into API',
        solution:
          'Loaded pre-trained models using joblib and created a dedicated service layer (ml_service.py) to handle real-time inference within API requests.',
      },
      {
        problem: 'Secure Authentication',
        solution:
          'Implemented JWT-based authentication with role-based access control to protect sensitive incident data.',
      },
      {
        problem: 'Real-time Data Handling',
        solution:
          'Used Firebase Firestore NoSQL database for scalable storage of large numbers of incident reports.',
      },
    ],
  },
  {
    id: 'enterprise-saas-backend',
    name: 'Enterprise SaaS Backend',
    shortDescription:
      'Multi-tenant Spring Boot backend serving multiple independent businesses from a single instance.',
    description:
      'A high-performance, single-instance backend that supports multiple frontend clients (tenants) using path-based multi-tenancy. It eliminates code bloat and high infrastructure costs associated with deploying separate backend instances for every new client.',
    techStack: [
      'Java 21',
      'Spring Boot 3.4',
      'Spring Security 6',
      'Spring Data JPA',
      'PostgreSQL',
      'Docker',
      'Lombok',
    ],
    keyFeatures: [
      'Dynamic Path-Based Multi-tenancy via URL slugs',
      'Strict Data Isolation with tenant_id filtering',
      'Tenant-Aware Authentication scoping admin logins',
      'Soft Deletion for data integrity preservation',
      'Automated SEO-friendly Image Naming',
      'Multi-stage Docker builds for deployment',
    ],
    githubUrl: 'https://github.com/Sarvesh-Jhawar/Enterprises-Backend',
    language: 'Java',
    category: 'Backend',
    featured: false,
    highlights: [
      'Architected a multi-tenant SaaS backend using Spring Boot 3 and Java 21, serving multiple independent clients from a single application instance.',
      'Engineered a robust path-based tenant resolution system and custom security filters that enforce strict data isolation across 10+ API endpoints.',
      'Optimized database performance with a shared-schema architecture using PostgreSQL and Spring Data JPA.',
    ],
    architecture:
      'Layered architecture (Controller → Service → Repository) following a Single Database, Shared Schema multi-tenancy model. Tenant context is resolved from URL slugs via TenantResolver, and SecurityConfig ensures session persistence and CORS for specific frontend domains.',
    challengesSolved: [
      {
        problem: 'Cross-Tenant Security',
        solution:
          'Implemented a custom authentication flow where AdminUserDetails stores the tenantId. Every admin write operation verifies the URL slug matches the admin\'s authorized tenantId.',
      },
      {
        problem: 'Deployment Environment Consistency',
        solution:
          'Addressed JDBC driver and dialect issues for cloud platforms by explicitly configuring PostgreSQLDialect and session cookie security settings.',
      },
    ],
  },
  {
    id: 'endless-tic-tac-toe',
    name: 'Endless Tic-Tac-Toe',
    shortDescription:
      'Full-stack game where only the last 3 moves persist, preventing draws and increasing strategic depth.',
    description:
      'A full-stack web application featuring an "Endless" Tic-Tac-Toe variant where only a limited number of marks can exist on the board at once, forcing older moves to disappear. This introduces dynamic board management to ensure a definitive winner.',
    techStack: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'React.js',
      'Tailwind CSS',
      'H2 Database',
      'Docker',
    ],
    keyFeatures: [
      'Endless Move Logic — only last 3 moves per player remain',
      'Multi-Mode Gameplay: Local Play & Play with AI',
      'Global Leaderboard with competitive ranking system',
      'Intelligent AI using heuristic-based decision-making',
      'Immersive UI with particle backgrounds & confetti effects',
    ],
    githubUrl: 'https://github.com/sarvesh-jhawar/endless-tic-tac-toe',
    language: 'Java',
    category: 'Full Stack',
    featured: false,
    highlights: [
      'Developed a full-stack Spring Boot and React application featuring a unique Tic-Tac-Toe variant with dynamic board state management.',
      'Implemented an AI opponent service in Java using heuristic-based decision-making for a challenging user experience.',
      'Engineered a Global Leaderboard system using Spring Data JPA and H2 Database for real-time score tracking.',
    ],
    architecture:
      'Layered Architecture (Controller-Service-Repository) built with Spring Boot on the backend. Component-based React architecture using Context API for global sound management on the frontend. AI moves are calculated server-side and returned via REST API.',
    challengesSolved: [
      {
        problem: 'State Synchronization',
        solution:
          'Managed the "fading" move logic on the frontend to ensure the UI correctly reflects the 3-move limit before a player commits a new action.',
      },
      {
        problem: 'Responsive Game Board',
        solution:
          'Utilized Tailwind CSS to ensure the game board remains playable across mobile and desktop resolutions.',
      },
    ],
  },
  {
    id: 'malware-detection-ml',
    name: 'Malware Detection ML',
    shortDescription:
      'Machine learning system achieving 99.2% accuracy in classifying malicious vs. benign PE files.',
    description:
      'A supervised machine learning project designed to identify malicious software by analyzing Portable Executable (PE) header features. It utilizes machine learning to recognize patterns in file metadata to distinguish between benign and malicious files, addressing limitations of traditional signature-based detection.',
    techStack: [
      'Python',
      'Scikit-learn',
      'Pandas',
      'Matplotlib',
      'Seaborn',
      'Joblib',
    ],
    keyFeatures: [
      'Static PE Analysis using numeric header features',
      'Automated Preprocessing pipeline for data cleaning',
      'Random Forest Classifier with 99.2% accuracy',
      'Detailed Performance Evaluation with confusion matrix',
      'Model Serialization for production deployment',
    ],
    githubUrl:
      'https://github.com/sarvesh-jhawar/cybersecurity-malware-detection',
    language: 'Python',
    category: 'Machine Learning',
    featured: false,
    highlights: [
      'Developed a malware detection system using Python and Scikit-learn, achieving 99.2% accuracy in classifying malicious vs. benign PE files.',
      'Engineered a robust data preprocessing pipeline to extract and clean PE header features using Random Forest algorithms.',
      'Implemented model serialization using Joblib for efficient deployment and offline inference without retraining.',
    ],
    architecture:
      'Sequential pipeline: Raw CSV data is ingested via Pandas → Features are separated and cleaned → Data is split 80/20 → Random Forest model is trained and saved as .pkl → Saved model is loaded for predictions and evaluated with confusion matrices.',
    challengesSolved: [
      {
        problem: 'Feature Engineering',
        solution:
          'Dropped high-cardinality string columns and identified the most relevant numeric PE header features (SizeOfCode, SizeOfHeapReserve, NumberOfSections, etc.) for optimal classification.',
      },
      {
        problem: 'High Recall for Security',
        solution:
          'Achieved 1.00 recall for the malware class, which is critical in security to minimize false negatives (missed threats).',
      },
    ],
  },
  {
    id: 'climate-risk-disaster-management',
    name: 'Climate Risk & Disaster Management',
    shortDescription:
      'End-to-end data science project predicting natural disaster categories using NASA EONET data.',
    description:
      'An end-to-end data science project that analyzes and predicts natural disaster categories (Wildfires, Severe Storms, Volcanoes, etc.) using historical event data from NASA EONET. It helps in understanding global disaster patterns and provides a predictive mechanism using geographical coordinates and temporal data.',
    techStack: [
      'Python',
      'Streamlit',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
    ],
    keyFeatures: [
      'Exploratory Data Analysis with frequency visualizations',
      'Feature Engineering from geometry strings & timestamps',
      'Random Forest Classifier with 100% test accuracy',
      'Interactive Streamlit Web Dashboard for real-time predictions',
      'Model Comparison across Decision Trees, Logistic Regression, KNN, and SVM',
    ],
    githubUrl:
      'https://github.com/sarvesh-jhawar/climate-risk-and-disaster-management.-aicte-',
    language: 'Python',
    category: 'Data Science',
    featured: false,
    highlights: [
      'Developed a disaster prediction system using Python and Scikit-Learn, achieving 100% accuracy in categorizing global natural disasters.',
      'Engineered a real-time web dashboard with Streamlit, enabling users to visualize disaster locations on interactive maps.',
      'Architected a data pipeline to preprocess NASA EONET data, including complex string parsing of geographical coordinates and temporal feature extraction.',
    ],
    architecture:
      'Python-based backend handles data ingestion, feature extraction, and model inference. A Streamlit interactive UI provides a sidebar for user inputs and a main dashboard for visualizations (maps, confidence bar charts, and heatmaps). The processed data flows from CSV → Feature Engineering → trained .pkl model → predicted class mapped back to human-readable labels.',
    challengesSolved: [
      {
        problem: 'Complex Data Parsing',
        solution:
          'Successfully converted complex coordinate strings into distinct numerical Latitude and Longitude features for the ML model.',
      },
      {
        problem: 'Imbalanced Data Handling',
        solution:
          'Addressed the variety of disaster categories through careful preprocessing and model selection (Random Forest).',
      },
    ],
  },
  {
    id: 'instatwist-social-media',
    name: 'InstaTwist Social Media',
    shortDescription:
      'Multi-functional social media platform combining image-based posts and text-based tweets with real-time messaging.',
    description:
      'A multi-functional social media web application that combines features of image-centric platforms (like Instagram) and text-centric platforms (like Twitter). It provides a unified space for sharing visual content and short-form text updates while maintaining real-time interaction through messaging and notifications.',
    techStack: [
      'Java',
      'Servlets',
      'JSP',
      'JDBC',
      'MySQL',
      'Bootstrap',
      'JavaScript/AJAX',
      'Maven',
    ],
    keyFeatures: [
      'Hybrid Content Feed with image Posts and text Tweets',
      'Full Like & Comment systems for all content types',
      'Follow/Unfollow networking subsystem',
      'Real-Time Direct Messaging between users',
      'Automated Notification Engine for social interactions',
      'Live Search for discovering other users',
    ],
    githubUrl:
      'https://github.com/sarvesh-jhawar/instatwist-social-media-platform-',
    language: 'Java',
    category: 'Full Stack',
    featured: false,
    highlights: [
      'Architected a hybrid social media platform using Java Servlets and JSP, supporting both image-based and text-based content sharing.',
      'Implemented a robust Data Access Layer (DAO) with JDBC and MySQL, managing complex relational data including self-referencing user-follow relationships.',
      'Enhanced UX by integrating AJAX-driven features for live search and instant social interactions, reducing page load requirements.',
    ],
    architecture:
      'Follows the MVC (Model-View-Controller) pattern using Servlets as Controllers, Java Classes as Models, and JSPs as Views. Server-side rendered pages are enhanced with client-side JavaScript for interactive elements like live search and chat updates. Data flows from JSP → Servlet → DAO → MySQL via JDBC.',
    challengesSolved: [
      {
        problem: 'Follow-based Feed Filtering',
        solution:
          'Wrote complex SQL joins to dynamically filter the Posts and Follows tables to show only relevant content from a user\'s network.',
      },
      {
        problem: 'Asynchronous Interactions',
        solution:
          'Used AJAX within JSP/Servlets to allow "Like" and "Search" without full page refresh, improving the user experience.',
      },
      {
        problem: 'File Upload Management',
        solution:
          'Managed server-side storage for profile and post images via the CreatePostServlet.',
      },
    ],
  },
];
