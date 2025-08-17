import {useEffect, useState} from 'react'
import { UserRoles } from '../enums/userRoles';
import { ChangeCredentials, SideBar, HorizontalBar } from '@components';
import { UsersManagement } from '@pages';
import { toast } from 'react-toastify';

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
            toast.success(data.message);
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
          className={`flex-1 flex flex-col w-screen transition-all duration-300`}
        >
          <div className='content'>
            <h1 className='text-2xl font-semibold mb-4'>Dashboard</h1>
          </div>
        </div>
      </div>

    </>
  );
}
