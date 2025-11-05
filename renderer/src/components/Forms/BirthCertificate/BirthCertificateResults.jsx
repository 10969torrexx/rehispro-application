import { useState } from "react";
import { BirthCertServices } from "@services";
import { toast } from "react-toastify";

export default function BirthCertificateResults ({defaultData}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        registryNumber: '',
        dateOfBirth: '',
        placeOfBirth: '',
        firstName: '',
        middleName: '',
        lastName: '',
        mothersFirstName: '',
        mothersMiddleName: '',
        mothersLastName: '',
        fathersFirstName: '',
        fathersMiddleName: '',
        fathersLastName: ''
    });
    const handleOnChange = (e) => { 
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            
        } catch (error) {
            toast.error('An error occurred while searching');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row gap-4 mb-8">
                <form action="" method="post" className="flex-1 h-full flex flex-col" onSubmit={handleOnSubmit}>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Registry Number</label>
                        <input type="text" className="common-input w-full" placeholder="Registry Number"
                            name="registryNumber"
                            value={formData.registryNumber}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Date of Birth</label>
                        <input type="date" className="common-input w-full" placeholder="Date of Birth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth</label>
                        <input type="text" className="common-input w-full" placeholder="Place of Birth"
                            name="placeOfBirth"
                            value={formData.placeOfBirth}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Child's First Name</label>
                        <input type="text" className="common-input w-full" placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Child's Last Name</label>
                        <input type="text" className="common-input w-full" placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Mothers's First Name</label>
                        <input type="text" className="common-input w-full" placeholder="First Name"
                            name="firstName"
                            value={formData.mothersFirstName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="middleName" className="w-full px-4 text-xs">Mother's Middle Name (Maiden)</label>
                        <input type="text" className="common-input w-full" placeholder="Middle Name"
                            name="middleName"
                            value={formData.mothersMiddleName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Mother's Last Name</label>
                        <input type="text" className="common-input w-full" placeholder="Last Name"
                            name="lastName"
                            value={formData.mothersLastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Father's First Name</label>
                        <input type="text" className="common-input w-full" placeholder="First Name"
                            name="firstName"
                            value={formData.fathersFirstName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="middleName" className="w-full px-4 text-xs">Father's Middle Name</label>
                        <input type="text" className="common-input w-full" placeholder="Middle Name"
                            name="middleName"
                            value={formData.fathersMiddleName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Father's Last Name</label>
                        <input type="text" className="common-input w-full" placeholder="Last Name"
                            name="lastName"
                            value={formData.fathersLastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <button className={`btn-primary mt-4 px-4 py-2 rounded-full shadow-lg max-w-[100px]`}>Search</button>
                </form>
                <div className="flex-1 p-2 test-element">
                    
                </div>
            </div>
        </div>
    )
}