import { useState, useEffect } from "react";
import { SideBar } from '@components';
import { AddVisitorLog } from '@modals';
import { VisitorLogServices } from '@services';
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

export default function VisitorLogs() { 
    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [addVisitorLogOpen, setAddVisitorLogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "officer", headerName: "Officer", width: 150 },
        { field: "contact_number", headerName: "Contact Number", width: 150 },
        { field: "address", headerName: "Address", width: 200 },
        { field: "purpose", headerName: "Purpose", width: 150 },
        { field: "status", headerName: "Status", width: 200 },
        { field: "remarks", headerName: "Remarks", width: 200 },
        { field: "created_at", headerName: "Created At", width: 150 },
    ];
    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
        
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await VisitorLogServices.list();

                if (response && response.success && response.data) {
                    console.table(response.data);
                    setRows(response.data);
                } else {
                    toast.error(response?.message || "Failed to load visitor logs");
                }
            } catch (error) {
                const errorMessage =
                    error.response?.data?.message ||
                    error.message || "Failed to fetch visitor logs";
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="flex w-screen h-screen">
            <SideBar
                role={userData?.role}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <AddVisitorLog isOpen={addVisitorLogOpen} onClose={() => setAddVisitorLogOpen(false)} />

            <div className="p-4 flex-1 flex flex-col w-screen h-screen transition-all duration-300">
                <h2 className="text-lg font-semibold text-left">Visitor Logs</h2>
                <div className="flex justify-end mb-4 gap-2">
                    <button className={`btn-primary shadow-lg px-3 py-1 rounded-full`}
                        onClick={() => setAddVisitorLogOpen(true)}
                    >
                        <i className="bi bi-person-fill-add mr-2"></i>
                        Add Visitor Log
                    </button>
                </div>
                <div className="p-4 bg-white w-full h-screen overflow-y-auto flex justify-center shadow-lg rounded-lg">
                    <div className="form-content mb-4">
                        {isLoading ? (
                             <div className="flex h-full items-center justify-center">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <Box sx={{ height: 600, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick
                                />
                            </Box>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}