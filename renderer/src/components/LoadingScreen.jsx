export default function LoadingScreen({title = "Loading", message=""}) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center text-left">
            <div className="spinner-container flex flex-col bg-white rounded-lg p-4 m-h-[400px] items-center">
                <div className="spinner"></div>
                <p className="mt-4 font-semibold text-xl">{title}</p>
                {message ?? 
                <>
                    <p className="mt-2">{message}</p>
                </>}
            </div>
        </div>
    );
};