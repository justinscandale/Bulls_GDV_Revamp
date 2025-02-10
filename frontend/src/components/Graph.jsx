import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import {fetchCourseGrades, fetchProfData, transformDataForProfGraph, transformDataForCourseGraph} from '../api/gradeData';

const Graph = ({props}) => {
    const [data, setData] = useState([]);

    if (!props) return <p>No data for this professor</p>;

    // Handle api call and data transofmration for professor based graph
    if(props.fname && props.lname){
        useEffect( () => {
            const fetchGraphData = async () => {
                try{
                const data = await fetchProfData(props.fname, props.lname);
                
                //format data for bar chart
                const [grades, counts] = transformDataForProfGraph(data);

                // set the graph data
                setData({
                    data: [{
                        x: grades.map(grade => `${grade.toUpperCase()}`),
                        y: counts,
                        type: 'bar'
                    }],
                    layout: {
                        title: {
                            text: `Grade Distribution for ${props.fname} ${props.lname}`,
                        },
                        xaxis: {
                            title: {
                                text: 'Grade'
                            }
                        },
                        yaxis: {
                            title: {
                                text:'Count'
                            }
                        },
                        hoverMode: 'closest'
                    },
                    config: {
                        displayModeBar: false,
                        responsive: false}
                })
            } catch(error) {
                console.error('Error fetching graph data:', error);
            }}
            fetchGraphData()}
            , [props.fname, props.lname]); };
        
        // Hadnle api call and data transofmration for course based graph
        if (props.num && props.prefix){

            useEffect( () => {
                const fetchGraphData = async () => {
                    try{
                    const data = await fetchCourseGrades(props.prefix, props.num);

                    //format data for bar chart
                    const graphData = transformDataForCourseGraph(data);
    
                    // set the graph data
                    console.log(graphData.data)
                    setData({
                        data: graphData.data,
                        layout: {
                            title: {
                                text: `Grade Distribution for ${props.prefix} ${props.num}`,
                            },
                            xaxis: {
                                title: {
                                    text: 'Professors'
                                }
                            },
                            yaxis: {
                                title: {
                                    text:'Count'
                                }
                            },
                            hoverMode: 'closest'
                        },
                        config: {
                            displayModeBar: false,
                            responsive: false}
                    })
                } catch(error) {
                    console.error('Error fetching graph data:', error);
                }}
                fetchGraphData()}
                , [props.prefix, props.num]);

        };

        //render graph 
        return (
            <div>
                {data && <Plot data={data.data} layout={data.layout} config={data.config} />}
            </div>
            );
    };


export default Graph;