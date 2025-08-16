import {useState, useEffect} from 'react';
import { UserRoles } from '../../enums/userRoles';
import { validateLoginId, validatePassword } from '../../../services/Auth/Validations';
import { ErrorMessages, Divider } from '@components';
import { toast } from "react-toastify";
import { createUser } from '../../../services/Auth/Services';

export default function CreateUsers({ onSave, onCancel }) {
    //TODO: handle the inputs
        const [loginId, setLoginId] = useState('');
        const [password, setPassword] = useState('');
        const [userRole, setUserRole] = useState(UserRoles.STAFF);
    //TODO: handle on cancel
        const handleCancel = () => {
            setLoginId('');
            setPassword('');
            setUserRole(UserRoles.STAFF);
            onCancel();
        };

    //TODO: handle submit button
        const loginIdErrors = validateLoginId(loginId);
        const passwordErrors = validatePassword(password);
        const [loginIdErrorMessages, setLoginIdErrorMessages] = useState({});
        const [passwordErrorMessages, setPasswordErrorMessages] = useState({});

        const handleSubmit = async (e) => {
            e.preventDefault();
           
            if (!loginIdErrors.isValid && !passwordErrors.isValid) {
                setLoginIdErrorMessages(loginIdErrors.errors);
                setPasswordErrorMessages(passwordErrors.errors);
                return;
            }

            const createUserResponse = await createUser(loginId, password, userRole);
            if (createUserResponse.success) {
                onSave({ 
                    response: createUserResponse.success,
                    message: createUserResponse.message,
                    data: {
                        id: createUserResponse.data.id,
                        login_id: createUserResponse.data.login_id,
                        role: createUserResponse.data.role,
                        created_at: createUserResponse.data.created_at
                    }
                });
                toast.success(createUserResponse.message);
            } else {
                console.log('Create user error:', createUserResponse.message);
                toast.error(createUserResponse.message);
            }
        }

    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                <h2 className="text-2xl font-semibold mb-6">Add User</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="loginId">
                        Login ID
                        </label>
                        <input
                        type="text"
                        id="loginId"
                        name="loginId"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500
                        ${ loginIdErrorMessages !== null && Object.keys(loginIdErrorMessages).length ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter login ID"
                        />
                        { loginIdErrorMessages !== null && Object.keys(loginIdErrorMessages).length > 0 && (
                            <ErrorMessages errors={loginIdErrorMessages} />
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500
                        ${ passwordErrorMessages !== null && Object.keys(passwordErrorMessages).length ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter password"
                        />
                        { passwordErrorMessages !== null && Object.keys(passwordErrorMessages).length > 0 && (
                            <ErrorMessages errors={passwordErrorMessages} />
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400"
                        >
                        Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600"
                        >
                        Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}