export default function ConfirmAction() {
    return(
        <>
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                    <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
                    <p className="mb-4">Are you sure you want to proceed with this action?</p>
                    <div className="flex justify-end">
                        <button className="btn-primary mr-2">Confirm</button>
                        <button className="btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}