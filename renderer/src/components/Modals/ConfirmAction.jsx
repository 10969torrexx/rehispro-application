export default function ConfirmAction({
    title = "Confirm Action",
    message = "Are you sure you want to proceed with this action?",
    onConfirm,
    onCancel
}) {
    return(
        <>
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                    <h2 className="text-lg font-semibold mb-4">{title}</h2>
                    <p className="mb-4">{message}</p>
                    <div className="flex justify-end space-x-4">
                        <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600">Confirm</button>
                        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}