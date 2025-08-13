import { useEffect, useState } from "react";

export default function UsersManagement() {
  const [userLoginId, setUserLoginId] = useState();
  const [userPassword, setUserPassword] = useState("Admin123!");

  //TODO: handle clearning inputs 
  const handleClear = () => { 
    setUserLoginId("");
    setUserPassword("Admin123!");
  }

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


      <div className="w-full bg-white rounded-full p-4 shadow-lg">
        
      </div>

    </div>
  );
}
