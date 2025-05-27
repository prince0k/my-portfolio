import React, { useState, useEffect } from "react";
import {
  Github, Linkedin, Mail, Menu, X, Sun, Moon, ChevronLeft, ChevronRight
} from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import Contactme from './pages/Contactme.jsx';
import Projects from './pages/Projects.jsx';
import Aboutme from './pages/Aboutme.jsx';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const sections = ["about", "projects", "contact"];

  const navigateTo = (direction) => {
    const currentIndex = sections.indexOf(activeSection);
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % sections.length
        : (currentIndex - 1 + sections.length) % sections.length;
    setActiveSection(sections[nextIndex]);
  };

  return (
    <Router>
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center relative text-gray-900 dark:text-white transition-colors duration-300`}>
        
        {/* Floating navigation menu */}
        <div className="fixed top-4 left-4 z-50">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            >
              {menuOpen ? <X className="w-6 h-6 text-gray-700 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-white" />}
            </button>

            <div className={`absolute top-14 left-0 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 shadow-xl rounded-lg ${menuOpen ? "max-h-96 p-6 w-64" : "max-h-0 p-0 w-0"}`}>
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveSection("about");
                  }} 
                  className={`text-gray-700 dark:text-white hover:underline ${window.location.pathname === "/" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
                >
                  Home
                </Link>
                <Link 
                  to="/gallery" 
                  onClick={() => setMenuOpen(false)} 
                  className={`text-gray-700 dark:text-white hover:underline ${window.location.pathname === "/gallery" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
                >
                  Gallery
                </Link>
                <Link 
                  to="/projects" 
                  onClick={() => setMenuOpen(false)} 
                  className={`text-gray-700 dark:text-white hover:underline ${window.location.pathname === "/projects" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
                >
                  Projects
                </Link>
                <Link 
                  to="/aboutme" 
                  onClick={() => setMenuOpen(false)} 
                  className={`text-gray-700 dark:text-white hover:underline ${window.location.pathname === "/aboutme" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
                >
                  About Me
                </Link>
                <Link 
                  to="/contactme" 
                  onClick={() => {
                    setMenuOpen(false);
                    if (window.location.pathname === "/") {
                      setActiveSection("contact");
                    }
                  }} 
                  className={`text-gray-700 dark:text-white hover:underline ${window.location.pathname === "/contactme" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
                >
                  Contact Me
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Dark mode toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 hover:scale-110"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Main Routes */}
        <Routes>
          <Route 
            path="/" 
            element={
              <Home
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                navigateTo={navigateTo}
                sections={sections}
              />
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <GalleryPage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            } 
          />
          <Route 
            path="/projects" 
            element={
              <Projects
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            } 
          />
          <Route 
            path="/aboutme" 
            element={
              <Aboutme
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            } 
          />
          <Route 
            path="/contactme" 
            element={
              <Contactme
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}