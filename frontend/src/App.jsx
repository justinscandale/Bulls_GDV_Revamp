import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import GradeDistribution from './pages/GradeDistribution';
import CourseRegistration from './pages/CourseRegistration';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Footer from './components/Footer';
import OAuth from './pages/OAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_O_AUTH_CLIENT_ID}>
      <Router>
        <div className="absolute inset-0 min-h-screen w-full flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden">
          <Header />
          <main className="flex-1 w-full mt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grade-distribution" element={<GradeDistribution />} />
              <Route path="/course-registration" element={<CourseRegistration />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/oauth" element={<OAuth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
