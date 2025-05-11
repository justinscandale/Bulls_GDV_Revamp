import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';

function Login() {
    const navigate = useNavigate();

    // Local state for form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page refresh

        try {
            const res = await loginUser(username, password);
            console.log('Login response:', res);

            if (res.token) {
                localStorage.setItem('token', res.token);
                navigate('/dashboard'); // redirect to dashboard or wherever
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-white mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring focus:ring-green-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring focus:ring-green-500"
                        required
                    />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Login
                </button>
            </form>
            <button
                onClick={() => navigate('/course-registration')}
                className="mt-4 w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Back
            </button>
        </div>
    );
}

export default Login;
