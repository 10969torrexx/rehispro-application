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

  //TODO: handling side bar open / close state
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
        <SideBar
          role={userData?.role}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <div
          className={`flex-1 flex flex-col transition-all duration-300`}
          style={{ marginLeft: sidebarOpen ? "8rem" : "2rem" }}
        >
          <HorizontalBar />
          <UsersManagement />
        </div>
      </div>

    </>
  );
}
