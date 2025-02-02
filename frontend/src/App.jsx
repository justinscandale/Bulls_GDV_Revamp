// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';

function App() {
  // States for the dropdowns and the data
  const [prefixes, setPrefixes] = useState([]);
  const [coursenums, setCoursenums] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState('');
  const [selectedCourseNum, setSelectedCourseNum] = useState('');
  const [gradedData, setGradedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch prefixes when the component mounts
  useEffect(() => {
    const fetchPrefixes = async () => {
      try {
        const response = await fetch('/api/prefixes');
        const data = await response.json();
        setPrefixes(data);
      } catch (err) {
        setError('Error fetching prefixes');
      }
    };

    fetchPrefixes();
  }, []);

  // Fetch course numbers when the prefix changes
  useEffect(() => {
    if (selectedPrefix) {
      const fetchCourseNums = async () => {
        try {
          const response = await fetch(`/api/coursenums?prefix=${selectedPrefix}`);
          const data = await response.json();
          setCoursenums(data);
        } catch (err) {
          setError('Error fetching course numbers');
        }
      };

      fetchCourseNums();
    }
  }, [selectedPrefix]);

  // Automatically fetch graded data when both prefix and course number are selected
  useEffect(() => {
    if (selectedPrefix && selectedCourseNum) {
      const fetchGradedData = async () => {
        setLoading(true);
        setError(null); // Reset error before submitting
        try {
          const response = await fetch(`/api/gradedata?prefix=${selectedPrefix}&num=${selectedCourseNum}`);
          if (!response.ok) {
            throw new Error('Error fetching graded data');
          }
          const data = await response.json();
          setGradedData(data);
        } catch (err) {
          setError(err.message || 'Error fetching graded data');
        } finally {
          setLoading(false);
        }
      };

      fetchGradedData();
    }
  }, [selectedPrefix, selectedCourseNum]);

  return (
    <div className="App">
      <h1>Course Grading Data</h1>

      {/* Prefix Dropdown */}
      <div>
        <label htmlFor="prefix">Select Prefix:</label>
        <select
          id="prefix"
          value={selectedPrefix}
          onChange={(e) => setSelectedPrefix(e.target.value)}
        >
          <option value="">-- Select Prefix --</option>
          {prefixes.map((prefix) => (
            <option key={prefix} value={prefix}>
              {prefix}
            </option>
          ))}
        </select>
      </div>

      {/* Course Number Dropdown */}
      {selectedPrefix && (
        <div>
          <label htmlFor="courseNum">Select Course Number:</label>
          <select
            id="courseNum"
            value={selectedCourseNum}
            onChange={(e) => setSelectedCourseNum(e.target.value)}
          >
            <option value="">-- Select Course Number --</option>
            {coursenums.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && <p>Loading graded data...</p>}

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Graded Data */}
      {gradedData && (
        <div>
          <h2>Grading Data:</h2>
          <pre>{JSON.stringify(gradedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
