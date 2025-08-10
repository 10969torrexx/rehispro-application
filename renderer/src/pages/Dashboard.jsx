import {useEffect, useState} from 'react'
import SideBar from '../components/SideBar'
export default function Dashboard() {
  const [userData, setUserData] = useState(null); 
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <>
        <div className="flex w-screen h-screen">
          <SideBar role={userData?.role} />
          <div className="flex-1 p-6 content">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
        </div>
    </>
  );
}
