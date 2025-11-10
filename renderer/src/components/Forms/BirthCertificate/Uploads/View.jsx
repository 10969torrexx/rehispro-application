import { useState, useEffect } from "react";
import { BirthCertServices } from "@services";
import { BirthCertificate } from '@enums';
import { Spinner, DownloadImages } from '@components';
import { toast } from "react-toastify";

export default function View ({defaultData}) {
    const [loading, setLoading] = useState(true);
    //TODO: this will manipulate the image files
    const [trimmedPaths, setTrimmedPaths] = useState([]);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        const dataId = defaultData ? defaultData.id : null;
        if (!dataId) {
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await BirthCertServices.viewBirthCertificate(dataId);
                const listOfBirthCerts = response.data;
                if (response && response.success && response.data) {
                    setTrimmedPaths(JSON.parse(response.data.uploaded_file.file_path));
                    setFormData((prev) => ({
                        ...prev,
                        creatorName: listOfBirthCerts?.creator_name || '',
                        registryNumber: listOfBirthCerts?.registry_number || '',
                        dateOfBirth: listOfBirthCerts?.birth_date || '',
                        placeOfBirthBarangay: listOfBirthCerts?.place_of_birth_barangay || '',
                        placeOfBirthCity: listOfBirthCerts?.place_of_birth_city || '',
                        placeOfBirthProvince: listOfBirthCerts?.place_of_birth_province || '',
                        childFirstName: listOfBirthCerts?.child_first_name || '',
                        childMiddleName: listOfBirthCerts?.child_middle_name || '',
                        childLastName: listOfBirthCerts?.child_last_name || '',
                        sex: listOfBirthCerts?.sex || '',
                        mothersFirstName: listOfBirthCerts?.maiden_first_name || '',
                        mothersMiddleName: listOfBirthCerts?.maiden_middle_name || '',
                        mothersLastName: listOfBirthCerts?.maiden_last_name || '',
                        fathersFirstName: listOfBirthCerts?.father_first_name || '',
                        fathersMiddleName: listOfBirthCerts?.father_middle_name || '',
                        fathersLastName: listOfBirthCerts?.father_last_name || '',
                    }));
                } else {
                    toast.error(response?.message || "Failed to load birth certificates");
                }
            } catch (error) {
                toast.error(error.message || "Failed to fetch birth certificates");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        setLoading(false);
    }, [defaultData]);


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

    return (
         <div className="flex flex-col w-full">
           {
                loading ? <Spinner /> :
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold mb-4">Creator: {formData.creatorName}</h2>
                    <div className="flex flex-row gap-4 mb-8">
                        <form action="" method="post" className="flex-1 h-full flex flex-col">
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Registry Number</label>
                                <input type="text" className={`common-input w-full ${formData.registryNumber == '' ? 'input-empty' : ''}`} placeholder="Registry Number"
                                    name="registryNumber"
                                    value={formData.registryNumber}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Date of Birth</label>
                                <input type="date" className={`common-input w-full ${formData.dateOfBirth == '' ? 'input-empty' : ''}`} placeholder="Date of Birth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth (Barangay)</label>
                                <input type="text" className={`common-input w-full ${formData.placeOfBirthBarangay == '' ? 'input-empty' : ''}`} placeholder="Place of Birth"
                                    name="placeOfBirth"
                                    value={formData.placeOfBirthBarangay}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth (City)</label>
                                <input type="text" className={`common-input w-full ${formData.placeOfBirthCity == '' ? 'input-empty' : ''}`} placeholder="Place of Birth"
                                    name="placeOfBirth"
                                    value={formData.placeOfBirthCity}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth (Province)</label>
                                <input type="text" className={`common-input w-full ${formData.placeOfBirthProvince == '' ? 'input-empty' : ''}`} placeholder="Place of Birth"
                                    name="placeOfBirth"
                                    value={formData.placeOfBirthProvince}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Child's First Name</label>
                                <input type="text" className={`common-input w-full ${formData.childFirstName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                                    name="firstName"
                                    value={formData.childFirstName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Child's Middle Name</label>
                                <input type="text" className={`common-input w-full ${formData.childMiddleName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                                    name="firstName"
                                    value={formData.childMiddleName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Child's Last Name</label>
                                <input type="text" className={`common-input w-full ${formData.childLastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                                    name="lastName"
                                    value={formData.childLastName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Sex</label>
                                <select name="sex" className={`common-input w-full ${formData.sex == '' ? 'input-empty' : ''}`}
                                    value={formData.sex}
                                    readOnly={true}
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
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="middleName" className="w-full px-4 text-xs">Mother's Middle Name (Maiden)</label>
                                <input type="text" className={`common-input w-full ${formData.mothersMiddleName == '' ? 'input-empty' : ''}`} placeholder="Middle Name"
                                    name="mothersMiddleName"
                                    value={formData.mothersMiddleName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Mother's Last Name</label>
                                <input type="text" className={`common-input w-full ${formData.mothersLastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                                    name="mothersLastName"
                                    value={formData.mothersLastName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Father's First Name</label>
                                <input type="text" className={`common-input w-full ${formData.fathersFirstName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                                    name="fathersFirstName"
                                    value={formData.fathersFirstName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="middleName" className="w-full px-4 text-xs">Father's Middle Name</label>
                                <input type="text" className={`common-input w-full ${formData.fathersMiddleName == '' ? 'input-empty' : ''}`} placeholder="Middle Name"
                                    name="fathersMiddleName"
                                    value={formData.fathersMiddleName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Father's Last Name</label>
                                <input type="text" className={`common-input w-full ${formData.fathersLastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                                    name="fathersLastName"
                                    value={formData.fathersLastName}
                                    readOnly={true}
                                />
                            </div>
                        </form>
                        <div className="flex-1 flex max-h-[800px] flex-col items-center p-2 relative overflow-hidden">
                            <div className="flex-1 max-h-[5%] w-full mb-4">
                                <DownloadImages images={trimmedPaths} />
                            </div>
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
           }
        </div>
    )
}