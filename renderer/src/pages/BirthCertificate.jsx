import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { InfoCard, BirthCertificateCreate, BirthCertificateHome, BirthCertificateView, BirthCertificateUpload } from '@components';
import { useSearchParams } from 'react-router-dom'; 

export default function BirthCertificate() {
    const [searchParams] = useSearchParams();
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);

    const [activeTab, setActiveTab] = useState('home'); //TODO: handle the active tab
    const [ocrResults, setOCRResults] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
        setActiveTab(searchParams.get('activeTab') ? searchParams.get('activeTab') : 'home' );
        setOCRResults(
            {
                "province": "SURIGAQ DEL SUR",
                "registry_number": "20 12 _ 2ar",
                "city": "CAGWAIT",
                "child_first_name": "JENNIFER",
                "child_middle_name": "NOLONG",
                "child_last_name": "GATO",
                "sex": "FEMALE",
                "dateOfBirth_day": "22",
                "dateOfBirth_month": "JULY",
                "dateOfBirth_year": "2012",
                "placeOfBirth_hospital": "Dosp  garancawsttutiont",
                "placeOfBirth_barangay": "MAT-E",
                "placeOfBirth_city": "CAGWAIT",
                "placeOfBirth_province": "SURIGAO DEL SUR",
                "type_of_birth": "SINGLE",
                "multiple_birth_order": "NOT APPLICABLE",
                "birth_order": "THIRD",
                "birth_weight": "2410",
                "maiden_first_name": "JENNY",
                "maiden_middle_name": "BERRO",
                "maiden_last_name": "NOLONG",
                "citizenship": "FILIPINO",
                "religion": "ROMAN CATHOLIC",
                "children_born_alive": "",
                "children_still_living": "",
                "children_deceased": "",
                "occupation": "HOUSEKEEPER",
                "age_at_birth": "38",
                "residence_house": "MAT-E",
                "residence_city": "CAGWAIT",
                "residence_province": "SURIGAO DEL SUR",
                "residence_country": "PHILIPPINES",
                "father_first_name": "EDDIE",
                "father_middle_name": "VASQUEZ",
                "father_last_name": "GATO",
                "father_citizenship": "FILIPINO",
                "father_religion": "ROMAN CATHOLIC",
                "father_occupation": "FARMER",
                "father_age_at_birth": "35",
                "father_residence_street": "MAT-E",
                "father_residence_city": "CAGWAIT",
                "father_residence_province": "SURIGAO DEL SUR",
                "father_residence_country": "PHILIPPINES",
                "date_of_marriage": "2008",
                "marriage_city": "CAGWAIT",
                "marriage_province": "SURIGAO DEL",
                "marriage_country": "PHILIPPINES",
                "attendant": "",
                "birth_time": "10 OQAM",
                "birth_date": "",
                "attendant_name": "ELENA S.PORTILLO",
                "attendant_title": "MDWEE",
                "attendant_address": "Dale",
                "informant_name": "Name in Print_JENNY N.GATO",
                "informant_relationship": "ELMA B_ErAZA",
                "informant_address": "MATE CAGWAIL_SURIGAO DEL SUR",
                "informant_date": "SEPTEMBERZ2012",
                "prepared_name": "OHaca",
                "prepared_title": "EENA",
                "prepared_date": "MONDALO",
                "received_name": "ADELAA.GARCIA",
                "received_title": "OEFICER",
                "received_date": "BEG.",
                "registrar_name": "1-I9-",
                "registrar_title": "12",
                "registrar_date": "SEPTEMBER Z2012",
                "remarks": "inkz",
                "office_boxes": "Jb",
                "mother_name": "To be",
                "father_name": "JENNY N GATO",
                "child_name": "JENNIFER NOLONG GATO",
                "child_birth_date": "SURIGAO DEL SUR",
                "child_birth_place": "ELENA s. PORTILLO",
                "jurat_day": "SURIGAO DEL SUR",
                "jurat_month_year": "PHILIPPINES",
                "jurat_affiant1": "FAILURE TO REGISTER BY THE PARENTS",
                "jurat_affiant2": "MOTHER",
                "ctc_number": "Oc fs bex",
                "ctc_date_issued": "2012",
                "ctc_place_issued": "2012",
                "admin_name": "SURIGAO DEL SUR",
                "admin_position": "63",
                "admin_address": "AREKY RPFHARCIA",
                "affiant_name": "Ocf 2",
                "civil_status": "",
                "address": "",
                "self_checkbox": 0,
                "self_pob": "",
                "self_dob": "",
                "child_checkbox": 0,
                "child_name_affidavit": "",
                "child_pob": "",
                "child_dob": "",
                "affidavit_attendant_name": "",
                "affidavit_attendant_address": "",
                "affidavit_citizenship": "",
                "parents_status": "",
                "marriage_date": "",
                "marriage_place": "",
                "affidavit_father_name": "",
                "reason_delay": "",
                "spouse_applicant": "",
                "spouse_owner": "",
                "final_jurat_day": "",
                "final_jurat_month_year": "",
                "final_jurat_place": "",
                "final_ctc_number": "",
                "final_ctc_issued_on": "",
                "final_ctc_issued_at": "",
                "admin_officer_name": "",
                "admin_officer_position": "",
                "admin_officer_address": ""
            }
        );
    }, []);
    return (
        <>
            <div className="flex w-screen h-screen">
                <SideBar
                    role={userData?.role}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <div className="p-4 flex-1 flex flex-col w-screen h-screen transition-all duration-300">
                    <h2 className="text-lg font-semibold text-left">Birth Certificate</h2>
                    <div className="flex justify-end mb-4 gap-2">
                        <button className={`btn-${activeTab == 'home' ? 'primary' : 'secondary'} shadow-lg px-3 py-1 rounded-full`}
                            onClick={() => setActiveTab("home")}
                        >
                            <i className="bi-house-door-fill"></i>
                        </button>
                        <button className={`btn-${activeTab == 'upload' ? 'primary' : 'secondary'} shadow-lg text-white px-3 py-1 rounded-full`}
                            onClick={() => setActiveTab("upload")}
                        >
                            Upload
                        </button>
                        <button className={`btn-${activeTab == 'create' ? 'primary' : 'secondary'} shadow-lg text-white px-3 py-1 rounded-full`}
                            onClick={() => setActiveTab("create")}
                        >
                            Create
                        </button>
                    </div>
                    <div id="managementContent" className="p-4 bg-white w-full h-screen overflow-y-auto flex justify-center shadow-lg rounded-lg">
                        {activeTab === "home" && 
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                            <div className="mb-4">
                                <InfoCard 
                                    title="List of Birth Certificates"
                                    message="Browse and manage the official records of registered birth certificates"
                                />
                            </div>
                            <div className="form-content mb-4">
                                <BirthCertificateHome 
                                    onView={(row) => {
                                        setSelectedRow(row); 
                                        setActiveTab("view"); 
                                    }} 
                                />
                            </div>
                        </div>   
                        }
                        {activeTab === "upload" && 
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard
                                        title="Upload Birth Certificates"
                                        message="To upload a birth certificate, please use the form below to select and submit the document. Ensure that the file is in an accepted format (e.g., PDF, JPEG) and does not exceed the maximum file size limit."
                                    />
                                </div>
                                <div>
                                    <BirthCertificateUpload setActiveTab={setActiveTab} onOCRComplete={(data) => {
                                        setOCRResults(data);
                                    }} />
                                </div>
                            </div>
                        }
                        {activeTab === "create" &&
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    {ocrResults? (
                                        <>
                                            <InfoCard
                                                title="Warning before creating Live Birth"
                                                message={`Please double check each values before confirming. \nYou may go back to the upload tab to re-upload another document if the values are incorrect.`}
                                            />
                                        </>
                                    ) : (
                                        <InfoCard
                                            title="Creating Birth Certificates"
                                            message="To create a birth certificate, please fill out the form below with accurate information about the birth event. Ensure all mandatory fields are completed before submitting the form."
                                        />
                                    )}
                                </div>
                                <div className="form-content mb-4">
                                    <BirthCertificateCreate defaultOCRValues={ocrResults} />
                                </div>
                            </div>
                        }
                        {activeTab === "view" && 
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <div className="flex justify-end w-full">
                                        <button 
                                        className="btn-secondary shadow px-3 py-1 mb-2 rounded-full"
                                        onClick={() => setActiveTab("home")}
                                    >
                                    ⬅ Back
                                    </button>
                                </div>
                                <InfoCard 
                                    title="Viewing Birth Certificate"
                                    message="Here is the full detail of the selected birth certificate record."
                                />
                            </div>
                            <div className="form-content mb-4">
                                <BirthCertificateView row={selectedRow} />
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
