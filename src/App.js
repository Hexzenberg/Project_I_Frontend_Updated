import React, { useEffect, useState } from 'react';
import './App.css';
import NewsFetcher from './components/NewsFetcher';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import Login from './components/Login';
import Register from './components/Register';
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState(null); // Track authentication status

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Your Daily News</h1>
        </header>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Route for NewsFetcher */}
          <Route
            path="/"
            element={
              <PrivateRoute user={user}>
                <NewsFetcher />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
