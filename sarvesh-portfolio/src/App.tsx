import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Experience />
    <Achievements />
    <Contact />
  </>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Background */}
        <StarField />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
