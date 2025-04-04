import React, {useState, useEffect} from "react";
import {fetchPrefixes, fetchNums} from '../api/courseApi';
import { fetchCourseGrades } from "../api/gradeData";
import Graph from "./Graph";
import Select from 'react-select';

const SavedSeats = () => {

    const [savedSeats, setSavedSeats] = useState([]);

    useEffect(() => {
        //fetch saved seats for user form backend
        const getSavedSeats = async () => {
            const seats = await fetchSavedSeats();
            setSavedSeats(seats);
        };

        //getSavedSeats();


    }, []);


    //function to delete seat from saved seats for user
    // const handleDelete = (index) => {
    //     const updatedSeats = [...savedSeats];
    //     updatedSeats.splice(index, 1);
    //     setSavedSeats(updatedSeats);
    // };

    return (
        <div className="form-container flex justify-center items-center">
                <label>
                    <span className="text-white">Saved Seats</span>
                </label>
                <br/>
        </div>
    )
}; 

export default SavedSeats;