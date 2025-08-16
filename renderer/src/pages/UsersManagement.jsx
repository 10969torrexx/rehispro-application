import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { UserRoles } from '../enums/userRoles';
import { validateLoginId, validatePassword } from "../../services/Auth/Validations";
import { toast } from "react-toastify";
import { CreateUsers } from '@modals';
import { getAllUsers } from '../../services/Auth/Services';

export default function UsersManagement() {

  //TODO: data tables data
    const columns = [
      { name: "Id", selector: row => row.id, sortable: true, width: "80px" },
      { name: "Login ID", selector: row => row.login_id, sortable: true, width: "200px" },
      { name: "Role", selector: row => row.role.charAt(0).toUpperCase() + row.role.slice(1), width: "150px" },
      { name: "Created At", selector: row => new Date(row.created_at).toLocaleString(
        "en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }), width: "300px" }
    ];
    const [users, setUsers] = useState([]);
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

      fetchData();
    }, []);

  //TODO: handle showing create user modal
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

return (
    <div className="space-y-4">

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

      <div className="flex justify-end ">
        <button 
          className="btn-primary shadow-lg text-white px-4 py-2 rounded-full"
          onClick={() => setShowCreateUserModal(true)}
        >
          Add User
        </button>
      </div>
      <div className="w-full h-[100%] bg-white rounded-xl p-4 shadow-lg">
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
  );
}
