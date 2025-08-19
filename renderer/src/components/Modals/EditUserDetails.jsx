import { useState, useEffect } from 'react';
import { UserRoles, UserStatus } from '@enums';
import { validateLoginId, validatePassword} from '../../../services/Auth/Validations';
import { ErrorMessages, Divider } from '@components';
import { toast } from 'react-toastify';
import { getUserDetails } from '../../../services/Auth/Services';
import { capitalizeFirst } from './../../myTools/myTools';

export default function EditUserDetails({ user, onSave, onCancel }) { 
    //TODO: handle the user inputs
    const [loginId, setLoginId] = useState(user.login_id || '');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState(user.role || UserRoles.STAFF);
    //TODO: handle cancel button
    //TODO: handle data on component build
    
    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                <h2 className="text-2xl font-semibold mb-6">Edit User</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="loginId">
                        Login ID
                        </label>
                        <input
                        type="text"
                        id="loginId"
                        name="loginId"
                        className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 border-red-500 border-gray-300'`}
                        placeholder="Enter login ID"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                        placeholder="Enter password"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                        Status
                        </label>
                        <select className='w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500'>
                            <option value={UserStatus.ACTIVE}>{ capitalizeFirst(UserStatus.ACTIVE) }</option>
                            <option value={UserStatus.INACTIVE}>{ capitalizeFirst(UserStatus.INACTIVE) }</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400"
                            onClick={onCancel}
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