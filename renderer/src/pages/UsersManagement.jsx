import { useEffect, useState } from "react";
import { UserStatus, UserRoles } from "@enums";
import { toast } from "react-toastify";
import { CreateUsers, ConfirmAction, EditUserDetails, ViewUserDetails } from '@modals';
import { AuthValidations, AuthServices } from '@services';
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
    { field: "index", headerName: "ID", width: 70 },
    { field: "full_name", headerName: "Full Name", width: 200 },
    { field: "login_id", headerName: "Username", width: 150 },
    { field: "role", headerName: "Role", width: 100,
      renderCell: (params) => (
        <span>{ capitalizeFirst(params.value) }</span>
      )
    },
    { field: "status", headerName: "Status", width: 100,
      renderCell: (params) => (
        <Badge status={params.value} 
          color={
            params.value === 'active' ? 'green' :
            params.value === 'inactive' ? 'yellow' :
            params.value === 'deleted' ? 'red' : 'gray'
          } 
        />
      )
    },
    { field: "created_at", headerName: "Created", width: 200 },
    { field: "actions", headerName: "Actions", width: 100, sortable: false, filterable: false, disableColumnMenu: true,
      renderCell: (params) => { 
        return (
          <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => { handleOnChange(e, params.row.id) }}
          >
            <option value="">Select</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        )
      }
    }
  ];

  const handleOnChange = (e, userId) => { 
    const action = e.target.value;
    if (action === "edit") {
      
    } else if (action === "delete") {
      //TODO: handle delete user
      AuthServices.deleteUser(userId).then((response) => {
        setIsLoading(true);
        if (response && response.success) {
          toast.success("User deleted successfully");
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } else {
          toast.error(response.message || "Failed to delete user");
        }
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await AuthServices.getAllUsers(userData.id);
        const dataWithIndex = response.data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        if (response && response.success && response.data) {
          setUsers(dataWithIndex);
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
      <CreateUsers //TODO: modal to create user
        onSave={(data) => {
          setUsers(prevUsers => [
            ...prevUsers,
            {
              ...data.data,
              index: data.data.id ?? prevUsers.length,
            },
          ]);
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
                        getRowId={(users) => users.id}
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
