const fetchCourseGrades = async (coursePrefix, courseNum) => {
    try{
    const response = await fetch(`http://localhost:5000/api/gradedata?num=${courseNum}&prefix=${coursePrefix}`);
    return response.json();
    }
    catch(error){
        console.error('Error fetching course grades:', error);
    }
  };

const fetchProfData = async (fname, lname) => {
    try{
    const response = await fetch(`http://localhost:5000/api/profdata?fname=${fname}&lname=${lname}`);
    const data = await response.json();
    return data;
    } 
    catch(error){
        console.error('Error fetching professor data:', error);
    }
    };

const transformDataForProfGraph = (data) => {
    const grades = ['a','b','c','d','f'];
    const counts = grades.map(grade => parseInt(data[0][grade]));
    return [grades, counts];
};

const transformDataForCourseGraph = (data) => {
    //extract professor names
    console.log(data)
    const professors = data.map( prof => `${prof.prof_fname} ${prof.prof_lname}`);
    console.log(professors)
    // get grades counts for each prof
    const gradeData = data.map( prof => (
        {
            a: parseInt(prof.a),
            b: parseInt(prof.b),
            c: parseInt(prof.c),
            d: parseInt(prof.d),
            f: parseInt(prof.f)
        }
    ));
    console.log(gradeData)

    //create arrays for each grade type
    const aGrades = gradeData.map(prof => prof.a);
    const bGrades = gradeData.map(prof => prof.b);
    const cGrades = gradeData.map(prof => prof.c);
    const dGrades = gradeData.map(prof => prof.d);
    const fGrades = gradeData.map(prof => prof.f);

    return{
        data: [
            {x: professors, y: aGrades, name: 'A', type: 'bar'},
            {x: professors, y: bGrades, name: 'B', type: 'bar'},
            {x: professors, y: cGrades, name: 'C', type: 'bar'},
            {x: professors, y: dGrades, name: 'D', type: 'bar'},
            {x: professors, y: fGrades, name: 'F', type: 'bar'}
        ]}
    };

export {fetchCourseGrades, fetchProfData, transformDataForProfGraph, transformDataForCourseGraph};