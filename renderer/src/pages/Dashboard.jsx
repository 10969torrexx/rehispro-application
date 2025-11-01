import {useEffect, useState} from 'react'
import { UserRoles, UserStatus } from '@enums';
import { ChangeCredentials, SideBar, RecentRecords} from '@components';
import { UsersManagement } from '@pages';
import { toast } from 'react-toastify';
import { AuthServices } from '@services';

export default function Dashboard() {
  const [userData, setUserData] = useState(null); 
  const [showChangePassword, setShowChangePassword] = useState(true);
  const [staffCount, setStaffCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [recentActiveTab, setRecentActiveTab] = useState('birth');

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
          setStaffCount(users.filter(user => user.role === UserRoles.STAFF).length);
          setSupervisorCount(users.filter(user => user.role === UserRoles.SUPERVISOR).length);
          setActiveCount(users.filter(user => user.status === 'active').length);
          setInactiveCount(users.filter(user => user.status === 'inactive').length);
          setDeletedCount(users.filter(user => user.status === 'deleted').length);
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        <div className="p-4 flex-1 flex flex-col transition-all duration-300 overflow-hidden">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-left">Dashboard</h2>
          </div>
          <div className='p-4 w-full flex-1 overflow-y-auto flex flex-col'>
            <div className="form-content mb-4 w-full flex flex-row gap-4">
              <div>
                <h3 className="font-semibold mb-4 text-xs text-left m-2">User Counts</h3>
                <div className="p-4 bg-white rounded-lg shadow-md w-[400px] text-left">
                <table className="min-w-full border border-gray-300 rounded-lg text-sm overflow-hidden">
                  <tbody className="text-gray-800">
                    <tr className="border-t hover:bg-gray-50">
                      <td className="px-4 py-1">
                      <i className="bi bi bi-person-fill text-green-500"></i>
                      </td>
                      <td className="px-4 py-1">Staff</td>
                      <td className="px-4 py-1 text-center">{ staffCount }</td>
                    </tr>
                    <tr className="border-t hover:bg-gray-50">
                      <td className="px-4 py-1">
                      <i className="bi bi-person-fill-gear text-orange-500"></i>
                      </td>
                      <td className="px-4 py-1">Supervisors</td>
                      <td className="px-4 py-1 text-center">{ supervisorCount }</td>
                    </tr>
                    <tr className="border-t hover:bg-gray-50">
                      <td className="px-4 py-1">
                      <i className="bi bi-check-circle-fill text-green-500"></i>
                      </td>
                      <td className="px-4 py-1">Active</td>
                      <td className="px-4 py-1 text-center">{ activeCount }</td>
                    </tr>
                    <tr className="border-t hover:bg-gray-50">
                      <td className="px-4 py-1">
                      <i className="bi bi-wrench-adjustable-circle-fill text-orange-500"></i>
                      </td>
                      <td className="px-4 py-1">Inactive</td>
                      <td className="px-4 py-1 text-center">{ inactiveCount }</td>
                    </tr>
                    <tr className="border-t hover:bg-gray-50">
                      <td className="px-4 py-1">
                      <i className="bi bi-trash-fill text-red-500"></i>
                      </td>
                      <td className="px-4 py-1">Deleted</td>
                      <td className="px-4 py-1 text-center">{ deletedCount }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-4 text-xs text-left m-2">Document Counts</h3>
                <div className="flex flex-1 rounded-lg gap-2">
                  <div className="flex-1 p-3 rounded-lg bg-white shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500">
                        <i className="bi bi-cake2 text-white text-lg"></i>
                      </div>
                      <span className="text-gray-800 font-medium">Birth Certificates | { 100 }</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md border border-gray-200 text-left">
                      Female: 10
                      <br />
                      Male: 90
                    </div>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-white shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500">
                        <i className="bi bi-arrow-through-heart text-white text-lg"></i>
                      </div>
                      <span className="text-gray-800 font-medium">Marriage Certificates | { 100 }</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md border border-gray-200 text-left">
                      Female: 10
                      <br />
                      Male: 90
                    </div>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-white shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500">
                        <i className="bi bi-heart-pulse text-white text-lg"></i>
                      </div>
                      <span className="text-gray-800 font-medium">Death Certificates | { 100 }</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-md border border-gray-200 text-left">
                      Female: 10
                      <br />
                      Male: 90
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full flex flex-row gap-2'>
              <div className="flex-1">
                <RecentRecords />
              </div>
              <div className="flex-1 p-2 test-element">
                
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
