import { useState, useEffect } from 'react';
import { UserRoles, UserStatus } from '@enums';
import { getUserDetailsById } from '../../../services/Auth/Services';
export default function ViewUserDetails({ userId, onClose }) { 
    //TODO: handle fetching user data
    const [userData, setUserData] = useState({});
    console.log('useri d:', userId);
    useEffect((userId) => { 
        const fetchUserDetails = async () => { 
            try {
                const response = await getUserDetailsById(userId);
                console.log('User details response:', response);
                if (response.success) {
                    setUserData(response.data);
                } else {
                    console.error('Error fetching user details:', response.message);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
        fetchUserDetails();
    }, [userId]);
    return (
        <>
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
                <div className="bg-white rounded-lg shadlow-lg w-ful max-w-xl p-10">
                    <h2>User Details</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Login ID</label>
                            <p className="text-gray-800">{userData.login_id}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Role</label>
                            <p className="text-gray-800">{userData.role}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Status</label>
                            <p className="text-gray-800">{userData.status}</p>
                        </div>
                        <div className="flex justify-end space-x-3 p-4">
                            <button 
                                className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}