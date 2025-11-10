import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ErrorMessages } from '@components';
import { VisitorLogServices,  VisitorLogValidations } from '@services';

export default function EditVisitorRemarks({ isOpen, onClose, onSuccess, selectedLog }) {
    console.log('selectedLog', selectedLog?.name);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const validationResults = VisitorLogValidations.validate(formData);
            setErrors(validationResults);
            if (Object.keys(validationResults).length > 0) {
                return;
            }

            setIsLoading(true);
            await VisitorLogServices.store(formData);
            toast.success('Visitor log added successfully.');
            onClose();
            onSuccess();
            setIsLoading(false);
            resetForm();
        } catch (error) {
           toast.error('Something went wrong.');
        }
    };

    const [formData, setFormData] = useState({
        creatorId: JSON.parse(localStorage.getItem('user'))?.id || null,
        id: selectedLog?.id || null,
        name: selectedLog?.name || '',
        contactNumber: selectedLog?.contact_number || '',
        address: selectedLog?.address || '',
        purpose: selectedLog?.purpose || '',
        remarks: selectedLog?.remarks || ''
    });

    useEffect(() => {
        if (selectedLog) {
        setFormData({
            creatorId: JSON.parse(localStorage.getItem("user"))?.id || null,
            id: selectedLog.id || null,
            name: selectedLog.name || "",
            contactNumber: selectedLog.contact_number || "",
            address: selectedLog.address || "",
            purpose: selectedLog.purpose || "",
            remarks: selectedLog.remarks || ""
        });
        }
    }, [selectedLog]);
    
    const resetForm = () => { 
        setFormData({
            creatorId: JSON.parse(localStorage.getItem('user'))?.id || null,
            name: '',
            contactNumber: '',
            address: '',
            purpose: '',
            remarks: ''
        });
        setErrors({});
    }
    
    const handleOnChange = (e) => { 
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <i className="bi bi-x-lg"></i>
                </button>

                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">Update remarks</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 w-full"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className={`w-full common-input ${errors.name ? 'input-error' : ''}`}
                                    value={formData.name}
                                    readOnly={true}
                                />
                                { errors.name && <ErrorMessages errors={errors.name} /> }
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    className={`w-full common-input ${errors.contactNumber ? 'input-error' : ''}`}
                                    value={formData.contactNumber}
                                    readOnly={true}
                                />
                                { errors.contactNumber && <ErrorMessages errors={errors.contactNumber} /> }
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    className={`w-full common-input ${errors.address ? 'input-error' : ''}`}
                                    value={formData.address}
                                    readOnly={true}
                                />
                                { errors.address && <ErrorMessages errors={errors.address} /> }
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Purpose</label>
                                <textarea
                                    name="purpose"
                                    placeholder="Purpose of Visit"
                                    className={`w-full common-textarea ${errors.purpose ? 'input-error' : ''}`}
                                    value={formData.purpose}
                                    readOnly={true}
                                />
                                { errors.purpose && <ErrorMessages errors={errors.purpose} /> }
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Remarks</label>
                                <textarea
                                    name="remarks"
                                    placeholder="Remarks"
                                    className={`w-full common-textarea ${errors.remarks ? 'input-error' : ''}`}
                                    value={formData.remarks}
                                    onChange={handleOnChange}
                                />
                                { errors.remarks && <ErrorMessages errors={errors.remarks} /> }
                            </div>

                            <div>
                                <button type="submit" className='btn-primary px-4 py-1 rounded-full'>Submit</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
