import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AboutUs from './pages/AboutUs';
import Book from './pages/Book';
import Feedback from './pages/Feedback';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Login from './components/auth/LoginForm';
import Register from './components/auth/RegisterForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<AboutUs />} />
                <Route path="/help" element={<Help />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  path="/book"
                  element={
                    <ProtectedRoute>
                      <Book />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feedback"
                  element={
                    <ProtectedRoute>
                      <Feedback />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;