import { useState, useEffect } from "react";
import { BirthCertServices } from "@services";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Badge } from '@components';
import Box from "@mui/material/Box";
import { LoadingScreen } from '@components';

export default function BirthCertificateHome({ onView }) {
  const [listOfBirth, setListOfBirth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

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

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "registry_number", headerName: "Registery #", width: 100 },
    { field: "creation_type", headerName: "Creation Type", width: 100,
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
    {
      field: "child_name",
      headerName: "Child Name",
      width: 300,
    },
    { field: "sex", headerName: "Sex", width: 100 },
    { field: "created_at", headerName: "Created At", width: 150 },
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
                      if (row.creation_type == 'upload') {
                        toast.error("Download not available for uploaded birth certificates.");
                        return false;
                      }
                      setIsDownloading(true);
                      await BirthCertServices.download(params?.row.id);
                      toast.success("PDF download complete!");
                    } catch (error) {
                      toast.error(`Download failed: ${error.message || error}`);
                    } finally {
                      setIsDownloading(false);
                    }
                  } else if (action === "delete") {
                    try {
                      const response = await BirthCertServices.deleteData(params?.row.id);
                      if (response?.success) {
                        toast.success("Birth certificate deleted successfully!");
                        setListOfBirth((prev) =>
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
      },
  ];

  const filteredRows = listOfBirth.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row.registry_number?.toLowerCase().includes(query) ||
      row.creation_type?.toLowerCase().includes(query) ||
      row.child_name?.toLowerCase().includes(query) ||
      row.sex?.toLowerCase().includes(query) ||
      row.date_of_birth?.toLowerCase().includes(query) ||
      row.city?.toLowerCase().includes(query) ||
      row.province?.toLowerCase().includes(query) ||
      row.mother_name?.toLowerCase().includes(query) ||
      row.father_name?.toLowerCase().includes(query)
    );
  });

  return (<>
    {
      isDownloading ? (
        <LoadingScreen 
          title={"Extracting data to PDF"} 
          message={"This might take sometime."} 
        />

      ) : (
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
              placeholder="Search by name, sex, date, mother name, father name, or residence..."
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
      )
    }
  </>);
}
