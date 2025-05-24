import { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X, Sun, Moon } from 'lucide-react';
import Gallery from '../components/Gallery';
import { Link } from 'react-router-dom';

const GalleryPage = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const images = [
    { src: '/assets/images/image1.jpg', alt: 'Project Screenshot 1' },
    { src: '/assets/images/image2.jpg', alt: 'Project Screenshot 2' },
    { src: '/assets/images/image3.jpg', alt: 'UI Design' },
    { src: '/assets/images/image4.jpg', alt: 'Mobile App' },
    { src: '/assets/images/image5.jpg', alt: 'Web Design' },
    { src: '/assets/images/image6.jpg', alt: 'Branding' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navigation Menu Button */}
      <div className="fixed top-4 left-4 z-50">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div
            className={`absolute top-14 left-0 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 shadow-xl rounded-lg ${
              menuOpen ? "max-h-96 p-6 w-64" : "max-h-0 p-0 w-0"
            }`}
          >
            <ul className="space-y-4 text-gray-700 dark:text-gray-200">
              <li>
                <Link to="/" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="block px-4 py-2 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contactme" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 hover:scale-110"
        >
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <header className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-2xl rounded-3xl p-10 text-center max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              My Gallery
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              A showcase of projects, designs, and creative works.
            </p>
          </div>
        </header>
        
        <Gallery images={images} />
      </main>

      {/* Footer */}
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
