import React, {useState, useEffect} from "react";
import Graph from "./Graph";

const ProfessorQuery = () => {

    const [professors, setProfessors] = useState([]); //State to store professor options
    const [selectedProfessor, setSelectedProfessor] = useState(''); //State to store selected professor
    const [profObject, setProfObject] = useState(null); //State to store selected professor object
    //Fetch professor options from backend
    useEffect( () => {
        const fetchProfessors = async () => {
            try{
                const response = await fetch('http://localhost:5000/api/professors')
                const data = await response.json();
                setProfessors(data);
            }
            catch(error){
                console.error('Error fetching professors:', error);
            }
        };

        fetchProfessors();
    }, []);

    const handleChange = (e) => {
        const name = e.target.value;
        if(!name) return;
        setSelectedProfessor(name);

        const [lname, fname] = name.split(', ');
        const profObject = {lname, fname};
        setProfObject(profObject);
    }

    return (
        <div className="form-container">
            <h2>Professor Query</h2>
            <form>
                <label>
                    Select Professor:
                    <select
                    value={selectedProfessor}
                    onChange={handleChange}>
                    <option value="">Select a professor</option>
                    {professors.map((professor) => (
                        <option key={professor.name} value={professor.name}>
                            {professor.name}
                        </option>
                    ))}
                    </select>
                </label>
            </form>

            {selectedProfessor && <Graph props={profObject}/>}
        </div>
    )
}; 

export default ProfessorQuery;