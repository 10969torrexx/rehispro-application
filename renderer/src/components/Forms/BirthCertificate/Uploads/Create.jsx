import { useState, useEffect } from "react";
import { BirthCertServices } from "@services";
import { BirthCertificate } from '@enums';
import { Spinner } from '@components';
import { toast } from "react-toastify";

export default function Create ({defaultData, filePath, activeTab}) {
    console.log(defaultData);
    const [formData, setFormData] = useState({
        creatorId : JSON.parse(localStorage.getItem('user'))?.id || null,
        registryNumber: defaultData.registry_number ?? '',
        dateOfBirth: defaultData.birth_date ?? '',
        placeOfBirthHospital: defaultData.placeOfBirth_hospital ?? '',
        placeOfBirthBarangay: defaultData.placeOfBirth_barangay ?? '',
        placeOfBirthCity: defaultData.placeOfBirth_city ?? '',
        placeOfBirthProvince: defaultData.placeOfBirth_province ?? '',
        childFirstName: defaultData.child_first_name ?? '',
        childMiddleName: defaultData.child_middle_name ??  '',
        childLastName: defaultData.child_last_name ??  '',
        sex: defaultData.sex ?? '',
        mothersFirstName: defaultData.maiden_first_name ??  '',
        mothersMiddleName: defaultData.maiden_middle_name ??  '',
        mothersLastName: defaultData.maiden_last_name ??  '',
        fathersFirstName: defaultData.father_first_name ??  '',
        fathersMiddleName: defaultData.father_middle_name ??  '',
        fathersLastName: defaultData.father_last_name ??  '',
        filePath:  '',
        fileNames: 'sample'
    });

    //TODO: this will manipulate the image files
    const trimmedPaths =
        filePath && filePath.length > 0
        ? filePath.map((path) => {
        const index = path.indexOf("/backend");
        return index !== -1
          ? "http://localhost:3001" + path.slice(index)
          : path;
      })
    : null;

    const handleOnChange = (e) => { 
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    //TODO: handle showing the images
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % trimmedPaths.length);
    };
    const prevImage = () => {
        setCurrentIndex((prev) =>
        prev === 0 ? trimmedPaths.length - 1 : prev - 1
        );
    };

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await BirthCertServices.insertBirthCertificate(formData);
            if (response.success) {
                toast.success(`${response.message || 'Birth Certificate created successfully!'}`);
                setFormData({
                    childFirstName: '',
                    childMiddleName: '',
                    childLastName: '',
                    sex: '',
                    mothersFirstName: '',
                    mothersMiddleName: '',
                    mothersLastName: '',
                    fathersFirstName: '',
                    fathersMiddleName: '',
                    fathersLastName: '',
                    dateOfBirth: '',
                    placeOfBirthHospital: '',
                    placeOfBirthBarangay: '',
                    placeOfBirthCity: '',
                    placeOfBirthProvince: '',
                    registryNumber: '',
                });
                activeTab('upload')
            } else {
                toast.error(response.message || 'Failed creating file');
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred');
        } finally {
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row gap-4 mb-8">
                <form action="" method="post" className="flex-1 h-full flex flex-col" onSubmit={handleOnSubmit} encType="multipart/form-data">
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Registry Number</label>
                        <input type="text" className={`common-input w-full ${formData.registryNumber == '' ? 'input-empty' : ''}`} placeholder="Registry Number"
                            name="registryNumber"
                            value={formData.registryNumber}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Date of Birth</label>
                        <input type="date" className={`common-input w-full ${formData.dateOfBirth == '' ? 'input-empty' : ''}`} placeholder="Date of Birth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth (Hospital / Establishment)</label>
                        <input type="text" className={`common-input w-full ${formData.placeOfBirthHospital == '' ? 'input-empty' : ''}`} placeholder="Place of Birth"
                            name="placeOfBirth"
                            value={formData.placeOfBirthHospital}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth (Barangay)</label>
                        <input type="text" className={`common-input w-full ${formData.placeOfBirthBarangay == '' ? 'input-empty' : ''}`} placeholder="Place of Birth"
                            name="placeOfBirth"
                            value={formData.placeOfBirthBarangay}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth (City)</label>
                        <input type="text" className={`common-input w-full ${formData.placeOfBirthCity == '' ? 'input-empty' : ''}`} placeholder="Place of Birth"
                            name="placeOfBirth"
                            value={formData.placeOfBirthCity}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth (Province)</label>
                        <input type="text" className={`common-input w-full ${formData.placeOfBirthProvince == '' ? 'input-empty' : ''}`} placeholder="Place of Birth"
                            name="placeOfBirth"
                            value={formData.placeOfBirthProvince}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Child's First Name</label>
                        <input type="text" className={`common-input w-full ${formData.childFirstName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                            name="firstName"
                            value={formData.childFirstName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Child's Middle Name</label>
                        <input type="text" className={`common-input w-full ${formData.childMiddleName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                            name="firstName"
                            value={formData.childMiddleName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Child's Last Name</label>
                        <input type="text" className={`common-input w-full ${formData.childLastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                            name="lastName"
                            value={formData.childLastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Sex</label>
                        <select name="sex" className={`common-input w-full ${formData.sex == '' ? 'input-empty' : ''}`}
                            value={formData.sex}
                            onChange={handleOnChange}
                        >
                            <option value="">Select</option>
                            <option value={BirthCertificate.SexTypes.MALE.toUpperCase()}>{BirthCertificate.SexTypes.MALE.toUpperCase()}</option>
                            <option value={BirthCertificate.SexTypes.FEMALE.toUpperCase()}>{BirthCertificate.SexTypes.FEMALE.toUpperCase()}</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Mothers's First Name</label>
                        <input type="text" className={`common-input w-full ${formData.mothersFirstName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                            name="mothersFirstName"
                            value={formData.mothersFirstName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="middleName" className="w-full px-4 text-xs">Mother's Middle Name (Maiden)</label>
                        <input type="text" className={`common-input w-full ${formData.mothersMiddleName == '' ? 'input-empty' : ''}`} placeholder="Middle Name"
                            name="mothersMiddleName"
                            value={formData.mothersMiddleName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Mother's Last Name</label>
                        <input type="text" className={`common-input w-full ${formData.mothersLastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                            name="mothersLastName"
                            value={formData.mothersLastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Father's First Name</label>
                        <input type="text" className={`common-input w-full ${formData.fathersFirstName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                            name="fathersFirstName"
                            value={formData.fathersFirstName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="middleName" className="w-full px-4 text-xs">Father's Middle Name</label>
                        <input type="text" className={`common-input w-full ${formData.fathersMiddleName == '' ? 'input-empty' : ''}`} placeholder="Middle Name"
                            name="fathersMiddleName"
                            value={formData.fathersMiddleName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Father's Last Name</label>
                        <input type="text" className={`common-input w-full ${formData.fathersLastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                            name="fathersLastName"
                            value={formData.fathersLastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <button type="submit" className={`btn-primary mt-4 px-4 py-2 rounded-full shadow-lg max-w-[100px]`}>Confirm</button>
                </form>
                <div className="flex-1 flex max-h-[800px] flex-col items-center p-2 relative overflow-hidden">
                    <div className="flex-1 w-full mb-4">
                        <div className="relative w-full h-full rounded-xl shadow-md border border-gray-300 overflow-hidden">
                            {trimmedPaths &&
                                trimmedPaths.map((path, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 bg-center bg-contain bg-no-repeat transition-opacity duration-500 ${
                                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                                    style={{ backgroundImage: `url(${path})` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full max-h-[5%] mt-2">
                        <div className="absolute bottom-4 flex justify-center gap-4 w-full">
                            <button
                                type='button'
                                className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                                onClick={prevImage}
                            >
                                <i className="fa-solid fa-angles-left"></i>
                            </button>
                            <button
                                type='button'
                                className="btn-primary px-3 py-1 rounded-lg disabled:opacity-50"
                                onClick={nextImage}
                            >
                                <i className="fa-solid fa-angles-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}