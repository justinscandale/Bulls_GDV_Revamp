import React, { useState, useEffect } from 'react';

const SavedCourses = () => {
    const [savedCourses, setSavedCourses] = useState([]);
    const [error, setError] = useState('');

    const handleRemoveCourse = async (course_crn) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch(`/api/saved-courses/${course_crn}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove course');
            }

            // Update local state
            setSavedCourses(prev => prev.filter(course => course.course_crn !== course_crn));
        } catch (error) {
            console.error('Error removing course:', error);
            setError('Failed to remove course');
        }
    };

    useEffect(() => {
        const fetchSavedCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch('/api/saved-courses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSavedCourses(data);
                }
            } catch (error) {
                console.error('Error fetching saved courses:', error);
                setError('Failed to load saved courses');
            }
        };

        fetchSavedCourses();
    }, []);

    if (error) {
        return (
            <div className="p-4 bg-red-500/20 border border-red-500 rounded text-red-200">
                {error}
            </div>
        );
    }

    if (savedCourses.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl text-gray-300">No saved courses yet</h3>
                <p className="text-gray-400 mt-2">Courses you save will appear here</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {savedCourses.map((course) => (
                <div 
                    key={course.course_crn}
                    className="bg-gray-800/50 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {course.course_prefix} {course.course_number}
                            </h3>
                            <p className="text-gray-300 text-sm">{course.course_title}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-sm ${
                            course.seats_available > 0 
                                ? 'bg-green-500/20 text-green-300' 
                                : 'bg-red-500/20 text-red-300'
                        }`}>
                            {course.seats_available} seats
                        </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-400">
                        <p>Section: {course.course_section}</p>
                        <p>CRN: {course.course_crn}</p>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={() => handleRemoveCourse(course.course_crn)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SavedCourses; 