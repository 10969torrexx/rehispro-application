// renderer\src\components\Forms\MarriageCertificate\MarriageCertificateHome.jsx
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MarriageCertServices } from "@services";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { LoadingScreen } from '@components';

export default function MarriageCertificateHome({ onView }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false); 

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "husband", headerName: "Husband Name", flex: 1 },
    { field: "wife", headerName: "Wife Name", flex: 1 },
    { field: "date", headerName: "Date of Marriage", width: 180 },
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
