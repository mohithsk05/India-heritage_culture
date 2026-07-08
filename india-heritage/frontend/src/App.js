import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import States from './pages/States';
import StateDetail from './pages/StateDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import BlogEditor from './pages/BlogEditor';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import MyBlogs from './pages/MyBlogs';
import Navbar from './components/Navbar';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a0a00',
              color: '#FFD700',
              border: '1px solid #8B6914',
              fontFamily: 'Lato, sans-serif'
            }
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/states" element={<><Navbar /><States /></>} />
          <Route path="/states/:id" element={<><Navbar /><StateDetail /></>} />
          <Route path="/blog" element={<><Navbar /><BlogList /></>} />
          <Route path="/blog/:id" element={<><Navbar /><BlogDetail /></>} />
          <Route path="/blog/write" element={<><Navbar /><BlogEditor /></>} />
          <Route path="/blog/edit/:id" element={<><Navbar /><BlogEditor /></>} />
          <Route path="/my-blogs" element={<><Navbar /><MyBlogs /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<><Navbar /><AdminDashboard /></>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
