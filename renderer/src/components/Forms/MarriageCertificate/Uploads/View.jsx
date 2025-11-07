import { useState } from "react";
import { MarriageCertServices } from "@services";
import { toast } from "react-toastify";

export default function View ({defaultData}) {
    const [loading, setLoading] = useState(false);
    const trimmedPaths = filePath.map((path) => {
        const index = path.indexOf("/backend");
        return index !== -1 ? "http://localhost:3001" + path.slice(index) : path;
    });
    
    const [formData, setFormData] = useState({
        creatorId : JSON.parse(localStorage.getItem('user'))?.id || null,
        registry: defaultData?.registry_number || '',
        husbandFirstName: defaultData?.husband_first_name ||'',
        husbandMiddleName: defaultData?.husband_middle_name || '',
        husbandLastName: defaultData?.husband_last_name || '',
        wifeFirstName: defaultData?.wife_first_name || '',
        wifeMiddleName: defaultData?.wife_middle_name || '',
        wifeLastName: defaultData?.wife_last_name || '',
        husbandSex: defaultData?.husband_sex || '',
        wifeSex: defaultData?.wife_sex || '',
        filePath: trimmedPaths || []
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
            const response = await MarriageCertServices.insertMarriageCertificate(formData);
            if (response.success) {
                toast.success(`${response.message || 'Marriage Certificate created successfully! '}`)
                setFormData({
                    registry: '',
                    husbandFirstName: '',
                    husbandMiddleName: '',
                    husbandLastName: '',
                    wifeFirstName: '',
                    wifeMiddleName: '',
                    wifeLastName: '',
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
                        <label htmlFor="registry" className="w-full px-4 text-xs">Registry Number</label>
                        <input type="text" className={`common-input w-full ${formData.registry == '' ? 'input-empty' : ''}`} placeholder="Registry Number"
                            name="registry"
                            value={formData.registry}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Husband's First Name</label>
                         <input type="text" className={`common-input w-full ${formData.husbandFirstName == '' ? 'input-empty' : ''}`} placeholder="Husband's First Name"
                            name="husbandFirstName"
                            value={formData.husbandFirstName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="registryNumber" className="w-full px-4 text-xs">Husband's Middle Name</label>
                        <input type="text" className={`common-input w-full ${formData.husbandMiddleName == '' ? 'input-empty' : ''}`} placeholder="Husband's Middle Name"
                            name="husbandMiddleName"
                            value={formData.husbandMiddleName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Wife's First Name</label>
                        <input type="text" className={`common-input w-full ${formData.wifeFirstName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                            name="wifeFirstName"
                            value={formData.wifeFirstName}
                            onChange={handleOnChange}
                        />
                    </div>
                     <div className="flex-1">
                        <label htmlFor="firstName" className="w-full px-4 text-xs">Wife's Middle Name</label>
                        <input type="text" className={`common-input w-full ${formData.wifeMiddleName == '' ? 'input-empty' : ''}`} placeholder="Middle Name"
                            name="wifeMiddleName"
                            value={formData.wifeMiddleName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Wife's Last Name</label>
                        <input type="text" className={`common-input w-full ${formData.wifeLastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                            name="wifeLastName"
                            value={formData.wifeLastName}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Husband's Gender</label>
                        <select name="husbandGender" className={`common-input w-full ${formData.husbandGender == '' ? 'input-empty' : ''}`}
                            value={formData.husbandSex}
                            onChange={handleOnChange}
                        >
                            <option value="">Select</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="w-full px-4 text-xs">Wife's Gender</label>
                        <select name="wifeGender" className={`common-input w-full ${formData.wifeGender == '' ? 'input-empty' : ''}`}
                            value={formData.wifeSex}
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