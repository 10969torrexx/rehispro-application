import React, { useState, useEffect } from "react";
import { DeathCertServices } from "@services";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function DeathCertificateHome({ onView }) {
  const [listOfDeath, setListOfDeath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 State for search

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await DeathCertServices.listDeathCertificate();

        if (response && response.success && response.data) {
          setListOfDeath(response.data);
        } else {
          toast.error(response?.message || "Failed to load death certificates");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch death certificates";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Define table columns

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "deceased_name", headerName: "Deceased Name", flex: 1 },
    { field: "sex", headerName: "Sex", width: 100 },
    { field: "created_at", headerName: "Date Created", width: 150 },
    { field: "place_of_death", headerName: "Place of Death", flex: 1 },

    // inside DeathCertificateHome component, in your columns array
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
  

  // 🔹 Filtered rows (client-side search)
  const filteredRows = listOfDeath.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row.deceased_name?.toLowerCase().includes(query) ||
      row.sex?.toLowerCase().includes(query) ||
      row.date_of_death?.toLowerCase().includes(query) ||
      row.place_of_death?.toLowerCase().includes(query) ||
      row.city?.toLowerCase().includes(query) ||
      row.province?.toLowerCase().includes(query) ||
      row.cause_of_death?.toLowerCase().includes(query)
    );
  });

  return (
    <Box sx={{ height: 600, width: "100%", display: "flex", flexDirection: "column" }}>
      {/* 🔹 Header / Toolbar */}
      <div className="flex justify-between items-center mb-4">  
        {/* 🔹 Search input styled like your other inputs */}
        <input
          type="text"
          placeholder="Search by name, sex, date, place, city, province, or cause of death..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="common-input w-full"
        />
      </div>
  
      {/* 🔹 Table */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        disableRowSelectionOnClick
        getRowId={(row) => row.id || row.death_id}
        sx={{ flexGrow: 1 }}
      />
    </Box>
  );
  }
