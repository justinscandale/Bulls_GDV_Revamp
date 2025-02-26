import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-700 p-4 fixed top-0 left-0 w-full shadow-md z-10">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link
                    to="/"
                    className="text-xl font-bold"
                    style={{ color: '#CFC493' }}
                >
                    Grade-A-Bull
                    <br />
                    <span className="text-xs">By Justin Scandale</span>
                </Link>

                {/* Hamburger Menu Button */}
                <button 
                    className="md:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="#CFC493" viewBox="0 0 24 24">
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    </svg>
                </button>

                {/* Navigation Links */}
                <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto mt-4 md:mt-0`}>
                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                        <Link
                            to="/grade-distribution"
                            className="bg-[#006747] text-center text-white py-2 px-6 rounded-xl hover:bg-green-900 transition-all"
                            style={{ color: '#CFC493' }}
                        >
                            Grade Distribution
                        </Link>
                        <Link
                            to="/course-registration"
                            className="bg-[#006747] text-center text-white py-2 px-6 rounded-xl hover:bg-green-900 transition-all"
                            style={{ color: '#CFC493' }}
                        >
                            Course Registration
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
