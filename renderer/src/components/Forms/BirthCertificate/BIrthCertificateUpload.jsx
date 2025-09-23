import { Divider } from '@components';
export default function Upload() { 
    return (
        <div className="w-full flex">
            <Divider />
            <div className="w-full border-dashed border rounded-lg border-2 border-gray-300 h-64 flex flex-col justify-center items-center text-gray-400">
                <div className='p-4 rounded-full'>
                    <i className="text-4xl fa-solid fa-cloud-arrow-up"></i>
                </div>
                <div>Choose or drag and drop files here to upload</div>
                <button className='mt-4 rounded-full px-4 py-2 btn-primary'>Choose File(s)</button>
            </div>
        </div>
    )
}