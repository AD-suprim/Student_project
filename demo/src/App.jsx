import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'; // ✅ CHANGED: Added NavLink for active styling
// import './App.css';
import './index.css';

import Home from './pages/Home';
import AddStudent from './pages/AddStudent';

function App() {
  return (
    <Router>
      <div className="p-6 max-w-5xl mx-auto ">
        {/* ✅ CHANGED: Modern Navbar Design */}
        <nav className="bg-white shadow-md rounded-lg p-4 mb-8 flex justify-between items-center">
          <div className="text-4xl font-bold text-gray-800">Student Portal</div>
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-lg font-bold transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white '
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-lg font-bold transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                }`
              }
            >
              Add Student
            </NavLink>
          </div>
        </nav>

        {/* 📦 Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;