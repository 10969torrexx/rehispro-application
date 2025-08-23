import {useEffect, useState} from 'react'
import { UserRoles } from '../enums/userRoles';
import { ChangeCredentials, SideBar, HorizontalBar, UserCounts } from '@components';
import { UsersManagement } from '@pages';
import { toast } from 'react-toastify';
import { AuthServices } from '@services';

export default function Dashboard() {
  const [userData, setUserData] = useState(null); 
  const [showChangePassword, setShowChangePassword] = useState(true);
  const [staffCount, setStaffCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    //TODO: creating a list of user counts by role
    const getAllUsers = async () => {
      try {
        const response = await AuthServices.getAllUsers(JSON.parse(storedUserData).id);
        if (response.success) {
          const users = response.data;
          console.log('Fetched users:', users);
          setStaffCount(users.filter(user => user.role === UserRoles.STAFF).length);
          setSupervisorCount(users.filter(user => user.role === UserRoles.SUPERVISOR).length);
        } else {
          toast.error(response.message || "Failed to fetch user counts");
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getAllUsers();
  }, []);

  //TODO: handling side bar open / close state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      {(userData?.is_firsttime_flg ) && showChangePassword && (
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
            <div className="flex flex-row flex-wrap gap-4">
              <UserCounts role={UserRoles.SUPERVISOR} userCounts={supervisorCount} status="active"/>
              <UserCounts role={UserRoles.STAFF} userCounts={staffCount} status="inactive"/>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
