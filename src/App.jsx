import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserDetail from './pages/UserDetail';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="container fade-in">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
