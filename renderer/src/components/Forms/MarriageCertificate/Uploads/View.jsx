import { useState, useEffect } from "react";
import { MarriageCertServices } from "@services";
import { toast } from "react-toastify";
import { Spinner, DownloadImages } from '@components';

export default function View ({row}) {
    const [loading, setLoading] = useState(false);
    const [trimmedPaths, setTrimmedPaths] = useState([]);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        if (!row) {
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await MarriageCertServices.viewMarriageCertificate(row.id);
                console.log(response);
                if (response.success) {
                    setFormData({
                        creatorName: response.data.creator_name ?? '',
                        registry: response.data.registry ?? '',
                        husbandFirstName: response.data.husband_first_name ?? '',
                        husbandMiddleName: response.data.husband_middle_name ?? '',
                        husbandLastName: response.data.husband_last_name ?? '',
                        wifeFirstName: response.data.wife_first_name ?? '',
                        wifeMiddleName: response.data.wife_middle_name ?? '',
                        wifeLastName: response.data.wife_last_name ?? '',
                        placeOfMarriage: response.data.place_of_marriage ?? '',
                        province: response.data.province ?? '',
                    });
                    setTrimmedPaths(JSON.parse(response.data.uploaded_file.file_path));
                } else {
                    toast.error(response.message || 'Failed to fetch marriage certificate data');
                }
            } catch (error) {
                console.error('Error fetching marriage certificate data:', error);
                toast.error('An error occurred while fetching marriage certificate data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [row]);

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
                        <form action="" method="post" className="flex-1 h-full flex flex-col" >
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
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Husband's Middle Name</label>
                                <input type="text" className={`common-input w-full ${formData.husbandMiddleName == '' ? 'input-empty' : ''}`} placeholder="Husband's Middle Name"
                                    name="husbandMiddleName"
                                    value={formData.husbandMiddleName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Wife's First Name</label>
                                <input type="text" className={`common-input w-full ${formData.wifeFirstName == '' ? 'input-empty' : ''}`} placeholder="First Name"
                                    name="wifeFirstName"
                                    value={formData.wifeFirstName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Wife's Middle Name</label>
                                <input type="text" className={`common-input w-full ${formData.wifeMiddleName == '' ? 'input-empty' : ''}`} placeholder="Middle Name"
                                    name="wifeMiddleName"
                                    value={formData.wifeMiddleName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Wife's Last Name</label>
                                <input type="text" className={`common-input w-full ${formData.wifeLastName == '' ? 'input-empty' : ''}`} placeholder="Last Name"
                                    name="wifeLastName"
                                    value={formData.wifeLastName}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Province</label>
                                <input type="text" className={`common-input w-full ${formData.province == '' ? 'input-empty' : ''}`} placeholder="Province"
                                    name="province"
                                    value={formData.province}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Place of Marriage</label>
                                <input type="text" className={`common-input w-full ${formData.placeOfMarriage == '' ? 'input-empty' : ''}`} placeholder="Place of Marriage"
                                    name="placeOfMarriage"
                                    value={formData.placeOfMarriage}
                                    readOnly={true}
                                />
                            </div>
                        </form>
                        <div className="flex-1 flex flex-col items-center p-2 relative overflow-hidden">
                            <div className="flex-1 max-h-[10%] w-full mb-4">
                                <DownloadImages images={trimmedPaths} document={'marriage-certificate'} />
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