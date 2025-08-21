import { useState, useEffect } from 'react';
import { UserRoles, UserStatus } from '@enums';
import { validateLoginId, validatePassword} from '../../../services/Auth/Validations';
import { ErrorMessages, Divider } from '@components';
import { toast } from 'react-toastify';
import { getUserDetails } from '../../../services/Auth/Services';
import { capitalizeFirst } from './../../myTools/myTools';

export default function EditUserDetails({ userId, onSave, onCancel }) { 
    //TODO: handle the user inputs
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState(UserRoles.STAFF);
    const [userStatus, setUserStatus] = useState(UserStatus.ACTIVE);
    //TODO: handle cancel button
    const handleCancel = () => {
        setLoginId('');
        setPassword('');
        setUserRole(UserRoles.STAFF);
        onCancel();
    }
    //TODO: handle submit button
    const loginIdErrors = validateLoginId(loginId);
    const passwordErrors = validatePassword(password);
    const [loginIdErrorMessages, setLoginIdErrorMessages] = useState({});
    const [passwordErrorMessages, setPasswordErrorMessages] = useState({});
    const handleSubmit = () => {
        
        if (!loginIdErrors.isValid && !passwordErrors.isValid) {
            setLoginIdErrorMessages(loginIdErrors.errors);
            setPasswordErrorMessages(passwordErrors.errors);
            toast.error("Please fix the errors before submitting.");
            return;
        }
    }
    
    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                <h2 className="text-2xl font-semibold mb-6">Edit User</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="loginId">
                        Login ID
                        </label>
                        <input
                        type="text"
                        id="loginId"
                        name="loginId"
                        onChange={(e) => setLoginId(e.target.value)}
                        value={loginId}
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500
                        ${ passwordErrorMessages !== null && Object.keys(passwordErrorMessages).length ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter password"
                        />
                        { passwordErrorMessages !== null && Object.keys(passwordErrorMessages).length > 0 && (
                            <ErrorMessages errors={passwordErrorMessages} />
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                         Role
                        </label>
                        <select 
                            className='w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500'
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                        >
                            <option value={UserRoles.SUPERVISOR}>{ capitalizeFirst(UserRoles.SUPERVISOR) }</option>
                            <option value={UserRoles.STAFF}>{ capitalizeFirst(UserRoles.STAFF) }</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                        Status
                        </label>
                        <select 
                            className='w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500'
                            value={userStatus}
                            onChange={(e) => setUserStatus(e.target.value)}
                        >
                            <option value={UserStatus.ACTIVE}>{ capitalizeFirst(UserStatus.ACTIVE) }</option>
                            <option value={UserStatus.INACTIVE}>{ capitalizeFirst(UserStatus.INACTIVE) }</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400"
                            onClick={handleCancel}
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