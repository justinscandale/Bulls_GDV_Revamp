import React, {useState, useEffect} from "react";
import {fetchPrefixes, fetchNums, fetchSeats} from '../api/seatsApi';
import Select from 'react-select';

const SeatQuery = () => {

    const [prefixOptions, setPrefixOptions] = useState({});
    const [numOptions, setNumOptions] = useState({});
    const [selectedPrefix, setSelectedPrefix] = useState('');
    const [selectedNum, setSelectedNum] = useState('');
    const [seatData, setSeatData] = useState([]);

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
            const numList = nums.map(row => row.course_number);
            const sortedData = numList.sort((a, b) => a>b);
            setNumOptions(sortedData.map(num => ({value: num, label: num})));
        };

        getPrefixes();
        if(selectedPrefix) getNums(selectedPrefix);
    }, [selectedPrefix]);

    //Handle api call for grades when num and prefix is chosen
    useEffect( () => {
        if(selectedPrefix && selectedNum) {
            fetchSeats(selectedPrefix, selectedNum)
            .then(data => setSeatData(data))
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
            <div className="seat-data flex flex-wrap gap-4 mt-6 justify-center">
                {seatData.map(seat => (
                    <div className= {`${seat.seats_available == 0 ? 'bg-red-900' : 'bg-green-900'} 
                    text-white p-4 rounded-lg shadow-md w-full md:w-5/11`}
                    key={seat.course_crn}>

            <div className="flex justify-center items-center mb-4">
                <h3 className="text-xl font-bold text-center flex-grow">
                    {seat.course_prefix} {seat.course_number} - {seat.course_section} 
                    <br /> 
                    {seat.course_title}
                    <br/>
                    CRN: {seat.course_crn}
                    <br/>
                    Seats Open: {seat.seats_available}
                </h3>
                
                <input 
                    type="checkbox" 
                    className="ml-4 w-6 h-6"
                    onChange ={(e)=>{alert(`${e.target.checked ? 'Added to cart' : 'Removed from cart'}`)}}
                />
            </div>
                    </div>
                ))}
            </div>

        </div>
    )
}; 

export default SeatQuery;