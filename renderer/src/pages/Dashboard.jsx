import SideBar from '../components/SideBar'
export default function Dashboard() {
  return (
    <>
        <div className="flex w-screen h-screen">
          <SideBar />
          <div className="flex-1 p-6 content">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
        </div>
    </>
  );
}
