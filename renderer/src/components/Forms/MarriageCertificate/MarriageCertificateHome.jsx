// renderer\src\components\Forms\MarriageCertificate\MarriageCertificateHome.jsx
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MarriageCertServices } from "@services";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";

export default function MarriageCertificateHome({ onView }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ added
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 State for search

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "husband", headerName: "Husband Name", flex: 1 },
    { field: "wife", headerName: "Wife Name", flex: 1 },
    { field: "date", headerName: "Date of Marriage", width: 180 },
    { field: "place", headerName: "Place of Marriage", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 110, // 🔹 narrower column
      sortable: false,
      renderCell: (params) => {
        const row = params?.row || {};
        return (
          <select
            defaultValue=""
            className="common-input text-xs px-1 py-0.5 w-full" // 🔹 smaller text + reduced padding
            onChange={(e) => {
              const action = e.target.value;
              e.target.value = "";
    
              if (action === "view") {
                onView?.(row);
              } else if (action === "download") {
                toast.info("Download clicked");
              }
            }}
          >
            <option value="" disabled>
              Actions
            </option>
            <option value="view">View</option>
            <option value="download">Download</option>
          </select>
        );
      },
    }
  ];

  // ✅ Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await MarriageCertServices.listMarriageCertificate();

        if (response && response.success && response.data) {
          setRows(response.data);
        } else {
          toast.error(response?.message || "Failed to load marriage certificates");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch marriage certificates";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

      // 🔹 Filtered rows (client-side search)
      const filteredRows = rows.filter((row) => {
        const query = searchQuery.toLowerCase();
        return (
          row.husband?.toLowerCase().includes(query) ||
          row.wife?.toLowerCase().includes(query) ||
          row.date?.toLowerCase().includes(query) ||
          row.place?.toLowerCase().includes(query)
        );
      });

  return (
        <Box sx={{ height: 600, width: "100%", display: "flex", flexDirection: "column" }}>
          {/* 🔹 Header / Toolbar */}
          <div className="flex justify-between items-center mb-4">  
            {/* 🔹 Search input styled like your other inputs */}
            <input
              type="text"
              placeholder="Search by husband name, wife name, date, or place..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="common-input w-full"
            />
          </div>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        loading={loading} // ✅ show loader when fetching
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Box>
  );
}
