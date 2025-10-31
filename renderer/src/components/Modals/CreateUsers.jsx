import {useState, useEffect} from 'react';
import { UserRoles } from '@enums';
import { AuthValidations, AuthServices } from '@services';
import { ErrorMessages, InfoCard } from '@components';
import { toast } from "react-toastify";

export default function CreateUsers({ onSave, onCancel, isOpen }) {
    const [errors, setErrors] = useState({});

    const handleCancel = () => {
        setFormData({
            loginId: '',
            fullName: '',
            password: '',
            userRole: UserRoles.STAFF
        });
        onCancel();``
    };

    const [formData, setFormData] = useState({
        loginId: '',
        fullName: '',
        password: '',
        userRole: UserRoles.STAFF
    });

    const handleOnChange = (e) => { 
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(AuthValidations.validate(formData));

        if (Object.keys(errors).length > 0) {
            return;
        }
        const createUserResponse = await AuthServices.createUser(formData.loginId, formData.fullName, formData.password, formData.userRole);
        console.table(createUserResponse);
        if (createUserResponse.success) {
            onSave({ 
                response: createUserResponse.success,
                message: createUserResponse.message,
                data: {
                    id: createUserResponse.data.id,
                    login_id: createUserResponse.data.login_id,
                    full_name: createUserResponse.data.fullName,
                    status: createUserResponse.data.status,
                    role: createUserResponse.data.role,
                    created_at: createUserResponse.data.created_at
                }
            });
            setFormData({
                loginId: '',
                fullName: '',
                password: '',
                userRole: UserRoles.STAFF
            });
            setErrors({});
            toast.success(createUserResponse.message);
        } else {
            console.log('Create user error:', createUserResponse.message);
            toast.error(createUserResponse.message);
        }
    }
    if (!isOpen) return null;
    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                <h2 className="text-2xl font-semibold mb-6">Create User</h2>
                <div className='mb-4'>
                    <InfoCard 
                        title="Disclaimer"
                        message="By default, users are assigned the 'Staff' role. Please ensure to update their roles as necessary after creation."
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="loginId">
                        Login ID
                        </label>
                        <input
                            type="text"
                            id="loginId"
                            name="loginId"
                            value={formData.loginId}
                            onChange={handleOnChange}
                            className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500
                            ${errors.loginId ? 'border-red-500' : 'border-gray-300'} `}
                            placeholder="Enter login ID"
                        />
                        { errors.loginId  &&  <ErrorMessages errors={errors.loginId} />}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleOnChange}
                            className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500
                                ${errors.fullName ? 'border-red-500' : 'border-gray-300'} `}
                            placeholder="Enter full name"
                        />
                        { errors.fullName  &&  <ErrorMessages errors={errors.fullName} /> }
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                        Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            className={`w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500
                                ${errors.password ? 'border-red-500' : 'border-gray-300'} `}
                            placeholder="Enter password"
                        />
                        { errors.password  &&  <ErrorMessages errors={errors.password} /> }
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