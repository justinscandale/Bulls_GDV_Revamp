import React, {useState, useEffect} from "react";
import {fetchPrefixes, fetchNums} from '../api/courseApi';
import { fetchCourseGrades } from "../api/gradeData";
import Graph from "./Graph";

const CourseQuery = () => {

    const [prefixes, setPrefixes] = useState([]);
    const [nums, setNums] = useState([]);
    const [selectedPrefix, setSelectedPrefix] = useState('');
    const [selectedNum, setSelectedNum] = useState('');
    const [gradeData, setGradeData] = useState(null);

    useEffect(() => {
        //fetch prefixes from backend
        const getPrefixes = async () => {
            const prefixes = await fetchPrefixes();
            const prefixList = prefixes.map(row => row.prefix);
            setPrefixes(prefixList);
        };

        //fetch nums from backend
        const getNums = async (selectedPrefix) => {
            const nums = await fetchNums(selectedPrefix);
            const numList = nums.map(row => row.course_num);
            setNums(numList);
        };

        getPrefixes();
        if(selectedPrefix) getNums(selectedPrefix);
    }, [selectedPrefix]);

    //Handle api call for grades when num and prefix is chosen
    useEffect( () => {
        if(selectedPrefix && selectedNum) {
            fetchCourseGrades(selectedPrefix, selectedNum)
            .then(data => setGradeData(data))
            .catch(error => console.error('Error fetching grades:', error));
        }
    }, [selectedPrefix, selectedNum]);

    const handleChangePrefix = (e) => {
        const course_prefix = e.target.value;
        if(!course_prefix) return;
        setSelectedPrefix(course_prefix);
    };

    const handleChangeNum = (e) => {
        const course_num = e.target.value;
        if(!course_num) return;
        setSelectedNum(course_num);
    };

    return (
        <div className="form-container">
            <h2>Course Query</h2>
            <form>
                <label>
                    Select Course Prefix:
                    <select
                    value = {selectedPrefix}
                    onChange= {handleChangePrefix} >
                        <option value="">Select A Course Prefix</option>
                        {prefixes.map((prefix) => (
                            <option key={prefix} value={prefix}>
                                {prefix}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                {selectedPrefix && (
                    <label>
                        Select A Course Number:
                        <select 
                        value = {selectedNum}
                        onChange={handleChangeNum}>
                            <option value = "">Select A Course Number</option>
                            {nums.map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
            </form>

            {selectedPrefix && selectedNum && <Graph props={{ 
                prefix: selectedPrefix, 
                num: selectedNum}}
            />}

        </div>
    )
}; 

export default CourseQuery;