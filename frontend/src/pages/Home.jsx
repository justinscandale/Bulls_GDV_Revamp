import React from "react";

function Home() {
  return (
    <div className="max-w-screen-lg mx-auto p-8">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 text-green-800">Welcome to Grade-A-Bull!</h1>
            <h2 className="text-2xl text-gray-300">
                Visualize and compare USF course and professor data
            </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h3 className="text-2xl font-semibold mb-6 text-center text-green-700">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-50 rounded-lg text-center">
                    <h4 className="font-bold text-xl mb-3 text-green-800">Professor Statistics</h4>
                    <p className="text-gray-700">Interactive graphs showing historical grading patterns</p>
                </div>
                <div className="p-6 bg-green-50 rounded-lg text-center">
                    <h4 className="font-bold text-xl mb-3 text-green-800">Course Analytics</h4>
                    <p className="text-gray-700">Visual grade distribution comparisons across semesters</p>
                </div>
                <div className="p-6 bg-yellow-50 rounded-lg text-center">
                    <h4 className="font-bold text-xl mb-3 text-yellow-800">Seat Tracker</h4>
                    <p className="text-yellow-700">Course registration monitoring - Coming Soon</p>
                </div>
            </div>
        </div>

        <p className="text-lg text-center italic text-gray-300">
            Empowering USF students with data-driven course insights
        </p>
    </div>
  );
}

export default Home;
