import { FileIcons } from "@enums";
export default function FileList({name, size, type}) {
    return (
        <div className="w-[400px] bg-white shadow-md rounded-lg p-3 mb-3 flex items-center justify-between hover:shadow-lg transition">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 border">
                    <i className={`${FileIcons.PDF} text-blue-600 text-2xl`}></i>
                </div>

                <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-800 truncate w-40">{name}</p>
                    <span className="text-xs text-gray-500">{size}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[70%] h-full bg-blue-500"></div>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
    )
}