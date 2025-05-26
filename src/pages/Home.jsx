import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = ({ darkMode, setDarkMode, activeSection, setActiveSection, navigateTo, sections }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Section navigation controls - now at the top for better visibility */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 flex justify-center items-center mb-12 space-x-8 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
        <button 
          onClick={() => navigateTo('prev')}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex space-x-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSection === section 
                  ? "bg-blue-600 dark:bg-blue-400 w-6" 
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={() => navigateTo('next')}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero section */}
        <header className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-2xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto overflow-hidden relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl opacity-70"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-70"></div>
            
            <div className="text-left mb-8 md:mb-0 relative z-10">
              <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Hi, I'm Your Name
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                Web Developer | Designer | Creator
              </p>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg">
                I craft beautiful digital experiences with modern technologies and
                user-centered design principles.
              </p>
              <div className="mt-6 flex space-x-4">
                <Link 
                  to="/projects" 
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  View Projects
                </Link>
                <Link 
                  to="/contactme" 
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                  onClick={() => setActiveSection('contact')}
                >
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <img
                src="/your-photo.jpg"
                alt="Your Profile"
                className="relative w-64 h-80 md:w-80 md:h-96 object-cover border-4 border-white dark:border-gray-700 rounded-lg shadow-lg transform group-hover:-translate-y-2 transition duration-300"
              />
            </div>
          </div>
        </header>

        {/* Single section display */}
        <div className="max-w-4xl mx-auto">
          {activeSection === "about" && (
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">👋</span>
                </div>
                <h2 className="text-2xl font-bold">About Me</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm a passionate developer with 5+ years of experience building
                responsive and user-friendly web applications.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                My expertise includes React, Tailwind CSS, Node.js, and modern
                JavaScript frameworks. I love creating intuitive interfaces and
                solving complex problems with elegant solutions.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "JavaScript", "HTML/CSS", "Node.js", "Tailwind", "Git"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  to="/aboutme" 
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  More about me
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          )}

          {activeSection === "projects" && (
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-2xl font-bold">Featured Projects</h2>
              </div>
              <div className="space-y-4">
                {[
                  "Portfolio Website",
                  "Todo App with Firebase",
                  "Blog Platform with CMS",
                  "E-commerce Fashion Hub"
                ].map((project) => (
                  <div
                    key={project}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex justify-between items-center"
                  >
                    <h3 className="font-medium">{project}</h3>
                    <Link 
                      to="/projects" 
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View details
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link 
                  to="/projects" 
                  className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📩</span>
                </div>
                <h2 className="text-2xl font-bold">Get In Touch</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Interested in working together or have questions? Feel free to
                reach out through any of these channels:
              </p>
              <div className="flex justify-center space-x-6 mb-8">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 hover:scale-110"
                >
                  <Github className="w-6 h-6 text-gray-700 dark:text-white" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300 hover:scale-110"
                >
                  <Linkedin className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                </a>
                <a
                  href="mailto:your@email.com"
                  className="w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300 hover:scale-110"
                >
                  <Mail className="w-6 h-6 text-red-600 dark:text-red-300" />
                </a>
              </div>
              <div className="text-center">
                <Link 
                  to="/contactme" 
                  className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-lg hover:from-blue-600 hover:to-green-700 transition-all duration-300"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/" className="hover:text-gray-700 dark:hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/aboutme" className="hover:text-gray-700 dark:hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contactme" className="hover:text-gray-700 dark:hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;