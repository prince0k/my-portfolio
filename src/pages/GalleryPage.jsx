import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronRight, Heart, MessageCircle } from 'lucide-react';
import Gallery from '../components/Gallery';

const GalleryPage = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');

  // Fetch gallery posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts?category=gallery');
      if (!response.ok) throw new Error('Failed to fetch gallery posts');
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load gallery. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle like
  const handleLike = async (postId) => {
    if (!userEmail) {
      const email = window.prompt('Please enter your email to like this post:');
      if (!email) return;
      setUserEmail(email);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) throw new Error('Failed to like post');
      await fetchPosts();
    } catch (err) {
      setError('Failed to like post. Please try again.');
    }
  };

  // Handle comment submission
  const handleComment = async (e) => {
    e.preventDefault();
    if (!selectedPost) return;

    // Check if we have user information
    if (!userEmail || !userName) {
      setError('Please provide your name and email to comment.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${selectedPost._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          content: comment
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add comment');
      }

      // Refresh the posts to get the updated comments
      await fetchPosts();
      
      // Clear the comment form
      setComment('');
      
      // Show success message
      setError(null);
      
      // Optional: Keep the modal open to show the new comment
      // setSelectedPost(null);
    } catch (err) {
      setError(err.message || 'Failed to add comment. Please try again.');
    }
  };

  // Sample gallery data with placeholder images
  const galleryImages = [
    {
      src: 'https://via.placeholder.com/400x300?text=Project+1',
      alt: 'E-commerce Fashion Hub',
      title: 'Fashion E-commerce Platform',
      description: 'Instagram-based fashion store with custom product showcases',
      tags: ['React', 'E-commerce', 'UI Design'],
      date: '2023'
    },
    {
      src: 'https://via.placeholder.com/400x300?text=Project+2',
      alt: 'Portfolio Website',
      title: 'Personal Portfolio',
      description: 'Responsive portfolio built with React and Tailwind CSS',
      tags: ['React', 'Tailwind CSS', 'Responsive'],
      date: '2023'
    },
    {
      src: 'https://via.placeholder.com/400x300?text=Project+3',
      alt: 'Todo App',
      title: 'Task Management App',
      description: 'Todo application with Firebase integration',
      tags: ['React', 'Firebase', 'Authentication'],
      date: '2022'
    },
    {
      src: 'https://via.placeholder.com/400x300?text=Project+4',
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            {posts.map((post) => (
              <div 
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative pb-[100%]">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`flex items-center space-x-1 ${
                        post.likes.includes(userEmail)
                          ? 'text-red-500'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      <Heart className="w-5 h-5" fill={post.likes.includes(userEmail) ? "currentColor" : "none"} />
                      <span>{post.likes.length}</span>
                    </button>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center space-x-1 text-gray-500 dark:text-gray-400"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Modal */}
          {selectedPost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Comments on "{selectedPost.title}"
                    </h3>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {error}
                    </div>
                  )}

                  {/* Existing Comments */}
                  <div className="space-y-4 mb-6">
                    {selectedPost.comments && selectedPost.comments.length > 0 ? (
                      selectedPost.comments.map((comment, index) => (
                        <div key={index} className="border-b dark:border-gray-700 pb-4">
                          <div className="flex justify-between items-start">
                            <div className="font-medium text-gray-800 dark:text-white">
                              {comment.user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {comment.content}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No comments yet. Be the first to comment!
                      </p>
                    )}
                  </div>

                  {/* Comment Form */}
                  <form onSubmit={handleComment} className="space-y-4">
                    {!userEmail && (
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Your email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                    )}
                    <textarea
                      placeholder="Write a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      rows="3"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                      disabled={!comment.trim()}
                    >
                      {!userEmail ? 'Continue to Comment' : 'Post Comment'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
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