import React, { useState, useEffect } from 'react';
import SeatQuery from "../components/SeatQuery";
import SeatViewer from "../components/SavedSeats";
import { Link, useLocation, useNavigate } from 'react-router-dom';

function CourseRegistration() {
    const navigate = useNavigate();
    const [view, setView] = useState('registration');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-6">
            {/* Header Section - Moved above navigation */}
            <div className="w-full border-b border-gray-700/50 mb-6">
                <div className="max-w-[2000px] mx-auto px-4 sm:px-6 py-4 sm:py-6 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                        Course Availability Tracker
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300">
                        Track course availability and registration trends in real-time
                    </p>
                    {!isLoggedIn && (
                        <div className="mt-3 sm:mt-4 text-sm text-gray-400">
                            Login to save courses and get notified when seats become available
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {isLoggedIn && (
                        <>
                            <button
                                onClick={() => setView('registration')}
                                className={`w-1/3 sm:w-auto px-3 sm:px-4 py-2 ${view === 'registration' ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-700 text-white rounded-md transition-colors text-sm sm:text-base`}
                            >
                                Search Courses
                            </button>
                            <button
                                onClick={() => setView('saved')}
                                className={`w-1/3 sm:w-auto px-3 sm:px-4 py-2 ${view === 'saved' ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-700 text-white rounded-md transition-colors text-sm sm:text-base`}
                            >
                                Saved Courses
                            </button>
                        </>
                    )}
                </div>
                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            setIsLoggedIn(false);
                            setView('registration');
                        }}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm sm:text-base"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/oauth')}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm sm:text-base"
                    >
                        Login to Save Courses
                    </button>
                )}
            </div>

            {view === 'registration' ? (
                <div className="w-full">
                    {/* Main Content */}
                    <div className="w-full py-8 sm:py-16 px-4 sm:px-6">
                        <div className="max-w-[2000px] mx-auto"> 
                            <div className="backdrop-blur-sm rounded-2xl p-6 sm:p-12 border border-gray-700 text-center">
                                <SeatQuery/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Saved courses content */}
                    <SeatViewer />
                </div>
            )}
        </div>
    );
}

export default CourseRegistration;