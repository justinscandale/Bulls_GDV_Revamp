import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import {fetchCourseGrades, fetchProfData, transformDataForProfGraph, transformDataForCourseGraph} from '../api/gradeData';
import SummaryAI from './SummaryAI';

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
                        hoverMode: 'closest',
                        margin: { 
                            l: 50,
                            r: 50,
                            b: 50,
                            t: 50,
                            pad: 0
                            },
                            autosize: true,
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
            <>
            <br/>
            <div className="w-full max-w-full overflow-x-hidden">
                <div className="w-full h-[500px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
                    {data && <Plot 
                        data={data.data} 
                        layout={{
                            ...data.layout,
                            autosize: true,
                            margin: {
                                l: 40,
                                r: 40,
                                t: 40,
                                b: 40,
                                pad: 0
                            },
                            font: {
                                size: 10
                            }
                        }}
                        config={{
                            displayModeBar: false,
                            responsive: true,
                            displaylogo: false,
                            scrollZoom: false
                        }}
                        className="w-full h-full"
                        useResizeHandler={true}
                        style={{width: '100%', height: '100%'}}
                    />}
                </div>
                <div className="mt-4">
                    <SummaryAI props={data.data}/>
                </div>
            </div>
            </>
        );
    };


export default Graph;