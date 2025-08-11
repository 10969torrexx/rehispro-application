import { useState, useEffect } from "react";

export default function HorizontalBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  return (
    <div className="flex justify-end items-right px-6 py-3 ">

      {user && (
        <div className="flex items-center space-x-3 bg-white p-2 px-4 shadow-md rounded-full">
          <i className="bi bi-person-circle text-2xl bg-orange-500 text-white rounded-full h-[30px] w-[30px] flex items-center justify-center"></i>
          <span className="text-gray-700 font-medium">{user.login_id}</span>
        </div>
      )}
    </div>
  );
}
