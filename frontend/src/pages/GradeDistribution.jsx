import React, { useState } from "react";
import CourseQuery from "../components/CourseQuery";
import ProfessorQuery from "../components/ProfessorQuery";

const GradeDistribution = () => {
    const [selectedQuery, setSelectedQuery] = useState(null);

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="w-full bg-gray-800/30 border-b border-gray-700/50">
                <div className="max-w-[2000px] mx-auto px-6 py-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                        Grade Distribution Visualizer
                    </h1>
                    <p className="text-xl text-gray-300">
                        Query by course or professor to generate dynamic grade distribution graphs
                    </p>
                </div>
            </div>

            {/* Query Selection */}
            <div className="w-full py-8 px-6">
                <div className="max-w-[2000px] mx-auto">
                    <div className="flex justify-center space-x-4 mb-8">
                        <button 
                            onClick={() => setSelectedQuery('course')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                selectedQuery === 'course'
                                    ? 'bg-green-600 text-white scale-105'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            Course Query
                        </button>
                        <button 
                            onClick={() => setSelectedQuery('professor')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                selectedQuery === 'professor'
                                    ? 'bg-green-600 text-white scale-105'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            Professor Query
                        </button>
                    </div>

                    {/* Query Components */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                        {selectedQuery === 'course' && <CourseQuery />}
                        {selectedQuery === 'professor' && <ProfessorQuery />}
                        {!selectedQuery && (
                            <div className="text-center text-gray-400 py-12">
                                Select a query type above to begin your search
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradeDistribution;