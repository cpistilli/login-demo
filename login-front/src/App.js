import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CitiesPage from './pages/CitiesPage';
import WeatherDetallePage from './pages/WeatherDetallePage';

function isAuth() {
    return localStorage.getItem('loggedIn') === 'true';
}
function PrivateRoute({ children }) {
    return isAuth() ? children : <Navigate to="/" replace />;
}

function App() {
  return(
      <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/app/cities" element={<PrivateRoute><CitiesPage /></PrivateRoute>} />
            <Route path="/app/weather/:city" element={<PrivateRoute><WeatherDetallePage /></PrivateRoute>} />
        </Routes>
      </Router>
  );
}

export default App;
