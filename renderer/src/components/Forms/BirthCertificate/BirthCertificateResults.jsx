import { useState } from "react";
import { BirthCertServices } from "@services";
import { toast } from "react-toastify";

export default function BirthCertificateResults ({setActiveTab, setSelectedRow}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        registryNumber: '',
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
            <div className="flex flex-row gap-4">
                <form action="" method="post" className="flex-1 h-full flex flex-col" onSubmit={handleOnSubmit}>
                    <div className="flex-1 flex flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="registryNumber">Registry Number</label>
                            <input type="text" className="common-input w-full" placeholder="Registry Number"
                             name="registryNumber"
                             value={formData.registryNumber}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date" className="common-input w-full" placeholder="Date of Birth"
                             name="dateOfBirth"
                             value={formData.dateOfBirth}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="placeOfBirth">Place of Birth</label>
                            <input type="text" className="common-input w-full" placeholder="Place of Birth"
                             name="placeOfBirth"
                             value={formData.placeOfBirth}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="firstName">Child's First Name</label>
                            <input type="text" className="common-input w-full" placeholder="First Name"
                             name="firstName"
                             value={formData.firstName}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="middleName">Child's Middle Name</label>
                            <input type="text" className="common-input w-full" placeholder="Middle Name"
                             name="middleName"
                             value={formData.middleName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName">Child's Last Name</label>
                            <input type="text" className="common-input w-full" placeholder="Last Name"
                             name="lastName"
                             value={formData.lastName}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="firstName">Mothers's First Name</label>
                            <input type="text" className="common-input w-full" placeholder="First Name"
                             name="firstName"
                             value={formData.mothersFirstName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="middleName">Mother's Middle Name (Maiden)</label>
                            <input type="text" className="common-input w-full" placeholder="Middle Name"
                             name="middleName"
                             value={formData.mothersMiddleName}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="lastName">Mother's Last Name</label>
                            <input type="text" className="common-input w-full" placeholder="Last Name"
                             name="lastName"
                             value={formData.mothersLastName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="firstName">Father's First Name</label>
                            <input type="text" className="common-input w-full" placeholder="First Name"
                             name="firstName"
                             value={formData.fathersFirstName}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="middleName">Father's Middle Name</label>
                            <input type="text" className="common-input w-full" placeholder="Middle Name"
                             name="middleName"
                             value={formData.fathersMiddleName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName">Father's Last Name</label>
                            <input type="text" className="common-input w-full" placeholder="Last Name"
                             name="lastName"
                             value={formData.fathersLastName}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <button className={`btn-primary mt-4 px-4 py-2 rounded-full shadow-lg max-w-[100px]`}>Search</button>
                </form>
                <div className="flex-1 p-2 test-element">
                    
                </div>
            </div>
        </div>
    )
}