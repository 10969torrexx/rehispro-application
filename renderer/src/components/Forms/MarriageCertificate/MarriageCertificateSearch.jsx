import { useState } from "react";
import { MarriageCertServices } from "@services";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function MarriageCertificateSearch ({setActiveTab, setSelectedRow}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        husbandFirstName: '',
        husbandMiddleName: '',
        husbandLastName: '',
        wifeFirstName: '',
        wifeMiddleName: '',
        wifeLastName: '',
        dateOfMarriage: '',
        placeOfMarriage: '',
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
        { field: "id", headerName: "ID", width: 70 },
        { field: "registry_number", headerName: "Registry Number", width: 150 },
        { field: "husband_first_name", headerName: "Husband's First Name", width: 130 },
        { field: "husband_middle_name", headerName: "Husband's Middle Name", width: 130 },
        { field: "husband_last_name", headerName: "Husband's Last Name", width: 130 },
        { field: "wife_first_name", headerName: "Wife's First Name", width: 130 },
        { field: "wife_middle_name", headerName: "Wife's Middle Name", width: 130 },
        { field: "wife_last_name", headerName: "Wife's Last Name", width: 130 },
        { field: "date_of_marriage", headerName: "Date of Marriage", width: 130 },
        { field: "place_of_marriage", headerName: "Place of Marriage", width: 150 },
        { field: "action", headerName: "Action", width: 100,
            renderCell: (params) => (
                <div className="w-full items-center justify-center flex">
                    <button onClick={() => {
                        setActiveTab('view'); 
                        setSelectedRow(params.row);
                    }}
                    >View
                    </button>
                </div>
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
            const response = await MarriageCertServices.search(formData);
            console.table(response);
            if (response.success) {
                toast.success('Search completed successfully');
                setRows(response.data);
                setFormData({
                    husbandFirstName: '',
                    husbandMiddleName: '',
                    husbandLastName: '',
                    wifeFirstName: '',
                    wifeMiddleName: '',
                    wifeLastName: '',
                    dateOfMarriage: '',
                    placeOfMarriage: '',
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
        <div className="flex flex-col w-full gap-2 p-2">
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
                            <label htmlFor="dateMarriage">Date of Marriage</label>
                            <input type="date" className="common-input w-full" placeholder="Date of Marriage"
                             name="dateDeath"
                             value={formData.dateMarriage}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="deathPlace">Place of Death</label>
                            <input type="text" className="common-input w-full" placeholder="Place of Death"
                             name="deathPlace"
                             value={formData.placeOfDeath}
                             onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="firstName">Deceased First Name</label>
                            <input type="text" className="common-input w-full" placeholder="First Name"
                             name="firstName"
                             value={formData.firstName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="middleName">Deceased Middle Name</label>
                            <input type="text" className="common-input w-full" placeholder="Middle Name"
                             name="middleName"
                             value={formData.middleName}
                             onChange={handleOnChange}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName">Deceased Last Name</label>
                            <input type="text" className="common-input w-full" placeholder="Last Name"
                             name="lastName"
                             value={formData.lastName}
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
        </div>
    )
}