import { useState, useEffect } from "react";
import { DeathCertServices } from "@services";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
export default function DeathCertificateLatest() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'deceased_name', headerName: 'Deceased Name', width: 150 },
        { field: "sex", headerName: "Sex", width: 100 },
        { field: "place_of_death", headerName: "Place of Death", width: 200 },
        { field: "created_at", headerName: "Created At", width: 150 },
    ];
    useEffect(() => {
    const fetchData = async () => {
            try {
                setLoading(true);
                const response = await DeathCertServices.latest();
                setRows(response.data || []);
            } catch (error) {
                console.error("Error fetching death certificates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {
                loading ? (
                    <div className="h-full flex justify-center items-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <Box sx={{ height: 300, width: '100%' }}>
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
    );
}