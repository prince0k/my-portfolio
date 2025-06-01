# My Portfolio Website

A modern portfolio website built with React, Node.js, and MongoDB, featuring a gallery, blog system, and contact form.

## Features

- 🎨 Modern and responsive design
- 🌓 Dark/Light mode
- 📸 Gallery with likes and comments
- 📝 Blog system
- 📬 Contact form
- 🔐 Admin dashboard
- 💾 MongoDB integration

## Tech Stack

- Frontend:
  - React
  - React Router
  - Tailwind CSS
  - Lucide React Icons

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server (from backend directory)
   npm start

   # Start frontend server (from root directory)
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
my-portfolio/
├── src/                  # Frontend source files
│   ├── components/      # React components
│   ├── pages/          # Page components
│   └── App.js          # Main App component
├── backend/             # Backend source files
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── server.js       # Express server
└── public/             # Static files
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

Feel free to submit issues and enhancement requests.

## License

[MIT](LICENSE)
