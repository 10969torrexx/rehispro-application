import { useState, useEffect } from "react";
import { MarriageCertServices } from "@services";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
export default function MarriageCertificateLatest() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'ID', accessorKey: 'id', width: 50 },
        { field: 'Husband Name', accessorKey: 'husband_name', width: 150 },
        { field: "Wife Name", accessorKey: "wife_name", width: 150 },
        { field: "Marriage Date", accessorKey: "date", width: 200 },
        { field: "Place of Marriage", accessorKey: "place", width: 200 },
        { field: "Created At", accessorKey: "created_at", width: 150 },
    ];
    useEffect(() => {
    const fetchData = async () => {
            try {
                setLoading(true);
                const response = await MarriageCertServices.latest();
                setRows(response.data || []);
            } catch (error) {
                console.error("Error fetching marriage certificates:", error);
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
