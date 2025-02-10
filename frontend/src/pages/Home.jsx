import React, {useState} from "react";
import CourseQuery from "../components/CourseQuery";
import ProfessorQuery from "../components/ProfessorQuery";

const Home = () => {
    const [selectedQuery, setSelectedQuery] = useState(null); // state to track selected form to display

    return (
        <div className="home-page">
            <header>
                <h1>Grade Distribution Visualizer</h1>
                <p>Here you can query by course of professor to generate dyanmic graphs</p>
            </header>

            <div className="buttons">
                <button className="btn btn-light mx-2" onClick={() => setSelectedQuery('course')}>Course Query</button>
                <button onClick={()=> setSelectedQuery('professor')}>Professor Query</button>
            </div>

            {selectedQuery === 'course' && <CourseQuery />}
            {selectedQuery === 'professor' && <ProfessorQuery />}
        </div>
    )
}

export default Home;