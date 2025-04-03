const fetchPrefixes = async () => {
    try{
        const response = await fetch('/api/seats/prefixes');
        return response.json();
    }
    catch(error){
        console.error('Error fetching prefixes:', error);
    }
};

const fetchNums = async (prefix) => {
    try{
        const response = await fetch(`/api/seats/numbers?prefix=${prefix}`);
        return response.json();
    }
    catch(error){
        console.error('Error fetching nums:', error);
    }
};

const fetchSeats = async (prefix, number) => {
    try{
        const response = await fetch(`/api/seats/seats?prefix=${prefix}&number=${number}`);
        return response.json();
    }
    catch(error){
        console.error('Error fetching seats:', error);
    }
};

export {fetchPrefixes, fetchNums, fetchSeats};