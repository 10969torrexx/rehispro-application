import { useState } from "react";
import { BirthCertServices } from "@services";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Badge } from '@components';

export default function BirthCertificateSearch ({setActiveTab, setSelectedRow}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        childFirstName: '',
        childMiddleName: '',
        childLastName: '',
        maidenFistName: '',
        maidenMiddleName: '',
        maidenLastName: '',
        fatherFirstName: '',
        fatherMiddleName: '',
        fatherLastName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        registryNumber: '',
    });
    const handleOnChange = (e) => { 
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const columns = [
        { field: "index", headerName: "#", flex: 1 },
        { field: "registry_number", headerName: "Registry Number", flex: 1 },
        { field: "creation_type", headerName: "Creation Type", flex: 1,
            renderCell: (params) => (
                <Badge 
                    status={params.value}
                    color= {
                        params.value == 'upload'? 'blue' :
                        params.value == 'manual'? 'yellow' : 'gray'
                    }
                />
            )
        },
        { field: "child_first_name", headerName: "First Name", flex: 1 },
        { field: "child_middle_name", headerName: "Middle Name", flex: 1 },
        { field: "child_last_name", headerName: "Last Name", flex: 1 },
        { field: "date_of_birth", headerName: "Date of Birth", flex: 1 },
        { field: "child_birth_place", headerName: "Place of Birth", flex: 1 },
        { field: "action", headerName: "Action", flex: 1,
            renderCell: (params) => (
                <button className="rounded-full btn-primary-outlined text-xs px-1 py-0.5 w-full" 
                    onClick={() => {
                        setSelectedRow(params.row);
                        setActiveTab(params.row.creation_type == 'manual' ? 'view' : 'uploadView'); 
                    }}
                >View
                </button>
            )
        },
    ];
    const [rows, setRows] = useState([]);

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const isFormEmpty = Object.values(formData).every(value => value.trim() === '');
            if (isFormEmpty) {
                toast.error('Please fill at least one field to search');
                setLoading(false);
                return;
            }
            const response = await BirthCertServices.search(formData);
            if (response.success) {
                toast.success('Search completed successfully');
                const indexedData = response.data.map((item, index) => ({
                    ...item,
                    index: index + 1
                }));
                setRows(indexedData);
                setFormData({
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    maidenFirstName: '',
                    maidenMiddleName: '',
                    maidenLastName: '',
                    fathersFirstName: '',
                    fathersMiddleName: '',
                    fathersLastName: '',
                    dateOfBirth: '',
                    placeOfBirth: '',
                    registryNumber: '',
                });
            } else {
                toast.error(response.message || 'Failed to search');
            }
        } catch (error) {
            toast.error('An error occurred while searching');
        } finally {
            setLoading(false);
        }
    }

    return (
       <>
            <div className="flex-1 p-2">
                <form action="" method="post" className="w-full flex flex-col gap-2" onSubmit={handleOnSubmit}>
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="registryNumber">Registry Number</label>
                            <input type="text" className="common-input w-full" placeholder="Registry Number"
                             name="registryNumber"
                             value={formData.registryNumber}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date" className="common-input w-full" placeholder="Date of Birth"
                             name="dateOfBirth"
                             value={formData.dateOfBirth}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="placeOfBirth">Place of Birth</label>
                            <input type="text" className="common-input w-full" placeholder="Place of Birth"
                             name="placeOfBirth"
                             value={formData.placeOfBirth}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="firstName">Child's First Name</label>
                            <input type="text" className="common-input w-full" placeholder="First Name"
                             name="firstName"
                             value={formData.firstName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="middleName">Child's Middle Name</label>
                            <input type="text" className="common-input w-full" placeholder="Middle Name"
                             name="middleName"
                             value={formData.middleName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName">Child's Last Name</label>
                            <input type="text" className="common-input w-full" placeholder="Last Name"
                             name="lastName"
                             value={formData.lastName}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="firstName">Mothers's First Name</label>
                            <input type="text" className="common-input w-full" placeholder="First Name"
                             name="maidenFirstName"
                             value={formData.maidenFirstName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="middleName">Mother's Middle Name (Maiden)</label>
                            <input type="text" className="common-input w-full" placeholder="Middle Name"
                             name="maidenMiddleName"
                             value={formData.maidenMiddleName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName">Mother's Last Name</label>
                            <input type="text" className="common-input w-full" placeholder="Last Name"
                             name="maidenLastName"
                             value={formData.maidenLastName}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="firstName">Father's First Name</label>
                            <input type="text" className="common-input w-full" placeholder="First Name"
                             name="fathersFirstName"
                             value={formData.fathersFirstName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="middleName">Father's Middle Name</label>
                            <input type="text" className="common-input w-full" placeholder="Middle Name"
                             name="fathersMiddleName"
                             value={formData.fathersMiddleName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName">Father's Last Name</label>
                            <input type="text" className="common-input w-full" placeholder="Last Name"
                             name="fathersLastName"
                             value={formData.fathersLastName}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <button className={`btn-primary mt-4 px-4 py-2 rounded-full shadow-lg max-w-[100px]`}>Search</button>
                </form>
            </div>
            <div className="flex-1 p-2">
                { loading ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </Box>
                )}
            </div>
       </>
    )
}