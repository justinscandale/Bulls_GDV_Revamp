import React, {useState, useEffect} from "react";
import {fetchPrefixes, fetchNums} from '../api/courseApi';
import { fetchCourseGrades } from "../api/gradeData";
import Graph from "./Graph";
import Select from 'react-select';

const CourseQuery = () => {

    const [prefixOptions, setPrefixOptions] = useState({});
    const [numOptions, setNumOptions] = useState({});
    const [selectedPrefix, setSelectedPrefix] = useState('');
    const [selectedNum, setSelectedNum] = useState('');
    const [gradeData, setGradeData] = useState(null);

    useEffect(() => {
        //fetch prefixes from backend
        const getPrefixes = async () => {
            const prefixes = await fetchPrefixes();
            const prefixList = prefixes.map(row => row.prefix);
            const sortedData = prefixList.sort((a, b) => a.localeCompare(b));
            setPrefixOptions(sortedData.map(prefix => ({value: prefix, label: prefix})));
        };

        //fetch nums from backend
        const getNums = async (selectedPrefix) => {
            const nums = await fetchNums(selectedPrefix);
            const numList = nums.map(row => row.course_num);
            const sortedData = numList.sort((a, b) => a>b);
            setNumOptions(sortedData.map(num => ({value: num, label: num})));
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
        const course_prefix = e.value;
        if(!course_prefix) return;
        setSelectedPrefix(course_prefix);
        setSelectedNum('');
    };

    const handleChangeNum = (e) => {
        const course_num = e.value;
        if(!course_num) return;
        setSelectedNum(course_num);
    };

    return (
        <div className="form-container">
            <form>
                <label>
                    <Select
                            value={selectedPrefix ? { value: selectedPrefix, label: selectedPrefix } : null}
                            onChange={handleChangePrefix}
                            options={prefixOptions}
                            isClearable={false}
                            isSearchable={true}
                            onFocus={()=>{setSelectedPrefix('')}}
                            placeholder="Enter Course Prefix"
                            className="basic-single"
                            classNamePrefix="select text-white bg-gray-800"
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
                </label>
                <br/>
                {selectedPrefix && <Select
                        value={selectedNum ? { value: selectedNum, label: selectedNum } : null}
                        onChange={handleChangeNum}
                        options={numOptions}
                        isClearable={false}
                        isSearchable={true}
                        onFocus={()=>{setSelectedNum('')}}
                        placeholder="Enter Course Number"
                        className="basic-single"
                        classNamePrefix="select text-white bg-gray-800"
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
                    />}
            </form>

            {selectedPrefix && selectedNum && <Graph props={{ 
                prefix: selectedPrefix, 
                num: selectedNum}}
            />}

        </div>
    )
}; 

export default CourseQuery;