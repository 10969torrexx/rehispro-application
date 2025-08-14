import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { UserRoles } from '../enums/userRoles';
import { validateLoginId, validatePassword } from "../../services/Auth/Validations";
import { toast } from "react-toastify";

export default function UsersManagement() {

  //TODO: handle user data on table
  const columns = [
    { name: "Id", selector: row => row.id, sortable: true },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email },
    { name: "Role", selector: row => row.role },
    {
      name: 'Actions',
        cell: row => (
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => handleView(row)}
            >
              View
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(row)}
            >
              Delete
            </button>
          </div>
        ),
      ignoreRowClick: true,   // prevents triggering row click
      allowOverflow: true,    // ensures buttons don't get clipped
      button: true,           // marks it as a button column
    },
  ];

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" }
  ];

return (
    <div className="space-y-4">
      <div className="flex justify-end ">
        <button className="bg-purple-500 hover:bg-purple-600 shadow-lg text-white px-4 py-2 rounded-full">
          Create User
        </button>
      </div>
      <div className="w-full h-[100%] bg-white rounded-xl p-4 shadow-lg">
        <DataTable
          title="List of Users"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped 
        />
      </div>
    </div>
  );
}
