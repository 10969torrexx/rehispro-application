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
        setOCRResults({
            "province": "DAVAO DEL NORTE",
            "city": "TAGUM CITY",
            "registry_number": "2025-3945",
            "first_name": "BLAISE",
            "middle_name": "SUMAOY",
            "last_name": "GATORIAN",
            "sex": "FEMALE",
            "date_of_death": "13 AUGUST  2025",
            "date_of_birth": "14 NOVEMBER 2014",
            "age_years": "DAVAO REGIONAL",
            "age_months": "APOKON",
            "age_days": "DAVAO DEL",
            "age_hours": "NORTE",
            "age_minutes": "PENTECOSTAL",
            "place_of_death": "FILIPINO",
            "civil_status": "PUROK",
            "religion": "BAYOGO",
            "citizenship": "MADRID",
            "residence_house": "SUR IGAO DEL SUR",
            "residence_street": "PHILIPPINES",
            "residence_barangay": "STUDENT",
            "residence_city": "JERLO",
            "residence_province": "GATORIAN",
            "residence_country": "DECEMJAY",
            "occupation": "SUMAOY",
            "father_first_name": "SEVERE",
            "father_middle_name": "MONTHS",
            "father_last_name": "UNKNOWN",
            "mother_first_name": "UNKNOWN",
            "mother_middle_name": "UNKNONMW",
            "mother_last_name": "home",
            "aged_of_mother": "NO",
            "method_of_delivery": "MARY Trisha",
            "length_of_pregnancy": "MERNIE",
            "type_of_birth": "ESTRADA",
            "if_multiple_birth": "MD",
            "main_disease_condition_of_infant": "lica",
            "other_diseases_conditions_of_infant": "OFFICER",
            "main_maternal_disease_condition_affecting_infant": "III",
            "other_maternal_disease_condition_affecting_infant": "APOKON",
            "other_relevant_circumstances": "TAGUM CITY",
            "immediate_cause": "iity",
            "antecedent_cause": "AUGusT",
            "underlying_cause": "2025",
            "interval_immediate": "Hob",
            "interval_antecedent": "24b. TRANSFER PERMIT",
            "interval_underlying": "BURIAL",
            "other_conditions": "ESPERANZA PUBLIC CEMETERY",
            "maternal_condition": "SUR",
            "manner_of_death": "JERLO_GATORIAN",
            "autopsy": "RN",
            "place_occurrence": "FATHER",
            "attendant": "NURSE",
            "attendant_from": "MADRID",
            "attendant_to": "SURIGAO DELSUR",
            "attended_deceased": "AUGUST",
            "time_of_death": "2025",
            "physician_name": "AUGUST",
            "physician_title": "2025",
            "physician_address": "RIZZAM_ALMEDORA",
            "health_officer_name": "MCCARTNEY",
            "disposal_type": "ASSISIANLREGISTRATION OFFICER",
            "permit_number": "AUGuSt",
            "permit_date": "414",
            "transfer_permit": "2025",
            "transfer_permit_date": "AUGUSL 14",
            "cemetery_name": "2025",
            "cemetery_address": "CWF",
            "informant_name": "BLAISE",
            "informant_relationship": "SUMAOI",
            "informant_address": "GAIDRLAN",
            "informant_date": "LONIED",
            "prepared_name": "Edalme",
            "prepared_title": "ENGR.",
            "prepared_date": "JULLS",
            "received_name": "CAEAK",
            "received_title": "MAI",
            "received_date": "MDKUD_",
            "registrar_name": "oileol 2017",
            "registrar_title": "JUl4 2D26",
            "registrar_date": "",
            "remarks": "",
            "office_boxes": "",
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
