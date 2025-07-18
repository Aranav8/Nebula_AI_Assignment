import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import LoginPage from './pages/LoginPage';
    import DashboardPage from './pages/DashboardPage';
    import ProtectedRoute from './components/common/ProtectedRoute';
    import SignupPage from './pages/SignupPage';

    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </Router>
      );
    }

    export default App;