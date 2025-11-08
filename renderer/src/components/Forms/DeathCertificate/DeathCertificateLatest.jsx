import { useState, useEffect } from "react";
import { DeathCertServices } from "@services";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Badge } from '@components';
export default function DeathCertificateLatest() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'index', headerName: '#', width: 50 },
        { field: 'registry_number', headerName: 'Registry #', width: 100 },
        { field: 'creation_type', headerName: 'Creation Type', flex: 1,
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
        { field: 'deceased_name', headerName: 'Deceased Name', flex: 1 },
        { field: "sex", headerName: "Sex", flex: 1},
        { field: "created_at", headerName: "Created At", flex: 1 },
    ];
    useEffect(() => {
    const fetchData = async () => {
            try {
                setLoading(true);
                const response = await DeathCertServices.latest();
                const indexedData = response.data.map((item, index) => ({
                    ...item,
                    index: index+1,
                }));
                setRows(indexedData);
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