import { useState, useEffect } from 'react';
import { UserRoles, UserStatus } from '@enums';
import { ErrorMessages } from '@components';
import { toast } from 'react-toastify';
import { capitalizeFirst } from '@myTools';
import { AuthServices, AuthValidations } from '@services';

export default function EditUserDetails({ userId = 0, onSave, onCancel, isOpen }) { 
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        loginId: '',
        fullName: '',
        userRole: UserRoles.STAFF,
        userStatus: UserStatus.ACTIVE
    });

    useEffect(() => { 
        const fetchUserDetails = async () => { 
            try {
                const response = await AuthServices.getUserDetails(userId);
                if (response.success) {
                    setFormData({
                        loginId: response.data.login_id,
                        fullName: response.data.full_name,
                        userRole: response.data.role,
                        userStatus: response.data.status
                    });
                } else {
                    console.error('Error fetching user details:', response.message);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
        if (userId) {
            fetchUserDetails();
        }
        setIsLoading(false);
    }, [userId])
    
    const handleCancel = () => {
        setFormData({
            loginId: '',
            fullName: '',
            userRole: UserRoles.STAFF,
            userStatus: UserStatus.ACTIVE
        });
        onCancel();
    }

    const handleOnChange = (e) => { 
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validations = AuthValidations.validate(formData);
        const { password, ...rest } = validations;
        setErrors(rest);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const updateUserResponse = await AuthServices.updateUserDetails({
            id: userId,
            loginId: formData.loginId,
            fullName: formData.fullName,
            role: formData.userRole,
            status: formData.userStatus
        });

        if (updateUserResponse.success) {
            onSave({ 
                id: userId,
                login_id: formData.loginId,
                full_name: formData.fullName,
                role: formData.userRole,
                status: formData.userStatus
            });
            setFormData({
                loginId: '',
                fullName: '',
                userRole: UserRoles.STAFF,
                userStatus: UserStatus.ACTIVE
            });
            setErrors({});
            toast.success(updateUserResponse.message);
        } else {
            console.log('Update user error:', updateUserResponse.message);
            toast.error(updateUserResponse.message);
        }
    }
    
    if (!isOpen) return null;
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
                                    onChange={handleOnChange}
                                    value={formData.loginId}
                                    className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500
                                        ${errors.loginId ? 'input-error' : ''}`}
                                    placeholder="Enter login ID"
                                />
                                { errors.loginId && <ErrorMessages errors={errors.loginId} /> }
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    onChange={handleOnChange}
                                    value={formData.fullName}
                                    className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500
                                        ${errors.fullName ? 'input-error' : ''}`}
                                    placeholder="Enter full name"
                                />
                                { errors.fullName && <ErrorMessages errors={errors.fullName} /> }
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Role
                                </label>
                                <select 
                                    className='w-full border rounded-full px-3 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500'
                                    value={formData.userRole}
                                    onChange={handleOnChange}
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
                                    value={formData.userStatus}
                                    onChange={(e) => {
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            userStatus: e.target.value
                                        }));
                                    }}
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