import { useEffect, useState } from "react";
import { capitalizeFirst } from "../myTools/myTools";
export default function UserCounts({ role = "", userCounts = 0, bgColor = "bg-white", status="active" }) {
    return (
        <div className="bg-white flex items-center shadow-md p-4 rounded-md">
            <div className={`border p-2 rounded-lg status-${status.toLowerCase()} w-10 h-10 flex items-center justify-center`}>
                <i className="bi bi-person"></i>
            </div>
            <div className="ml-3 mr-4">
                <p className="text-gray-600">{capitalizeFirst(role)}</p>
                <h4 className="text-xl">
                  {userCounts}
                </h4>
            </div>
        </div>
    );
}
