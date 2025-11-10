import { useState } from 'react';
import { validateLoginId, validatePassword } from '../../../services/Auth/Validations';
import { Login as LoginRequest } from '../../../services/Auth/Services';
import { ErrorMessages } from '@components';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginIdErrors, setLoginIdErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [hasLoginErrors, setHasLoginErrors] = useState(false);
  const [hasPasswordErrors, setHasPasswordErrors] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginIdErrors = validateLoginId(loginId);
    const passwordErrors = validatePassword(password);
    setHasLoginErrors(!loginIdErrors.isValid);
    setHasPasswordErrors(!passwordErrors.isValid);

    //TODO: handle the input validation rules
    if (!loginIdErrors.isValid || !passwordErrors.isValid) {
      toast.warning("Please make sure all fields are filled out correctly.");
      setLoginIdErrors(loginIdErrors.errors);
      setPasswordErrors(passwordErrors.errors);
      setHasLoginErrors(!loginIdErrors.isValid);
      setHasPasswordErrors(!passwordErrors.isValid);
      return;
    } 

    const result = await LoginRequest(loginId, password);
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Login successful!");
    onLoginSuccess();
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center w-[90vw] h-[90vh]  max-w-[600px] max-h-[600px]">
      <div className="bg-white shadow-lg p-6 rounded-xl w-[80vw] h-[80vh]  max-w-[500px] max-h-[500px]">
        <div className='card-content'>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-left mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
              REHISPRO
            </h1>
            <h1 className="text-lg font-semibold text-left">Account Login</h1>
          </div>

          <form className="space-y-4 w-[80%]" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Login ID
                </label>
                <input
                  type="text"
                  placeholder="Enter your login ID"
                  className={`w-full px-3 py-2 rounded-full focus:outline-none ${
                   hasLoginErrors
                      ? 'border-2 border-red-500'
                      : 'border border-gray-300'
                  }`}
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
               {hasLoginErrors ? <ErrorMessages errors={loginIdErrors} /> : null}
               
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none pr-10 
                      ${hasPasswordErrors ? 'border-2 border-red-500'  : 'border border-gray-300' }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye'}`}></i>
                  </button>
                </div>
                {hasPasswordErrors ? <ErrorMessages errors={passwordErrors} /> : null}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-full transition duration-200"
              >
                Login
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
