import {useEffect, useState} from 'react'
import { UserRoles } from '../enums/userRoles';
import { ChangePassword, SideBar } from '@components';
export default function Dashboard() {
  const [userData, setUserData] = useState(null); 
  const [showChangePassword, setShowChangePassword] = useState(true);
  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  return (
    <>
      {(userData?.is_firsttime_flg && userData?.role == UserRoles.SUPERVISOR) && showChangePassword && (
        <ChangePassword 
          onSave={(data) => {
            console.log("Save credentials", data);
            setShowChangePassword(false);
          }} 
          onCancel={() => setShowChangePassword(false)}
        />
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
