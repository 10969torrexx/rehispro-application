// renderer\src\components\Forms\MarriageCertificate\MarriageCertificateHome.jsx
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";

export default function MarriageCertificateHome() {
    const [rows, setRows] = React.useState([]);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "husband", headerName: "Husband Name", flex: 1 },
        { field: "wife", headerName: "Wife Name", flex: 1 },
        { field: "date", headerName: "Date of Marriage", width: 180 },
        { field: "place", headerName: "Place of Marriage", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleView(params.row)}
                >
                    View
                </Button>
            ),
        },
    ];

    const handleView = (row) => {
        alert(`Viewing marriage of ${row.husband} and ${row.wife}`);
    };

    React.useEffect(() => {
        axios
            .get("http://localhost:3001/marriage/list")
            .then((res) => {
                if (res.data.success) {
                    setRows(res.data.data);
                }
            })
            .catch((err) => {
                console.error("Error fetching marriages:", err);
            });
    }, []);

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
            />
        </div>
    );
}
