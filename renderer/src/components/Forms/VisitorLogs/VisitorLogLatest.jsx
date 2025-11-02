import { useState, useEffect } from "react";
import { VisitorLogServices } from "@services";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
export default function VisitorLogLatest() { 
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: "officer", headerName: "Officer", width: 100 },
        { field: "purpose", headerName: "Purpose", width: 200 },
        { field: "created_at", headerName: "Created At", width: 150 },
    ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await VisitorLogServices.latest();
                const dataWithIndex = response.data.map((item, index) => ({
                    ...item,
                    id: index + 1,
                }));
                setRows(dataWithIndex || []);
            } catch (error) {
                console.error("Error fetching visitor logs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <h3 className="mb-2 text-xs font-semibold text-left">Latest Visitor Logs</h3>
            <div className="bg-white p-2 rounded-lg shadow-lg">
                {
                    loading ? (
                        <div className="h-full flex justify-center items-center">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <Box sx={{ height: 280, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                getRowId={(row) => row.id}
                            />
                        </Box>
                    )
                }
            </div>
        </>
       
    );
}