import { useState } from "react";
import { DeathCertServices } from "@services";
import { toast } from "react-toastify";

export default function DeathCertificateResults ({defaultData, filePath, activeTab}) {
    const [loading, setLoading] = useState(false);
    const trimmedPaths = filePath.map((path) => {
        const index = path.indexOf("/backend");
        return index !== -1 ? "http://localhost:3001" + path.slice(index) : path;
    });
    const [formData, setFormData] = useState({
        creatorId : JSON.parse(localStorage.getItem('user'))?.id || null,
        registryNumber: defaultData?.registry_number ?? '',
        firstName: defaultData?.first_name ?? '',
        middleName: defaultData?.middle_name ?? '',
        lastName: defaultData?.last_name ?? '',
        dateOfDeath: defaultData?.date_of_death ?? '',
        placeOfDeath: `${defaultData?.placeOfDeath_hospital}, ${defaultData?.placeOfDeath_barangay}, ${defaultData?.placeOfDeath_city}, ${defaultData?.placeOfDeath_province}`,
        sex: defaultData?.sex,
        filePath: trimmedPaths ?? '',
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % trimmedPaths.length);
    };
    const prevImage = () => {
        setCurrentIndex((prev) =>
        prev === 0 ? trimmedPaths.length - 1 : prev - 1
        );
    };

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
            const response = await DeathCertServices.insertDeathCertificate(formData);
            if (response.success) {
                toast.success(`${response.message || 'Death Certificate created successfully! '}`)
                setFormData({
                    registryNumber: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dateOfDeath: '',
                    placeOfDeath: '',
                    sex: '',
                });
                activeTab('upload')
            } else {
                toast.error(response.message || 'Failed creating file');
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row gap-4 mb-8">
                <form action="" method="post" className="flex-1 h-full flex flex-col" onSubmit={handleOnSubmit} encType="multipart/form-data">
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Registry Number</label>
                        <input type="text" className="common-input w-full" placeholder="Registry Number"
                            name="registryNumber"
                            onChange={handleOnChange}
                            value={formData.registryNumber}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Date of Death</label>
                        <input type="date" className="common-input w-full"
                            name="dateDeath"
                            onChange={handleOnChange}
                            onClick={(e) => e.target.showPicker && e.target.showPicker()}
                            value={formData.dateOfDeath}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Death</label>
                        <input type="text" className="common-input w-full" placeholder="Place of Death"
                            name="deathPlace"
                            onChange={handleOnChange}
                            value={formData.placeOfDeath}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Deceased's First Name</label>
                         <input type="text" className="common-input w-full" placeholder="Middle Name"
                            name="firstName"
                            onChange={handleOnChange}
                            value={formData.firstName}
                        />
                    </div>
                     <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Deceased's Middle Name</label>
                         <input type="text" className="common-input w-full" placeholder="Middle Name"
                            name="middleName"
                            onChange={handleOnChange}
                            value={formData.middleName}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Deceased's Last Name</label>
                        <input type="text" className="common-input w-full" placeholder="Last Name"
                            name="lastName"
                            onChange={handleOnChange}
                            value={formData.lastName}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Sex</label>
                        <select name="sex" className={`common-input w-full`}
                            value={formData.sex}
                            onChange={handleOnChange}
                        >
                            <option value="">Select</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                    </div>
                    <button className={`btn-primary mt-4 px-4 py-2 rounded-full shadow-lg max-w-[100px]`}>Confirm</button>
                </form>
                <div className="flex-1 flex flex-col items-center p-2 relative overflow-hidden">
                    <div className="flex-1 w-full mb-4">
                        <div className="relative w-full h-full rounded-xl shadow-md border border-gray-300 overflow-hidden">
                            {trimmedPaths.map((path, index) => (
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