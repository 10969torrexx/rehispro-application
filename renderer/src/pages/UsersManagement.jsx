import { useEffect, useState } from "react";
import { UserStatus, UserRoles } from "@enums";
import { toast } from "react-toastify";
import { CreateUsers, ConfirmAction, EditUserDetails, ViewUserDetails } from '@modals';
import { getAllUsers, deleteUser } from '../../services/Auth/Services';
import { SideBar, Badge } from '@components';
import { capitalizeFirst } from "@myTools";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function UsersManagement() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "full_name", headerName: "Full Name", width: 200 },
    { field: "login_id", headerName: "Username", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "created_at", headerName: "Created", width: 150 }
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllUsers(userData.id);
        if (response && response.success && response.data) {
          setUsers(response.data);
        } else {
          toast.error(response.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if(localStorage.getItem('user')) {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
    fetchData();
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <SideBar
        role={userData?.role}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <CreateUsers
        onSave={(data) => {
          setUsers(prevUsers => [...prevUsers, data.data]);
          setShowCreateUserModal(false);
        }}
        onCancel={() => setShowCreateUserModal(false)}
        isOpen={showCreateUserModal}
      />
      <div className="p-4 flex-1 flex flex-col transition-all duration-300 overflow-hidden">
        <h2 className="text-lg font-semibold text-left">User Management</h2>
        <div className="flex justify-end mb-4 gap-2">
          <button className={`btn-primary shadow-lg px-3 py-1 rounded-full`}
            onClick={() => setShowCreateUserModal(true)}
          >
            <i className="bi bi-person-fill-add mr-2"></i>
            Add User
          </button>
        </div>
        <div className="p-4 bg-white w-full flex-1 overflow-y-auto flex justify-center shadow-lg rounded-lg">
          <div className="py-8 h-full text-left w-full sm:w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%]">
            <div className="form-content mb-4 h-full">
              {
                isLoading ? ( 
                  <div className="flex h-full items-center justify-center">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  <>
                    <Box
                      sx={{
                        height: 600,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <DataGrid
                        rows={users}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                      />
                    </Box>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
