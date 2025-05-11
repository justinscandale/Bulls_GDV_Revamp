import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi'; // if you have an API function for this

function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const res = await registerUser(email, password);

            if(res.token){
                setMessage('Account created! Redirecting to login...');
                setError('');
                // Redirect after short delay
                setTimeout(() => navigate('/login'), 1500);
            }

        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring focus:ring-green-500"
                        required
                    />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}
                {message && <p className="text-green-400 text-sm">{message}</p>}

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Sign Up
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

export default SignUp;
