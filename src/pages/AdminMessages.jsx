import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError('Failed to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a message
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete message');
      
      // Remove message from state
      setMessages(messages.filter(msg => msg._id !== id));
    } catch (err) {
      setError('Failed to delete message. Please try again.');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Admin Messages</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No messages found.
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message._id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {message.name}
                    </h3>
                    <a 
                      href={`mailto:${message.email}`} 
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {message.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(message._id)}
                    className="text-red-500 hover:text-red-600 p-2"
                    title="Delete message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  {message.message}
                </p>
                
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Received: {new Date(message.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages; 