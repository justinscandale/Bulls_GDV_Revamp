const loginUser = async (username, password) => {
    try{
        const response = await fetch('/api/user/login',
        {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        return response.json();
    }
    catch(error){
        console.error('Error fetching prefixes:', error);
    }
};

const registerUser = async (username, password) => {
    try{
        const response = await fetch('/api/user/signup',
        {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        return response.json();
    }
    catch(error){
        console.error('Error fetching prefixes:', error);
    }
};

const handleGoogleCallback = async (credential) => {
    try {
        if (!credential) {
            throw new Error('No credential provided');
        }

        const response = await fetch('/api/auth/google/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to authenticate with Google');
        }

        const data = await response.json();
        console.log('Google authentication response:', data);
        return data;

    } catch (error) {
        console.error('Google authentication error:', error);
        throw error; // Re-throw to handle in the component
    }
};


export {loginUser, registerUser, handleGoogleCallback};