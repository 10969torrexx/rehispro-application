import {useEffect, useState} from 'react'
import { UserRoles } from '@enums';
import { ChangeCredentials, SideBar, RecentRecords, BirthCertificateCharts, DeathCertificateCharts, DashboardUserCounts, VisitorLogLatest } from '@components';
import { AddRecords } from '@modals';
import { toast } from 'react-toastify';
import { AuthServices } from '@services';
import { Link } from "react-router-dom";
import { HorizontalBar } from '@components';

export default function Dashboard() {
  const [userData, setUserData] = useState(null); 
  const [showChangePassword, setShowChangePassword] = useState(true);
  const [staffCount, setStaffCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [recordType, setViewRecordType] = useState('birth');

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
  const [openAddRecords, setOpenAddRecords] = useState(false);
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
        <AddRecords
          isOpen={openAddRecords}
          onClose={() => setOpenAddRecords(false)}
          type={recordType}
        />
        <div className="p-4 flex-1 flex flex-col transition-all duration-300 overflow-hidden">
          <HorizontalBar title={"Dashboard"} />
          <div className='p-4 w-full flex-1 overflow-y-auto flex flex-col'>
            <div className="form-content mb-4 w-full flex flex-row gap-4">
              {
                userData?.role === UserRoles.SUPERVISOR && ( 
                  <div>
                    <DashboardUserCounts
                      staffCount={staffCount}
                      supervisorCount={supervisorCount}
                      activeCount={activeCount}
                      inactiveCount={inactiveCount}
                      deletedCount={deletedCount}
                    />
                  </div>
                )
              }
              <div className="flex-1">
                <h3 className="font-semibold mb-4 text-xs text-left m-2">Document Counts</h3>
                <div className="flex flex-1 rounded-lg gap-2">
                  <div className="flex-1 p-3 rounded-lg bg-white shadow-md">
                    <BirthCertificateCharts />
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-white shadow-md">
                    <DeathCertificateCharts />
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full flex flex-row gap-2'>
              <div className="flex-1 max-w-[60%]">
                <RecentRecords />
              </div>
              <div className="flex-1 max-w-[40%] flex flex-col">
                <div className="flex-1 flex flex-col flex max-h-[15%] mb-4">
                  <h3 className="font-semibold mb-2 text-xs text-left">Quick Actions</h3>
                  <div className='flex flex-row w-full gap-2'>
                    <button className="btn-primary p-2 px-1 shadow-lg flex-1 text-xs rounded-lg"
                      onClick={() => {
                        setOpenAddRecords(true);
                        setViewRecordType('create');
                      }}
                    >
                      Add Records
                    </button>
                    <button className="btn-primary p-2 px-1 shadow-lg flex-1 text-xs rounded-lg"
                      onClick={() => {
                        setOpenAddRecords(true);
                        setViewRecordType('search');
                      }}
                    >
                      Search Records
                    </button>
                    <button className="btn-primary p-2 px-1 shadow-lg flex-1 text-xs rounded-lg">
                      <Link to="/visitor-logs">Add Logs</Link>
                    </button>
                  </div>
                </div>
                <div className="flex-1 max-h-[70%] ">
                  <VisitorLogLatest />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
