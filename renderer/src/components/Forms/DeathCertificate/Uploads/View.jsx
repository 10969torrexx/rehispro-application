import { useState, useEffect } from "react";
import { DeathCertServices } from "@services";
import { Spinner, DownloadImages } from '@components';
import { toast } from "react-toastify";
export default function View ({defaultData}) {
    const [loading, setLoading] = useState(true);
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
                const response = await DeathCertServices.viewDeathCertificate(dataId);
                setTrimmedPaths(JSON.parse(response.data.uploaded_file.file_path));
                setFormData({
                    creatorName: response.data.creator_name || '',
                    registryNumber: response.data.registry_number ?? '',
                    firstName: response.data.first_name ??'',
                    middleName: response.data.middle_name ?? '',
                    lastName: response.data.last_name ?? '',
                    dateOfDeath: response.data.date_of_death ?? '',
                    placeOfDeath: response.data.place_of_death ?? '',
                    sex: response.data.sex ?? '',
                });
            } catch (error) {
                toast.error(error.message || "Failed to fetch birth certificates");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        setLoading(false);
    }, []);

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
                                    readOnly={true}
                                    value={formData.registryNumber}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Date of Death</label>
                                <input type="date" className={`common-input w-full ${formData.dateOfDeath == '' ? 'input-empty' : ''}`}
                                    readOnly={true}
                                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                                    value={formData.dateOfDeath}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Death</label>
                                <input type="text" className={`common-input w-full ${formData.placeOfDeath == '' ? 'input-empty' : ''}`} placeholder="Place of Death"
                                    readOnly={true}
                                    value={formData.placeOfDeath}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Deceased's First Name</label>
                                <input type="text" className={`common-input w-full ${formData.firstName == '' ? 'input-empty' : ''}`} placeholder="Middle Name"
                                    name="firstName"
                                    readOnly={true}
                                    value={formData.firstName}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Deceased's Middle Name</label>
                                <input type="text" className={`common-input w-full ${formData.middleName == '' ? 'input-empty' : ''}`} placeholder="Middle Name"
                                    name="middleName"
                                    readOnly={true}
                                    value={formData.middleName}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Deceased's Last Name</label>
                                <input type="text" className={`common-input w-full ${formData.lastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                                    name="lastName"
                                    readOnly={true}
                                    value={formData.lastName}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Sex</label>
                                <select name="sex" className={`common-input w-full ${formData.sex == '' ? 'input-empty' : ''}`}
                                    value={formData.sex}
                                    readOnly={true}
                                >
                                    <option value="">Select</option>
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                </select>
                            </div>
                        </form>
                        <div className="flex-1 flex flex-col items-center p-2 relative overflow-hidden">
                            <div className="flex-1 max-h-[10%] test-element w-full mb-4">
                                <DownloadImages images={trimmedPaths} document={'birth-certififcate'} />
                            </div>
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
            }
        </div>
    )
}