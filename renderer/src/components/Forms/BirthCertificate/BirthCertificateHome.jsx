import React, { useState, useEffect } from "react";
import { BirthCertServices } from "@services";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function BirthCertificateHome({ onView }) {
  const [listOfBirth, setListOfBirth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await BirthCertServices.listBirthCertificate();

        if (response && response.success && response.data) {
          setListOfBirth(response.data);
        } else {
          toast.error(response?.message || "Failed to load birth certificates");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch birth certificates";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Define DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "child_name",
      headerName: "Child Name",
      flex: 1,
      valueGetter: (params) => {
        const row = params?.row || {};
        return `${row.child_first_name || ""} ${
          row.child_middle_name ? row.child_middle_name.charAt(0) + "." : ""
        } ${row.child_last_name || ""}`;
      },
    },
    { field: "sex", headerName: "Sex", width: 100 },
    { field: "date_of_birth", headerName: "Date of Birth", width: 150 },
    {
      field: "place",
      headerName: "Place of Birth",
      flex: 1,
      valueGetter: (params) => {
        const row = params?.row || {};
        return `${row.city || ""}, ${row.province || ""}`;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 110,
      sortable: false,
      renderCell: (params) => {
        const row = params?.row || {};
        return (
          <select
            defaultValue=""
            className="common-input text-xs px-1 py-0.5 w-full"
            onChange={(e) => {
              const action = e.target.value;
              e.target.value = "";

              if (action === "view") {
                onView?.(row.id || row.birth_id);
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
    },
  ];

  // 🔹 Filter rows (client-side search)
  const filteredRows = listOfBirth.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      `${row.child_first_name || ""} ${row.child_middle_name || ""} ${
        row.child_last_name || ""
      }`
        .toLowerCase()
        .includes(query) ||
      row.sex?.toLowerCase().includes(query) ||
      row.date_of_birth?.toLowerCase().includes(query) ||
      row.city?.toLowerCase().includes(query) ||
      row.province?.toLowerCase().includes(query)
    );
  });

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, sex, date, or place..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="common-input w-full"
        />
      </div>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableRowSelectionOnClick
        getRowId={(row) => row.id || row.birth_id}
        sx={{ flexGrow: 1 }}
      />
    </Box>
  );
}
