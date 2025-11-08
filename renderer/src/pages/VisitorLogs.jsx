import { useState, useEffect } from "react";
import { SideBar, Badge } from '@components';
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
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const [filteredRows, setFilteredRows] = useState([]);

    const columns = [
        { field: "index", headerName: "#", width: 50 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "officer", headerName: "Officer", width: 150 },
        { field: "contact_number", headerName: "Contact Number", width: 150 },
        { field: "address", headerName: "Address", width: 200 },
        { field: "purpose", headerName: "Purpose", width: 150 },
        { field: "status", headerName: "Status", width: 200,
            renderCell: (params) => (
                <Badge status={params.value} color={
                    params.value === 'pending' ? 'blue' :
                    params.value === 'ongoing' ? 'yellow' :
                    params.value === 'completed' ? 'green' :
                    params.value === 'cancelled' ? 'red' : 'gray'
                } />
            )
        },
        { field: "remarks", headerName: "Remarks", width: 200 },
        { field: "created_at", headerName: "Time", width: 150,
            renderCell: (params) => { 
                return (
                    <span>{ params.value.split(' ')[1] }</span>
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 180,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => {
                            const newStatus = e.target.value;
                            VisitorLogServices.updateStatus(params.row.id, { status: newStatus })
                                .then(() => {
                                    toast.success("Status updated successfully");
                                    fetchData();
                                })
                                .catch((error) => {
                                    const errorMessage =
                                        error.response?.data?.message ||
                                        error.message || "Failed to update status";
                                    toast.error(errorMessage);
                                });
                        }}
                    >
                        <option value="pending" selected={params.row.status === 'pending'}>Pending</option>
                        <option value="ongoing" selected={params.row.status === 'ongoing'}>Ongoing</option>
                        <option value="completed" selected={params.row.status === 'completed'}>Completed</option>
                        <option value="cancelled" selected={params.row.status === 'cancelled'}>Cancelled</option>
                    </select>
                );
            },
        }
    ];
    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
        fetchData();
    }, []);
    const handleRefresh = () => {
        fetchData();
    };
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await VisitorLogServices.list();
            if (response && response.success && response.data) {
                const dataWithIndex = response.data.map((item, index) => ({
                    ...item,
                    index: index + 1,
                }));
                setRows(dataWithIndex);
                const todayString = new Date().toISOString().split("T")[0];
                const todayData = dataWithIndex.filter((row) => 
                    row.created_at?.split(" ")[0] === todayString
                );
                setFilteredRows(todayData);
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
    useEffect(() => {
        const newFiltered = rows.filter((row) => {
            const logDateString = row.created_at?.split(" ")[0];
            return logDateString === date;
        });
        setFilteredRows(newFiltered);
    }, [date, rows]);
    const normalizeDate = (d) => {
        const nd = new Date(d);
        nd.setHours(0, 0, 0, 0);
        return nd;
    };
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        if (!selectedDate) {
            setFilteredRows(rows);
            return;
        }
        const filtered = rows.filter((row) => {
            const logDate = new Date(row.created_at.replace(" ", "T"));
            const selected = normalizeDate(selectedDate);
            return logDate.getTime() === selected.getTime();
        });
        setFilteredRows(filtered);
    };
    return (
        <>
            <div className="flex w-screen h-screen">
                <SideBar
                    role={userData?.role}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <AddVisitorLog isOpen={addVisitorLogOpen} onClose={() => setAddVisitorLogOpen(false)} onSuccess={handleRefresh} />
                <div className="p-4 flex-1 flex flex-col transition-all duration-300 overflow-hidden">
                    <h2 className="text-lg font-semibold text-left">Visitor Logs</h2>
                    <div className="flex justify-end mb-4 gap-2">
                        <button className={`btn-primary shadow-lg px-3 py-1 rounded-full`}
                            onClick={() => setAddVisitorLogOpen(true)}
                        >
                        <i className="bi bi-person-fill-add mr-2"></i>
                        Add Visitor Log
                    </button>
                    </div>
                    <div id="managementContent" className="p-4 bg-white w-full flex-1 overflow-y-auto flex justify-center shadow-lg rounded-lg">
                        <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
                            <div className="form-content mb-4 h-full">
                                {
                                    isLoading ? ( 
                                        <div className="flex h-full items-center justify-center">
                                            <div className="spinner"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-2 flex justify-start">
                                                <div className="p-2 px-5 border items-center rounded-full">{`Visitors: ${filteredRows.length}`}</div>
                                                <input
                                                    className="common-input"
                                                    type="date"
                                                    value={date}
                                                    max={today}
                                                    onChange={(e) => handleDateChange(e)}
                                                />
                                            </div>
                                            <Box
                                                sx={{
                                                    height: 600,
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <DataGrid
                                                    rows={filteredRows}
                                                    columns={columns}
                                                    pageSize={10}
                                                    rowsPerPageOptions={[10]}
                                                    disableSelectionOnClick
                                                />
                                            </Box>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
