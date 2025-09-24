import { FileIcons } from "@enums";
export default function FileList({file}) {
    return (
       <div className="w-[600px] bg-white shadow-lg rounded-lg p-8 text-left">
            <div className="rounded-full p-4 border text-primary">
                <i className={FileIcons.PDF}></i>
            </div>
            <p>{file.name}</p>
            <span>{file.size}</span>
       </div>
    )
}