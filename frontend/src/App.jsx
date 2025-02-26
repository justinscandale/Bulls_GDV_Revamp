import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import GradeDistribution from './pages/GradeDistribution';
import CourseRegistration from './pages/CourseRegistration';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      {/* Root container with flex column layout and full screen height */}
      <div className="flex flex-col">
        
        {/* Header */}
        <Header />
        {/* Main content area, set to grow and fill remaining space */}
        <main className="mt-16 flex-grow max-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grade-distribution" element={<GradeDistribution />} />
            <Route path="/course-registration" element={<CourseRegistration />} />
          </Routes>
        </main>
        
        {/* Footer
        <Footer />  */}
      </div>
    </Router>
  );
}

export default App;
