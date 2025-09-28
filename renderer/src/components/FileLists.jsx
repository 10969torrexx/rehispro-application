import { FileIcons } from "@enums";
import { useState, useEffect } from "react";
export default function FileList({id, name, size, type, onRemove}) {
    const [icon, setIcon] = useState(FileIcons.PDF);
    useEffect(() => {
        switch(type) {
            case 'application/pdf':
                setIcon(FileIcons.PDF);
                break;
            case 'image/jpeg':
                setIcon(FileIcons.JPEG);
                break;
            case 'image/png':
                setIcon(FileIcons.PNG);
                break;
            default:
                setIcon(FileIcons.PDF);
                break;
        }
    }, [name, size, type]);
    return (
        <div className="w-full bg-white shadow-md rounded-lg p-3 mb-3 flex items-center justify-between hover:shadow-lg transition">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 border">
                    <i className={`${icon} text-primary text-2xl`}></i>
                </div>

                <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-800 truncate w-40">{name}</p>
                    <span className="text-xs text-gray-500">{size}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600" data-filetype={type}
                onClick={() => onRemove(id)}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
    )
}