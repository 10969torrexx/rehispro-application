import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function UsersManagement() {
  const [userLoginId, setUserLoginId] = useState();
  const [userPassword, setUserPassword] = useState("Admin123!");

  //TODO: handle clearning inputs 
  const handleClear = () => { 
    setUserLoginId("");
    setUserPassword("Admin123!");
  }

  //TODO: handle user data on table
  const columns = [
    { name: "Id", selector: row => row.id, sortable: true },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email },
    { name: "Role", selector: row => row.role }
  ];

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" }
  ];


  return (
    <div className="space-y-4">
      <div className="w-full flex flex-row justify-end p-2 space-x-4">
        <input
          type="text"
          onChange={(e) => setUserLoginId(e.target.value) }
          value={userLoginId}
          placeholder="Login ID"
          className="border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-lg"
        />

        <input
          type="text"
          onChange={(e) => setUserPassword(e.target.value) }
          placeholder="Default Password"
          value={userPassword}
          className="border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-lg"
        />

        <input type="button" value="Create User" className="rounded-full bg-purple-500 text-white px-4 py-2 shadow-xl hover:bg-purple-600 transition duration-300 h-10" />
        <button class="mt-1 rounded-full bg-danger text-white px-4 py-2 shadow-xl hover:bg-red-600 transition duration-300 h-10 flex items-center space-x-2"
          onClick={handleClear}
        >
          <i class="bi bi-eraser-fill"></i>
        </button>

      </div>


      <div className="w-full bg-white rounded-xl p-4 shadow-lg">
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
