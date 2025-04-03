const fetchPrefixes = async () => {
    try{
        const response = await fetch('/api/prefixes');
        return response.json();
    }
    catch(error){
        console.error('Error fetching prefixes:', error);
    }
};

const fetchNums = async (prefix) => {
    try{
        const response = await fetch(`/api/coursenums?prefix=${prefix}`);
        return response.json();
    }
    catch(error){
        console.error('Error fetching nums:', error);
    }
};

export {fetchPrefixes, fetchNums};