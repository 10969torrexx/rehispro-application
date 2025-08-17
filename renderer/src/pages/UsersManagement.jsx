import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { UserRoles } from '../enums/userRoles';
import { validateLoginId, validatePassword } from "../../services/Auth/Validations";
import { toast } from "react-toastify";
import { CreateUsers, ConfirmAction } from '@modals';
import { getAllUsers } from '../../services/Auth/Services';
import { SideBar } from '@components';

export default function UsersManagement() {
  //TODO: handle showing prompts / modal
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showConfirmActionModal, setShowConfirmActionModal] = useState(false);

  //TODO: handle table actions events
    const handleEditUser = (userId) => {
      console.log("Edit user:", userId);
    };

    const handleDeleteUser = (userId) => {
      setShowConfirmActionModal(true);
    };

  //TODO: data tables data
    const columns = [
      { name: "Id", selector: row => row.id, sortable: true, width: "80px" },
      { name: "Login ID", selector: row => row.login_id, sortable: true, width: "200px" },
      { name: "Role", selector: row => row.role.charAt(0).toUpperCase() + row.role.slice(1), width: "150px" },
      { 
        name: "Created At", 
        selector: row => new Date(row.created_at).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }), 
        width: "200px" 
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex space-x-2">
            <button
              onClick={() => console.log("View", row.id)}
              className="px-1 py-1 text-sm rounded text-primary hover:bg-purple-200"
            >
              <i className="bi bi-eye-fill"></i>
            </button>
            <button
              onClick={() => console.log("Edit", row.id)}
              className="px-1 py-1 text-sm rounded text-yellow-500 hover:bg-yellow-200"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              onClick={() => handleDeleteUser(row.id)}
              className="px-1 py-1 text-sm text-red-500 rounded hover:bg-red-200"
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        ),
        ignoreRowClick: true, 
        allowoverflow: true,  
      }
    ];
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState(null); 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllUsers();
          console.log(response);
          if (response.success) {
            setUsers(response.data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      if(localStorage.getItem('user')) {
        setUserData(JSON.parse(localStorage.getItem('user')));
      }

      fetchData();
    }, []);

  //TODO: handling side bar open / close state
    const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex w-screen h-screen">
        {showCreateUserModal && (
          <CreateUsers
            onSave={(data) => {
              console.log('User created:', data);
              setUsers(prevUsers => [...prevUsers, data.data]);
              setShowCreateUserModal(false);
            }}
            onCancel={() => setShowCreateUserModal(false)}
          />
        )}

        {showConfirmActionModal && (
          <ConfirmAction
            title="Confirm Action"
            message="Are you sure you want to proceed with this action?"
            onConfirm={() => {
              console.log('Action confirmed');
              setShowConfirmActionModal(false);
            }}
            onCancel={() => setShowConfirmActionModal(false)}
          />
        )}

        <SideBar
          role={userData?.role}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <div className="p-4 flex-1 flex flex-col w-screen transition-all duration-300">
          <div className="flex justify-end mb-4">
            <button 
              className="btn-primary shadow-lg text-white px-4 py-2 rounded-full"
              onClick={() => setShowCreateUserModal(true)}
            >
              Add User
            </button>
          </div>
          <div className="w-full bg-white rounded-xl p-4 shadow-lg text-left">
            <DataTable
              title="List of Users"
              columns={columns}
              data={users}
              pagination
              highlightOnHover
              striped 
            />
          </div>
        </div>
    </div>
  );
}
