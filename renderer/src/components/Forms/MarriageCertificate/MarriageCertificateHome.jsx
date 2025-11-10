import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MarriageCertServices } from "@services";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { LoadingScreen, Badge } from '@components';

export default function MarriageCertificateHome({ onView }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false); 

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "registry", headerName: "Registry Number", flex: 1 },
    { field: "province", headerName: "Province", flex: 1 },
    { field: "creation_type", headerName: "Creation Type", flex: 1,
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
    { field: "husband", headerName: "Husband", flex: 1 },
    { field: "wife", headerName: "Wife", flex: 1 },
    { field: "place", headerName: "Place of Marriage", flex: 1 },
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
            onChange={async (e) => {
              const action = e.target.value;
              e.target.value = "";
    
              if (action === "view") {
                onView?.(row);
              } else if (action === "download") {
                if (row.creation_type == 'upload') {
                  toast.error("Download not available for uploaded marriage certificates.");
                  return false;
                }
                try {
                  setIsDownloading(true);
                  await MarriageCertServices.download(params?.row.id);
                  toast.success("PDF download complete!");
                } catch (error) {
                  console.error(error);
                  toast.error(`Download failed: ${error.message || error}`);
                } finally {
                  setIsDownloading(false);
                }
              } else if (action === "delete") {
                try {
                  const response = await MarriageCertServices.deleteData(params?.row.id);
                  if (response?.success) {
                    toast.success(response?.message || "Marriage certificate deleted successfully!");
                    setRows((prev) =>
                      prev.filter((item) => item.id !== params?.row.id)
                    );
                  } else {
                    toast.error(response?.message || "Delete failed");
                  }
                } catch (error) {
                  toast.error(`Delete failed: ${error.message || error}`);
                } finally {
                  setIsDownloading(false);
                }
              }
            }}
          >
            <option value="" disabled>
              Actions
            </option>
            <option value="view">View</option>
            <option value="download">Download</option>
            <option value="delete">Delete</option>
          </select>
        );
      },
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await MarriageCertServices.listMarriageCertificate();
        if (response && response.success && response.data) {
          const indexData = response.data.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          setRows(indexData);
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

  const filteredRows = rows.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row.registry?.toLowerCase().includes(query) ||
      row.creation_type?.toLowerCase().includes(query) ||
      row.husband?.toLowerCase().includes(query) ||
      row.wife?.toLowerCase().includes(query) ||
      row.date?.toLowerCase().includes(query) ||
      row.place?.toLowerCase().includes(query)
    );
  });

  return (
    <>{
      isDownloading ? (
        <LoadingScreen 
          title={"Extracting data to PDF"} 
          message={"This might take sometime."} 
        />   
      ) : (
        <Box sx={{ height: 600, width: "100%", display: "flex", flexDirection: "column" }}>
          <div className="flex justify-between items-center mb-4">  
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
            loading={loading}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
          />
        </Box>
      )
    }</>
  );
}
