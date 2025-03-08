import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800">
      <div className="max-w-[2000px] mx-auto px-6 py-4 flex items-center justify-center">
        <p className="text-gray-400 text-sm flex items-center gap-1">
          Made by{' '}
          <a 
            href="https://www.linkedin.com/in/justinscandale/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 transition-colors duration-200 font-medium inline-flex items-center gap-1"
          >
            Justin Scandale
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
  