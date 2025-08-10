import { useState } from "react";
import { validateLoginId, validatePassword, validateConfirmPassword } from "../../../services/Auth/Validations";
import { ErrorMessages } from '@components';
import { toast } from "react-toastify";

export default function ChangePassword({ onSave, onCancel }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginIdErrors, setLoginIdErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginIdValidation = validateLoginId(loginId);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

    if (!loginIdValidation.isValid || !passwordValidation.isValid || !confirmPasswordValidation.isValid) {
      toast.warning("Please make sure all fields are filled out correctly.");
      setLoginIdErrors(loginIdValidation.errors);
      setPasswordErrors(passwordValidation.errors);
      setConfirmPasswordErrors(confirmPasswordValidation.errors);
      console.log('confirmPasswordValidation', confirmPasswordValidation.errors)
      return;
    }

    // Clear errors on successful validation
    setLoginIdErrors({});
    setPasswordErrors({});
    setConfirmPasswordErrors({});

    // Call onSave with new credentials
    onSave({ loginId, password });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-xl p-10 max-w-xl">
        <i className="bi bi-exclamation-circle-fill text-6xl mb- text-red-500"></i>
        <h2 className="text-xl font-semibold mb-4 text-left">Update Credentials</h2>
        <p className="mb-4 text-gray-600 text-left">
          For security reasons, please update your login ID and password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block mb-1 font-medium" htmlFor="loginId">Login ID</label>
            <input
              id="loginId"
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500
                ${ loginIdErrors !== null && Object.keys(loginIdErrors).length ? 'border-red-500' : 'border-gray-300'}`}
              
            />
            { loginIdErrors !== null && Object.keys(loginIdErrors).length > 0 && (
              <ErrorMessages errors={loginIdErrors} />
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500
                ${passwordErrors !== null && Object.keys(passwordErrors).length ? 'border-red-500' : 'border-gray-300'}`}
              
            />
            {passwordErrors !== null && Object.keys(passwordErrors).length > 0 && (
              <ErrorMessages errors={passwordErrors} />
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500
                ${confirmPasswordErrors !== null && Object.keys(confirmPasswordErrors || {}).length ? 'border-red-500' : 'border-gray-300'}`}
              
            />
            {confirmPasswordErrors !== null && Object.keys(confirmPasswordErrors).length > 0 && (
              <ErrorMessages errors={confirmPasswordErrors} />
            )}
          </div>

          <div className="mb-4 space-y-4">
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
            >
                Save Changes
            </button>
            
             <button
                type="button"
                onClick={onCancel}
                className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
            >
                Never Mind
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
