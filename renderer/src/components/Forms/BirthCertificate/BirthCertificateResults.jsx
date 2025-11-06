import { useState, useEffect } from "react";
import { BirthCertServices } from "@services";
import { BirthCertificate } from '@enums';
import { Spinner } from '@components';
import { toast } from "react-toastify";

export default function BirthCertificateResults ({defaultData, filePath, activeTab, isView = false}) {
    const [loading, setLoading] = useState(true);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [formData, setFormData] = useState({
        creatorId : JSON.parse(localStorage.getItem('user'))?.id || null,
        registryNumber: defaultData.registry_number ?? '',
        dateOfBirth: defaultData.birth_date ?? '',
        placeOfBirth: defaultData.child_birth_place ?? '',
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
                const viewData = response.data;
                console.table(viewData);
                if (response && response.success && response.data) {
                    setDocumentFiles(JSON.parse(response.data.uploaded_file.file_path));
                    setFormData((prev) => ({
                        ...prev,
                        registryNumber: viewData?.registry_number || '',
                        dateOfBirth: viewData?.birth_date || '',
                        placeOfBirth: viewData?.child_birth_place || '',
                        childFirstName: viewData?.child_first_name || '',
                        childMiddleName: viewData?.child_middle_name || '',
                        childLastName: viewData?.child_last_name || '',
                        sex: viewData?.sex || '',
                        mothersFirstName: viewData?.maiden_first_name || '',
                        mothersMiddleName: viewData?.maiden_middle_name || '',
                        mothersLastName: viewData?.maiden_last_name || '',
                        fathersFirstName: viewData?.father_first_name || '',
                        fathersMiddleName: viewData?.father_middle_name || '',
                        fathersLastName: viewData?.father_last_name || '',
                        filePath: trimmedPaths || '',
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
    }, [defaultData, filePath]);

    //TODO: this will manipulate the image files
    const trimmedPaths =
        filePath && filePath.length > 0
        ? filePath.map((path) => {
        const index = path.indexOf("/backend");
        return index !== -1
          ? "http://localhost:3001" + path.slice(index)
          : path;
      })
    : documentFiles;

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
        setLoading(true);
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
                    placeOfBirth: '',
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
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col w-full">
            {
                loading ? (<>
                    <Spinner />
                </>) : (<>
                    <div className="flex flex-row gap-4 mb-8">
                        <form action="" method="post" className="flex-1 h-full flex flex-col" onSubmit={handleOnSubmit} encType="multipart/form-data">
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Registry Number</label>
                                <input type="text" className="common-input w-full" placeholder="Registry Number"
                                    name="registryNumber"
                                    value={formData.registryNumber}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Date of Birth</label>
                                <input type="date" className="common-input w-full" placeholder="Date of Birth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="registryNumber" className="w-full px-4 text-xs">Place of Birth</label>
                                <input type="text" className="common-input w-full" placeholder="Place of Birth"
                                    name="placeOfBirth"
                                    value={formData.placeOfBirth}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Child's First Name</label>
                                <input type="text" className="common-input w-full" placeholder="First Name"
                                    name="firstName"
                                    value={formData.childFirstName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Child's Middle Name</label>
                                <input type="text" className="common-input w-full" placeholder="First Name"
                                    name="firstName"
                                    value={formData.childMiddleName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Child's Last Name</label>
                                <input type="text" className="common-input w-full" placeholder="Last Name"
                                    name="lastName"
                                    value={formData.childLastName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Sex</label>
                                <select name="sex" className={`common-input w-full`}
                                    value={formData.sex}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                >
                                    <option value="">Select</option>
                                    <option value={BirthCertificate.SexTypes.MALE.toUpperCase()}>{BirthCertificate.SexTypes.MALE.toUpperCase()}</option>
                                    <option value={BirthCertificate.SexTypes.FEMALE.toUpperCase()}>{BirthCertificate.SexTypes.FEMALE.toUpperCase()}</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Mothers's First Name</label>
                                <input type="text" className="common-input w-full" placeholder="First Name"
                                    name="firstName"
                                    value={formData.mothersFirstName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="middleName" className="w-full px-4 text-xs">Mother's Middle Name (Maiden)</label>
                                <input type="text" className="common-input w-full" placeholder="Middle Name"
                                    name="middleName"
                                    value={formData.mothersMiddleName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Mother's Last Name</label>
                                <input type="text" className="common-input w-full" placeholder="Last Name"
                                    name="lastName"
                                    value={formData.mothersLastName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="firstName" className="w-full px-4 text-xs">Father's First Name</label>
                                <input type="text" className="common-input w-full" placeholder="First Name"
                                    name="firstName"
                                    value={formData.fathersFirstName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="middleName" className="w-full px-4 text-xs">Father's Middle Name</label>
                                <input type="text" className="common-input w-full" placeholder="Middle Name"
                                    name="middleName"
                                    value={formData.fathersMiddleName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="w-full px-4 text-xs">Father's Last Name</label>
                                <input type="text" className="common-input w-full" placeholder="Last Name"
                                    name="lastName"
                                    value={formData.fathersLastName}
                                    onChange={handleOnChange}
                                    readOnly={isView}
                                />
                            </div>
                            <button type="submit" hidden={isView} className={`btn-primary mt-4 px-4 py-2 rounded-full shadow-lg max-w-[100px]`}>Confirm</button>
                        </form>
                        <div className="flex-1 flex flex-col items-center p-2 relative overflow-hidden">
                            <div className="flex-1 w-full">
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
                </>)
            }
            
        </div>
    )
}