import { useState, useEffect } from "react";
import { DeathCertServices } from "@services";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
export default function DeathCertificateLatest() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'ID', accessorKey: 'id', width: 50 },
        { field: 'Deceased Name', accessorKey: 'deceased_name', width: 150 },
        { field: "Sex", accessorKey: "sex", width: 100 },
        { field: "Place of Death", accessorKey: "place_of_death", width: 200 },
        { field: "Created At", accessorKey: "created_at", width: 150 },
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
                    <div>Loading...</div>
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