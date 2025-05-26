import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, X, Sun, Moon } from 'lucide-react';
import Gallery from '../components/Gallery';

const GalleryPage = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Sample images - replace with your actual images
  const images = [
    { src: '/assets/images/image1.jpg', alt: 'Project Screenshot 1' },
    { src: '/assets/images/image2.jpg', alt: 'Project Screenshot 2' },
    { src: '/assets/images/image3.jpg', alt: 'UI Design' },
    { src: '/assets/images/image4.jpg', alt: 'Mobile App' },
    { src: '/assets/images/image5.jpg', alt: 'Web Design' },
    { src: '/assets/images/image6.jpg', alt: 'Branding' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
            )}
          </button>
          
          <div
            className={`absolute top-14 left-0 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 shadow-xl rounded-lg ${
              menuOpen ? "max-h-96 p-6 w-64" : "max-h-0 p-0 w-0"
            }`}
          >
            <ul className="space-y-4 text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  to="/"
                  className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="block w-full text-left px-4 py-2 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutme"
                  className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contactme"
                  className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-white" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                </a>
                <a
                  href="mailto:your@email.com"
                  className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5 text-red-600 dark:text-red-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark mode toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 hover:scale-110"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Main content */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            My Gallery
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore my collection of projects, designs, and creative works. Each piece represents a unique challenge and solution.
          </p>
          <Gallery images={images} />
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

export default GalleryPage;