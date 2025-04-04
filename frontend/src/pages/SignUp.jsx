import { useNavigate } from 'react-router-dom';


function SignUp() {

  const navigate = useNavigate();

  return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h1>
          <form className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <input type="email" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring focus:ring-green-500" required />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <input type="password" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring focus:ring-green-500" required />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                  <input type="password" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring focus:ring-green-500" required />
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500">Sign Up</button>
          </form>
          <button onClick={() => navigate('/course-registration')} className="mt-4 w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-500">
            Back
        </button>
      </div>
  );
}

export default SignUp; 