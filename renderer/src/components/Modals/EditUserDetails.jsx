import { useState, useEffect } from 'react';
import { UserRoles } from '../../enums/userRoles';
import { validateLoginId, validatePassword} from '../../../services/Auth/Validations';
import { ErrorMessages, Divider } from '@components';
import { toast } from 'react-toastify';
export default function EditUserDetails({ user, onSave, onCancel }) { 
    return(
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-left'>
            <div className='bg-white rounded-lg shadow-lg w-full max-w-xl p-10'>
                <h2 className='text-2xl font-semibold'>Edit User Details</h2>
            </div>
            <form className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input 
                        type='email' 
                        defaultValue={user.email} 
                        className='w-full border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500' 
                    />
                </div>
                <div>
                    
                </div>
            </form>
        </div>
    )
}