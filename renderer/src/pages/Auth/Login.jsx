import { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg p-6 rounded-xl w-80">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-lg font-semibold text-left">Account Login</h1>
        </div>

        <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Login ID
              </label>
              <input
                type="text"
                placeholder="Enter your login ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
               Password
              </label>
              <div className='relative'>
                   <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 pr-10"
                  />
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye'}`}></i>
                  </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Login
            </button>
        </form>
      </div>
    </div>
  );
}
