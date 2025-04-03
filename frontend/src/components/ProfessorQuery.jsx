import React, {useState, useEffect} from "react";
import Graph from "./Graph";
import Select from 'react-select';

const ProfessorQuery = () => {

    const [professors, setProfessors] = useState([]); //State to store professor options
    const [selectedProfessor, setSelectedProfessor] = useState(''); //State to store selected professor
    const [profObject, setProfObject] = useState(null); //State to store selected professor object
    //Fetch professor options from backend
    useEffect( () => {
        const fetchProfessors = async () => {
            try{
                const response = await fetch('/api/professors')
                const data = await response.json();
                const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
                setProfessors(sortedData.map(prof => ({value: prof.name, label: prof.name})));
            }
            catch(error){
                console.error('Error fetching professors:', error);
            }
        };

        fetchProfessors();
    }, []);

    const handleChange = (e) => {
        const name = e.value;
        if(!name) return;
        setSelectedProfessor(name);

        const [lname, fname] = name.split(', ');
        const profObject = {lname, fname};
        setProfObject(profObject);
    }

    return (
        <div className="form-container">
            <form>
            <Select
                value={selectedProfessor ? { value: selectedProfessor, label: selectedProfessor } : null}
                onChange={handleChange}
                options={professors}
                isClearable={false}
                isSearchable={true}
                placeholder="Enter Professor Name (Last, First)"
                className="basic-single"
                classNamePrefix="select text-white bg-gray-800"
                menuPortalTarget={document.body}
                styles={{
                    option: (provided) => ({
                        ...provided,
                        color: '#000000'
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: '#000000'
                    })
                }}
                    />
            </form>

            {selectedProfessor && <Graph props={profObject}/>}
        </div>
    )
}; 

export default ProfessorQuery;