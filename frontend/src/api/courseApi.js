const fetchPrefixes = async () => {
    try{
        const response = await fetch('http://localhost:5000/api/prefixes');
        return response.json();
    }
    catch(error){
        console.error('Error fetching prefixes:', error);
    }
};

const fetchNums = async (prefix) => {
    try{
        const response = await fetch(`http://localhost:5000/api/coursenums?prefix=${prefix}`);
        return response.json();
    }
    catch(error){
        console.error('Error fetching nums:', error);
    }
};

export {fetchPrefixes, fetchNums};