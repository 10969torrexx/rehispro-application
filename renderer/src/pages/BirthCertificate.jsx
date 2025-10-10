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
        console.table(ocrResults);
        setOCRResults({
            "province": "tReeGhippirer =",
            "city": "SURIGAQ DEL SUR",
            "registry_number": "20 12 _ 2ar",
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
            "date_of_marriage": "FEBRUARY 25, 2008",
            "marriage_city": "CAGWAIT",
            "marriage_province": "SURIGAO DEL",
            "marriage_country": "PHILIPPINES",
            "attendant_physician": "SUR",
            "attendant_nurse": "10 OQAM",
            "attendant_midwife": "Iuu_",
            "attendant_hilot": "ELENA S.PORTILLO",
            "attendant_others": "MDWIEE",
            "attendant_others_specify": "Dale",
            "date_of_attendance": "SEPTEMBER Z, 2012",
            "attendant_name_title": "Name in Print_JENNY N.GATO",
            "birth_time": "ELMA B_ErAZA",
            "birth_date": "MATE CAGWAIL_SURIGAO DEL SUR",
            "attendant_name": "SEETEMBER Z,2012_",
            "attendant_title": "SEPTEMBERZ2012",
            "attendant_address": "A|kuw",
            "attendant_date_signed": "OHaca",
            "attendant_signature": "EENA",
            "informant_name": "MONDALO",
            "informant_relationship": "ADELAA.GARCIA",
            "informant_address": "OEFICER",
            "informant_date": "REG.",
            "prepared_name": "1-/9-",
            "prepared_title": "12",
            "prepared_date": "SEPTEMBER Z2012",
            "received_name": "inkz",
            "received_title": "Jb",
            "received_date": "To be",
            "registrar_signature": "JENNY N GATO",
            "registrar_name": "MAT-E, CAGWAIT, SURIGAO DEL SUR",
            "registrar_title": "MAT-E, CAGWAIT _",
            "registrar_date": "JENNIFER NOLONG GATO",
            "remarks": "SURIGAO DEL SUR",
            "office_boxes": "JULY 22, 2012",
            "mother_name": "ELENA s. PORTILLO",
            "father_name": "UNIDAD, CAGWAIT,",
            "child_name": "SURIGAO DEL SUR",
            "child_birth_date": "PHILIPPINES",
            "child_birth_place": "FEBRUARY 25, 2008",
            "jurat_day": "CAGWAIT, SURIGAO DEL SUR",
            "jurat_month_year": "FAILURE TO REGISTER BY THE PARENTS",
            "jurat_affiant1": "MOTHER",
            "jurat_affiant2": "Oc fs bex",
            "ctc_number": "2012",
            "ctc_date_issued": "CAGWAIT;, SURIGAO DEL SUR",
            "ctc_place_issued": "@Eten]4 GATO",
            "admin_name": "ber",
            "admin_position": "2012",
            "admin_address": "CAGWAIT, SURIGAO DEL SUR",
            "admin_signature": "SURIGAO DEL SUR",
            "affiant_name": "MAY 25, 2012",
            "civil_status": "MAT-E, CAGWAIT ,",
            "address": "26154562/261545",
            "self_checkbox": "63",
            "self_pob": "OHa-u ~",
            "self_dob": "ADM; OFFICER IVIOIC-MCR",
            "child_checkbox": "CAGWAIT, SURIGAO DEL SUR",
            "child_name_affidavit": "AREKY RPFHARCIA",
            "child_pob": "Augusi \"",
            "child_dob": "MWe ,",
            "affidavit_attendant_name": "/9m ,",
            "affidavit_attendant_address": "Ocf 2",
            "affidavit_citizenship": "",
            "parents_status": "",
            "marriage_date": "",
            "marriage_place": "",
            "affidavit_father_name": "",
            "reason_delay": "",
            "spouse_applicant": "",
            "spouse_owner": "",
            "affiant_signature": "",
            "final_jurat_day": "",
            "final_jurat_month_year": "",
            "final_jurat_place": "",
            "final_ctc_number": "",
            "final_ctc_issued_on": "",
            "final_ctc_issued_at": "",
            "admin_officer_signature": "",
            "admin_officer_name": "",
            "admin_officer_position": "",
            "admin_officer_address": ""
        });
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
