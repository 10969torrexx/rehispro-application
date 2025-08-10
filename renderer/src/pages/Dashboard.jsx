import {useEffect, useState} from 'react'
import { ChangePassword, SideBar } from '@components';
export default function Dashboard() {
  const [userData, setUserData] = useState(null); 
  const [isFFirstTimeLogin, setIsFirstTimeUser] = useState(false);
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
    setIsFirstTimeUser(userData?.is_firsttime_flg);
    console.log("User data:", {
      isFFirstTimeLogin,
      userData: userData
    });
  }, []);
  return (
    <>
    {isFFirstTimeLogin && (
      <ChangePassword onSave={(data) => {
        console.log("Save credentials", data);
      }} />
    )}

      <div className="flex w-screen h-screen">
        <SideBar role={userData?.role} />
        <div className="flex-1 p-6 content">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </div>
    </>
  );
}
