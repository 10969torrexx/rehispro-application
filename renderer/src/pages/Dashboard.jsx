import {useEffect, useState} from 'react'
import { UserRoles } from '../enums/userRoles';
import { ChangeCredentials, SideBar, HorizontalBar } from '@components';
import { UsersManagement } from '@pages';

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
        <ChangeCredentials 
          onSave={(data) => {
            console.log("Save credentials", data);
            setShowChangePassword(false);
          }} 
          onCancel={() => setShowChangePassword(false)}
        />
      )}

      <div className="flex w-screen h-screen">
        <div className="h-full">
          <SideBar role={userData?.role} />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="p-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
        </div>
      </div>

    </>
  );
}
