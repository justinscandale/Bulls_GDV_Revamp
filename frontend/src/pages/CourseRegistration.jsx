import React from "react";
import SeatQuery from "../components/SeatQuery";

function CourseRegistration() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="w-full bg-gray-800/30 border-b border-gray-700/50">
        <div className="max-w-[2000px] mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Course Registration
          </h1>
          <SeatQuery /> {/* Seat Query Component */}
          <p className="text-xl text-gray-300">
            Track course availability and registration trends in real-time
          </p>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="w-full py-16 px-6">
        <div className="max-w-[2000px] mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              We're working hard to bring you real-time course registration tracking. 
              Soon you'll be able to monitor seat availability, waitlist status, and 
              receive notifications when spots open up in your desired courses.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold opacity-50 cursor-not-allowed"
                disabled
              >
                Track Courses
              </button>
              <button 
                className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold opacity-50 cursor-not-allowed"
                disabled
              >
                Set Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;