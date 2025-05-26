import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Gallery from '../components/Gallery';

const GalleryPage = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Sample gallery data with enhanced metadata
  const galleryImages = [
    {
      src: '/images/project1.jpg',
      alt: 'E-commerce Fashion Hub',
      title: 'Fashion E-commerce Platform',
      description: 'Instagram-based fashion store with custom product showcases',
      tags: ['React', 'E-commerce', 'UI Design'],
      date: '2023'
    },
    {
      src: '/images/project2.jpg',
      alt: 'Portfolio Website',
      title: 'Personal Portfolio',
      description: 'Responsive portfolio built with React and Tailwind CSS',
      tags: ['React', 'Tailwind CSS', 'Responsive'],
      date: '2023'
    },
    {
      src: '/images/project3.jpg',
      alt: 'Todo App',
      title: 'Task Management App',
      description: 'Todo application with Firebase integration',
      tags: ['React', 'Firebase', 'Authentication'],
      date: '2022'
    },
    {
      src: '/images/project4.jpg',
      alt: 'Blog Platform',
      title: 'CMS Blog System',
      description: 'Content management system for bloggers',
      tags: ['Node.js', 'React', 'Markdown'],
      date: '2022'
    },
    {
      src: '/images/project5.jpg',
      alt: 'Agricultural Research',
      title: 'Agricultural Machinery Study',
      description: 'Research on modern agricultural equipment',
      tags: ['Research', 'Agriculture', 'Data'],
      date: '2021'
    },
    {
      src: '/images/project6.jpg',
      alt: 'Food Packaging',
      title: 'Food Shelf Life Research',
      description: 'Study of packaging materials on food preservation',
      tags: ['Research', 'Food Science', 'Packaging'],
      date: '2021'
    },
    {
      src: '/images/project7.jpg',
      alt: 'UI Design',
      title: 'Mobile App Interface',
      description: 'Custom mobile application UI design',
      tags: ['UI/UX', 'Figma', 'Mobile'],
      date: '2020'
    },
    {
      src: '/images/project8.jpg',
      alt: 'Brand Identity',
      title: 'Branding Project',
      description: 'Complete brand identity design',
      tags: ['Branding', 'Logo', 'Identity'],
      date: '2020'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                onClick={() => setMenuOpen(false)}
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Gallery
              </Link>
              <Link 
                to="/projects" 
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </Link>
              <Link 
                to="/aboutme" 
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About Me
              </Link>
              <Link 
                to="/contactme" 
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Project Gallery
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A visual showcase of my work and projects. Click on any image to view details.
            </p>
          </div>

          {/* Gallery component */}
          <Gallery images={galleryImages} />

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Want to see more?</h2>
            <Link 
              to="/projects" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300"
            >
              View All Projects
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default GalleryPage;