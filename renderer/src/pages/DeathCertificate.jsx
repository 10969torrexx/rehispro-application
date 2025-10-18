import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { DocumentType } from '@enums';
import { capitalizeFirst, capitalizeWords } from "@myTools";
import { InfoCard, DeathCertificateCreate, DeathCertificateHome, DeathCertificateView, DeathCertificateUpload } from '@components';

export default function DeathCertificate() {
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
    }, []);
    const [activeTab, setActiveTab] = useState("home"); //TODO: handle the active tab
    const [ocrResults, setOCRResults] = useState(null);

    useEffect(() => {
        setOCRResults(
            {
                "province": "DAVAO DEL NORTE",
                "city": "TAGUM CITY",
                "registry_number": "2025-3945",
                "first_name": "BLAISE",
                "middle_name": "SUMAOY",
                "last_name": "GATORIAN",
                "sex": "FEMALE",
                "date_of_death": "13 AUGUST  2025",
                "date_of_birth": "14 NOVEMBER 2014",
                "age_years": "",
                "age_months": "",
                "age_days": "",
                "age_hours": "",
                "age_minutes": "",
                "placeOfDeath_hospital": "DAVAO REGIONAL",
                "placeOfDeath_barangay": "APOKON",
                "placeOfDeath_city": "DAVAO DEL",
                "placeOfDeath_province": "NORTE",
                "civil_status": "",
                "religion": "PENTECOSTAL",
                "citizenship": "FILIPINO",
                "residence_house": "PUROK",
                "residence_street": "BAYOGO",
                "residence_barangay": "MADRID",
                "residence_city": "SUR IGAO DEL SUR",
                "residence_province": "PHILIPPINES",
                "residence_country": "STUDENT",
                "occupation": "JERLO",
                "father_first_name": "GATORIAN",
                "father_middle_name": "DECEMJAY",
                "father_last_name": "SUMAOY",
                "mother_first_name": "SEVERE",
                "mother_middle_name": "MONTHS",
                "mother_last_name": "UNKNOWN",

                "aged_of_mother": "UNKNOWN",
                "method_of_delivery": "UNKNONMW",
                "length_of_pregnancy": "home",
                "type_of_birth": "NO",
                "if_multiple_birth": "MARY Trisha",
                "main_disease_condition_of_infant": "MERNIE",
                "other_diseases_conditions_of_infant": "ESTRADA",
                "main_maternal_disease_condition_affecting_infant": "MD",
                "other_maternal_disease_condition_affecting_infant": "lica",
                "other_relevant_circumstances": "OFFICER",
                
                "immediate_cause": "III",
                "antecedent_cause": "APOKON",
                "underlying_cause": "TAGUM CITY",
                "interval_immediate": "iity",
                "interval_antecedent": "AUGusT",
                "interval_underlying": "2025",
                "other_conditions": "Hob",
                "maternal_condition": "24b. TRANSFER PERMIT",
                "manner_of_death": "BURIAL",
                "autopsy": "ESPERANZA PUBLIC CEMETERY",
                "place_occurrence": "SUR",
                "attendant": "JERLO_GATORIAN",
                "attendant_from": "RN",
                "attendant_to": "FATHER",
                "attended_deceased": "NURSE",
                "time_of_death": "MADRID",
                "physician_name": "SURIGAO DELSUR",
                "physician_title": "AUGUST",
                "physician_address": "2025",
                "health_officer_name": "AUGUST",
                "disposal_type": "2025",
                "permit_number": "RIZZAM_ALMEDORA",
                "permit_date": "MCCARTNEY",
                "transfer_permit": "ASSISIANLREGISTRATION OFFICER",
                "transfer_permit_date": "AUGuSt",
                "cemetery_name": "414",
                "cemetery_address": "2025",
                "informant_name": "AUGUSL 14",
                "informant_relationship": "2025",
                "informant_address": "CWF",
                "informant_date": "BLAISE",
                "prepared_name": "SUMAOI",
                "prepared_title": "GAIDRLAN",
                "prepared_date": "LONIED",
                "received_name": "Edalme",
                "received_title": "ENGR.",
                "received_date": "JULLS",
                "registrar_name": "CAEAK",
                "registrar_title": "MAI",
                "registrar_date": "MDKUD_",
                "remarks": "oileol 2017",
                "office_boxes": "JUl4 2D26",
                "postmortem_cause": "",
                "postmortem_name": "",
                "postmortem_title": "",
                "postmortem_address": "",
                "postmortem_date": "",
                "embalmer_name": "",
                "embalmer_title": "",
                "embalmer_address": "",
                "embalmer_license": "",
                "embalmer_issued_on": "",
                "embalmer_issued_at": "",
                "embalmer_expiry": "",
                "affiant_name": "",
                "affiant_civil_status": "",
                "address": "",
                "deceased_name": "",
                "death_date": "",
                "death_place": "",
                "attended_by": "",
                "not_attended": "",
                "cause_of_death": "",
                "reason_delay": "",
                "jurat_day": "",
                "jurat_month_year": "",
                "jurat_place": "",
                "ctc_number": "",
                "ctc_issued_on": "",
                "ctc_issued_at": "",
                "admin_name": "",
                "admin_position": "",
                "admin_address": ""
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
                    <h2 className="text-lg font-semibold text-left">Death Certificate</h2>
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
                                    title="List of Death Certificates"
                                    message="Browse and manage the official records of registered death certificates"
                                />  
                            </div>
                            <div className="form-content mb-4">
                                <DeathCertificateHome 
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
                                        title="Upload Death Certificates"
                                        message="To upload a birth certificate, please use the form below to select and submit the document. Ensure that the file is in an accepted format (e.g., PDF, JPEG) and does not exceed the maximum file size limit."
                                    />  
                                </div>
                                <div>
                                    <DeathCertificateUpload setActiveTab={setActiveTab} onOCRComplete={(data) => {
                                        setOCRResults(data);
                                    }} />
                                </div>
                            </div>
                        }
                        {activeTab === "create" && 
                            <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard 
                                        title="Creating Death Certificates"
                                        message="To create a death certificate, please fill out the form below with accurate information about the death event. Ensure all mandatory fields are completed before submitting the form."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <DeathCertificateCreate defaultOCRValues={ocrResults} />
                                </div>
                            </div>
                        }
                        {activeTab === "view" && 
                            <div className="py-5 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                                <div className="mb-4">
                                    <InfoCard 
                                        title="Viewing Death Certificate"
                                        message="Here is the full detail of the selected death certificate record."
                                    />
                                </div>
                                <div className="form-content mb-4">
                                    <DeathCertificateView row={selectedRow} />
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}
