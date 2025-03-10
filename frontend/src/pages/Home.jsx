import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full">
      {/* Stats Bar */}
      <div className="w-full bg-gray-800/30 border-b border-gray-700/50">
        <div className="max-w-[2000px] mx-auto px-6 py-4 flex justify-center space-x-16">
          <div className="text-center">
            <span className="block text-3xl font-bold text-green-500">10,873</span>
            <span className="text-gray-400">Courses Tracked</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-green-500">2,931</span>
            <span className="text-gray-400">Professors Analyzed</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-green-500">383,062</span>
            <span className="text-gray-400">Grade Entries</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="w-full py-24 px-6">
        <div className="max-w-[2000px] mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Welcome to Grade-A-Bull
          </h1>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
            Your comprehensive analytics platform for USF course and professor insights
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full bg-gray-900/30 py-24">
        <div className="max-w-[2000px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-green-400">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Professor Statistics Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300">
              <div className="text-green-500 mb-4 text-4xl">📊</div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Professor Statistics</h3>
              <p className="text-gray-400">
                Explore detailed grade distributions and historical teaching patterns to make informed decisions about your professors.
              </p>
            </div>

            {/* Course Analytics Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300">
              <div className="text-green-500 mb-4 text-4xl">📈</div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Course Analytics</h3>
              <p className="text-gray-400">
                Compare grade distributions across different sections and semesters to optimize your academic journey.
              </p>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300">
              <div className="text-yellow-500 mb-4 text-4xl">⭐</div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Seat Tracker</h3>
              <p className="text-gray-400">
                Coming Soon: Real-time monitoring of course availability and registration trends.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full py-24 px-6">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-green-400">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-green-400">Search</h3>
              <p className="text-gray-400">Enter a course code or professor name</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-green-400">Analyze</h3>
              <p className="text-gray-400">View comprehensive grade distributions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2 text-green-400">Compare</h3>
              <p className="text-gray-400">Compare different sections and professors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 text-green-400">Decide</h3>
              <p className="text-gray-400">Make informed registration decisions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Insights Section */}
      <div className="w-full bg-gray-900/30 py-24 px-6">
        <div className="max-w-[2000px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-green-400">Data Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-green-400">Historical Trends</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Multi-semester grade analysis
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Professor teaching patterns
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Course difficulty tracking
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-green-400">Real-time Updates</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Latest grade distributions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Current semester tracking
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Registration period alerts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full py-24 px-6">
        <div className="max-w-[2000px] mx-auto text-center">
          <p className="text-2xl text-gray-300 italic mb-12">
            Make data-driven decisions for your academic success at USF
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link 
              to="/grade-distribution" 
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl font-bold text-lg border border-gray-600 hover:border-green-500/50 shadow-lg shadow-gray-900/30 hover:shadow-green-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2">📊</span>
                Explore Grade Data
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/course-registration" 
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl font-bold text-lg border border-gray-600 hover:border-green-500/50 shadow-lg shadow-gray-900/30 hover:shadow-green-900/20 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2">🎯</span>
                Course Registration
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
