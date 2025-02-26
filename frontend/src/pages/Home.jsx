import React from "react";

function Home() {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Grade Distribution App!</h1>
        <h2 className="text-xl text-center mb-4">
          This tool is designed to aid USF students with course registration and grade distribution analysis. 
          By providing insights into past courses and professor grading patterns, we aim to promote academic fairness 
          and help students make informed decisions during registration.
        </h2>
        <p className="text-md text-center italic font-light">
          Built to ensure a more equitable academic experience for students at the University of South Florida.
        </p>
    </div>
  );
}

export default Home;
