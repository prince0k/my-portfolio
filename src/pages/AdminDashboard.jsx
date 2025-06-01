import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Image, Save, X } from 'lucide-react';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'gallery',
    content: ''
  });

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create post
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error('Failed to create post');
      
      await fetchPosts();
      setNewPost({
        title: '',
        description: '',
        imageUrl: '',
        category: 'gallery',
        content: ''
      });
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  // Update post
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${editingPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPost),
      });

      if (!response.ok) throw new Error('Failed to update post');
      
      await fetchPosts();
      setEditingPost(null);
    } catch (err) {
      setError('Failed to update post. Please try again.');
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete post');
      
      await fetchPosts();
    } catch (err) {
      setError('Failed to delete post. Please try again.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Admin Dashboard</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Create New Post Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Create New Post
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newPost.imageUrl}
                onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({...newPost, category: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="gallery">Gallery</option>
              <option value="blog">Blog</option>
            </select>
            <textarea
              placeholder="Description"
              value={newPost.description}
              onChange={(e) => setNewPost({...newPost, description: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              rows="2"
              required
            />
            {newPost.category === 'blog' && (
              <textarea
                placeholder="Blog Content"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                rows="4"
                required
              />
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="inline-block w-5 h-5 mr-2" />
              Create Post
            </button>
          </form>
        </div>

        {/* Posts List */}
        <div className="grid gap-6">
          {posts.map((post) => (
            <div 
              key={post._id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              {editingPost && editingPost._id === post._id ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                    <input
                      type="text"
                      value={editingPost.imageUrl}
                      onChange={(e) => setEditingPost({...editingPost, imageUrl: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  <select
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="gallery">Gallery</option>
                    <option value="blog">Blog</option>
                  </select>
                  <textarea
                    value={editingPost.description}
                    onChange={(e) => setEditingPost({...editingPost, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    rows="2"
                    required
                  />
                  {editingPost.category === 'blog' && (
                    <textarea
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      rows="4"
                      required
                    />
                  )}
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingPost(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {post.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="text-blue-500 hover:text-blue-600 p-2"
                        title="Edit post"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-500 hover:text-red-600 p-2"
                        title="Delete post"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.description}
                  </p>
                  
                  {post.imageUrl && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {post.category === 'blog' && post.content && (
                    <div className="mt-4 text-gray-600 dark:text-gray-300">
                      <h4 className="font-semibold mb-2">Blog Content:</h4>
                      <p className="whitespace-pre-wrap">{post.content}</p>
                    </div>
                  )}

                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                    <span>
                      Posted: {new Date(post.createdAt).toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span>{post.likes.length} likes</span>
                      <span>{post.comments.length} comments</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 