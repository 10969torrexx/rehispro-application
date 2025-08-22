import { useState, useEffect } from 'react';
import { UserRoles, UserStatus } from '@enums';
import { validateLoginId } from '../../../services/Auth/Validations';
import { ErrorMessages, Divider } from '@components';
import { toast } from 'react-toastify';
import { capitalizeFirst } from './../../myTools/myTools';
import { AuthServices } from '@services';

export default function EditUserDetails({ userId, onSave, onCancel }) { 
    const [isLoading, setIsLoading] = useState(true);
    //TODO: handle the user inputs
    const [loginId, setLoginId] = useState('');
    const [userRole, setUserRole] = useState(UserRoles.STAFF);
    const [userStatus, setUserStatus] = useState(UserStatus.ACTIVE);
    //TODO: handle cancel button
    const handleCancel = () => {
        setLoginId('');
        setUserRole(UserRoles.STAFF);
        onCancel();
    }
    //TODO: handle fetch user on mount
    useEffect(() => { 
        const fetchUserDetails = async () => { 
            try {
                const response = await AuthServices.getUserDetails(userId);
                if (response.success) {
                    setLoginId(response.data.login_id);
                    setUserRole(response.data.role);
                    setUserStatus(response.data.status);
                } else {
                    console.error('Error fetching user details:', response.message);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
        fetchUserDetails();
        setIsLoading(false);
    }, [userId])
    //TODO: handle submit button
    const loginIdErrors = validateLoginId(loginId);
    const [loginIdErrorMessages, setLoginIdErrorMessages] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginIdErrors.isValid) {
            setLoginIdErrorMessages(loginIdErrors.errors);
            toast.error("Please fix the errors before submitting.");
            return;
        }
        
        let formatData = {
            id: userId,
            loginId: loginId,
            role: userRole,
            status: userStatus
        }
       
        try {
            const response = await AuthServices.updateUserDetails(formatData);
            console.log('formatData:', formatData);
            console.log('response:', response);
            if (response.success) {
                toast.success("User details updated successfully!");
                onSave();
            } else {
                toast.error(response.message || "Failed to update user details.");
            }
        } catch(error) {
            console.error("Error updating user details:", error);
            toast.error("An error occurred while updating user details.");
        }
    }

    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                {isLoading ? (
                   <div className='flex items-center justify-center'>
                        <div className="spinner"></div>
                   </div>
                ) : (
                    <div>
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
                                    <option value={UserStatus.DELETED}>{ capitalizeFirst(UserStatus.DELETED) }</option>
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
                                Update
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}