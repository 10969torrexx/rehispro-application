import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { UserRoles } from '../enums/userRoles';
import { validateLoginId, validatePassword } from "../../services/Auth/Validations";
import { toast } from "react-toastify";
import { CreateUsers } from '@modals';

export default function UsersManagement() {

  //TODO: data tables data
    const columns = [
      { name: "Id", selector: row => row.id, sortable: true },
      { name: "Name", selector: row => row.name, sortable: true },
      { name: "Email", selector: row => row.email },
      { name: "Role", selector: row => row.role },
    ];

    const users = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" }
    ];

  //TODO: handle showing create user modal
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

return (
    <div className="space-y-4">

      {showCreateUserModal && (
        <CreateUsers
          onSave={(data) => {
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
