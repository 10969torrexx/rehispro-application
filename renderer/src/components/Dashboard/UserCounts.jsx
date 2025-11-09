export default function UserCounts({ staffCount, supervisorCount, activeCount, inactiveCount, deletedCount }) { 
    return (
        <>
            <h3 className="font-semibold mb-4 text-xs text-left m-2">User Counts</h3>
            <div className="p-4 bg-white rounded-lg shadow-md w-[400px] text-left">
                <table className="min-w-full border border-gray-300 rounded-lg text-sm overflow-hidden">
                    <tbody className="text-gray-800">
                        <tr className="border-t hover:bg-gray-50">
                            <td className="px-4 py-1">
                                <i className="bi bi bi-person-fill text-green-500"></i>
                            </td>
                            <td className="px-4 py-1">Staff</td>
                            <td className="px-4 py-1 text-center">{staffCount}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-50">
                            <td className="px-4 py-1">
                                <i className="bi bi-person-fill-gear text-orange-500"></i>
                            </td>
                            <td className="px-4 py-1">Supervisors</td>
                            <td className="px-4 py-1 text-center">{supervisorCount}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-50">
                            <td className="px-4 py-1">
                                <i className="bi bi-check-circle-fill text-green-500"></i>
                            </td>
                            <td className="px-4 py-1">Active</td>
                            <td className="px-4 py-1 text-center">{activeCount}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-50">
                            <td className="px-4 py-1">
                                <i className="bi bi-wrench-adjustable-circle-fill text-orange-500"></i>
                            </td>
                            <td className="px-4 py-1">Inactive</td>
                            <td className="px-4 py-1 text-center">{inactiveCount}</td>
                        </tr>
                        <tr className="border-t hover:bg-gray-50">
                            <td className="px-4 py-1">
                                <i className="bi bi-trash-fill text-red-500"></i>
                            </td>
                            <td className="px-4 py-1">Deleted</td>
                            <td className="px-4 py-1 text-center">{deletedCount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
   ``